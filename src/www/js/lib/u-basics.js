u.showScene = function(scene) {
	var i, node;

	// get all scene children
	var nodes = u.cn(scene);


	if(nodes.length) {

		var article = u.qs("div.article", scene);
		// is first item an article
		if(nodes[0] == article) {

			// get all article nodes
			var article_nodes = u.cn(article);

			// drop article node
			nodes.shift();
			// add nodes to new list
			for(x in nodes) {
				article_nodes.push(nodes[x]);
			}
			nodes = article_nodes;
		}

		var headline = u.qs("h1,h2", scene);


		// hide all childnodes
		for(i = 0; node = nodes[i]; i++) {
			u.ass(node, {
				"opacity":0,
			});

		}

		// show scene
		u.ass(scene, {
			"opacity":1,
		});


		// apply headline animation
		u._stepA1.call(headline);

		// show content
		for(i = 1; node = nodes[i]; i++) {

			u.a.transition(node, "all 0.2s ease-in "+((i*100)+200)+"ms");
			u.ass(node, {
				"opacity":1,
				"transform":"translate(0, 0)"
			});

		}

	}

	// don't know what we are dealing with here - just show scene
	else {

		// show scene
		u.ass(scene, {
			"opacity":1,
		});

	}
	
	
}


// ANIMATION METHODS

// Animation first step (fade in)
// executed on relevant node
u._stepA1 = function() {
//	u.bug("stepA1:" + u.text(this));

	// split words into spans
	var chars = this.innerHTML.split(" ");

	// make sure there is spacing on each side of br.tag to get it indexed as 
	this.innerHTML = this.innerHTML.replace(/[ ]?<br[ \/]?>[ ]?/, " <br /> ");
	this.innerHTML = '<span class="word">'+this.innerHTML.split(" ").join('</span> <span class="word">')+'</span>'; 
	this.word_spans = u.qsa("span.word", this);
	var i, span;
	// split each word into letter spans
	for(i = 0; span = this.word_spans[i]; i++) {

		// if span contains <br> then replace span with br tag
		if(span.innerHTML.match(/<br[ \/]?>/)) {
			span.parentNode.replaceChild(document.createElement("br"), span);
		}
		// split letters into spans
		else {
			span.innerHTML = "<span>"+span.innerHTML.split("").join("</span><span>")+"</span>"; 
		}
	}

	// get each letter
	this.spans = u.qsa("span:not(.word)", this);
	if(this.spans) {
		var i, span;
		// set initial state for each span
		for(i = 0; span = this.spans[i]; i++) {
			span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
			u.ass(span, {
				"transformOrigin": "0 100% 0",
				"transform":"translate(0, 40px)",
				"opacity":0
			});
		}

		// show outer content node
		u.ass(this, {
			"opacity":1
		});

		// play span animation (fade in)
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, 0)",
				"opacity":1
			});
			span.transitioned = function(event) {
				u.bug("done")
				u.ass(this, {
					"transform":"none"
				});
			}
		}

	}

}

// Animation second step (fade out)
// executed on relevant node
u._stepA2 = function() {
//	u.bug("stepA2:" + u.text(this));

	if(this.spans) {
		var i, span;
		// play span animation (fade out)
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, -40px)",
				"opacity":0
			});
		}
	}

}



Util.Objects["oneButtonForm"] = new function() {
	this.init = function(node) {
	u.bug("oneButtonForm:" + u.nodeId(node));

		// inject standard form if action node is empty
		// this is done to minimize HTML in list pages
		if(!node.childNodes.length) {

			var csrf_token = node.getAttribute("data-csrf-token");
			var form_action = node.getAttribute("data-form-action");
			var button_value = node.getAttribute("data-button-value");

			// optional attributes
			var button_name = node.getAttribute("data-button-name");
			var button_class = node.getAttribute("data-button-class");
			var inputs = node.getAttribute("data-inputs");

			if(csrf_token && form_action && button_value) {

				node.form = u.f.addForm(node, {"action":form_action, "class":"confirm_action_form"});
				node.form.node = node;
				// add csrf token
				u.ae(node.form, "input", {"type":"hidden","name":"csrf-token", "value":csrf_token});

				// add additional hidden inputs
				if(inputs) {
					for(input_name in inputs)
					u.ae(node.form, "input", {"type":"hidden","name":input_name, "value":inputs[input_name]});
				}

				// add action
				u.f.addAction(node.form, {"value":button_value, "class":"button" + (button_class ? " "+button_class : ""), "name":u.stringOr(button_name, "save")});
			}
		}
		// look for valid forms
		else {
			node.form = u.qs("form", node);
		}

		// init if form is available
		if(node.form) {
			u.f.init(node.form);

			node.form.node = node;
			//node.form.confirm_submit_button = node.form.actions[u.stringOr(button_name, "confirm")];
			node.form.confirm_submit_button = u.qs("input[type=submit]", node.form);

			node.form.confirm_submit_button.org_value = node.form.confirm_submit_button.value;
			node.form.confirm_submit_button.confirm_value = node.getAttribute("data-confirm-value");

			node.form.success_function = node.getAttribute("data-success-function");
			node.form.success_location = node.getAttribute("data-success-location");

//				node.form.cancel_url = bn_cancel.href;

			node.form.restore = function(event) {
				u.t.resetTimer(this.t_confirm);

				this.confirm_submit_button.value = this.confirm_submit_button.org_value;
				u.rc(this.confirm_submit_button, "confirm");
			}

			node.form.submitted = function() {
//				u.bug("submitted")
				// first click
				if(!u.hc(this.confirm_submit_button, "confirm") && this.confirm_submit_button.confirm_value) {
					u.ac(this.confirm_submit_button, "confirm");
					this.confirm_submit_button.value = this.confirm_submit_button.confirm_value;
					this.t_confirm = u.t.setTimer(this, this.restore, 3000);
				}
				// confirm click
				else {
					u.t.resetTimer(this.t_confirm);


					this.response = function(response) {
//						u.bug("response")

						page.notify(response);

						if(response) {
							// check for constraint error preventing row from actually being deleted
							if(response.cms_object && response.cms_object.constraint_error) {
								this.value = this.confirm_submit_button.org_value;
								u.ac(this, "disabled");
							}
							else {

								if(this.success_location) {
//									u.bug("location:" + this.success_location)

									u.ass(this.confirm_submit_button, {
										"display": "none"
									});

									location.href = this.success_location;
								}
								else if(this.success_function) {
//									u.bug("function:" + this.success_function)
									if(typeof(this.node[this.success_function]) == "function") {
										this.node[this.success_function](response);
									}
								}
								// does default callback exist
								else if(typeof(this.node.confirmed) == "function") {
									this.node.confirmed(response);
								}
								else {
									u.bug("default return handling" + this.success_location)


									// remove node ?
								}
							}
						}

						this.restore();

					}
					u.request(this, this.action, {"method":"post", "params":u.f.getParams(this)});
				}
			}
		}

	}
}