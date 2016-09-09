Util.Objects["cart"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;

			this.isHTML = true;
			page.notify(this);

			this.header_cart = u.qs("li.cart span.total", page.hN);
			this.total_cart_price = u.qs("li.total span.total_price", this);
			this.cart_nodes = u.qsa("ul.items li.item", this);


			var i, node;
			for(i = 0; node = this.cart_nodes[i]; i++) {
				

				node.scene = this;
				node.item_id = u.cv(node, "id");

				node.unit_price = u.qs("span.unit_price", node);
				node.total_price = u.qs("span.total_price", node);

				// look for quantity update form
				var quantity_form = u.qs("form.updateCartItemQuantity", node)

				// initialize quantity form
				if(quantity_form) {
					quantity_form.node = node;

					u.f.init(quantity_form);


					quantity_form.fields["quantity"].updated = function() {
						u.ac(this._form.actions["update"], "primary");

						this._form.submit();
					}


					quantity_form.submitted = function() {

						this.response = function(response) {
							page.notify(response);

							if(response) {

								var total_price = u.qs("div.scene li.total span.total_price", response);
								var header_cart = u.qs("div#header li.cart span.total", response);
								var item_row = u.ge("id:"+this.node.item_id, response);
								var item_total_price = u.qs("span.total_price", item_row);
								var item_unit_price = u.qs("span.unit_price", item_row);

								// update prices
								this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
								this.node.scene.header_cart.innerHTML = header_cart.innerHTML;
								this.node.total_price.innerHTML = item_total_price.innerHTML;
								this.node.unit_price.innerHTML = item_unit_price.innerHTML;

					 			u.rc(this.actions["update"], "primary");

							}
						}

						u.request(this, this.action, {"method":"post", "params":u.f.getParams(this)});
					}
				}


			

				var bn_delete = u.qs("ul.actions li.delete", node);
				if(bn_delete) {
					u.o.oneButtonForm.init(bn_delete);

					bn_delete.node = node;	
					bn_delete.confirmed = function(response) {

						if(response) {

							var total_price = u.qs("div.scene li.total span.total_price", response);
							var header_cart = u.qs("div#header li.cart span.total", response);

							// update total price
							this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
							this.node.scene.header_cart.innerHTML = header_cart.innerHTML;

							this.node.parentNode.removeChild(this.node);
						}
					}

				}

			}

			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}



Util.Objects["checkout"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;

			this.isHTML = true;
//			page.notify(this);

//			this.header_cart = u.qs("li.cart span.total", page.hN);
//			this.total_cart_price = u.qs(".total_cart_price", this);


			var form_login = u.qs("form.login", this);
			if(form_login) {
				u.f.init(form_login);
			}


			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				u.f.init(form_signup);
			}


			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}



Util.Objects["shopProfile"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;

			this.isHTML = true;
//			page.notify(this);

//			this.header_cart = u.qs("li.cart span.total", page.hN);
//			this.total_cart_price = u.qs(".total_cart_price", this);


			var form = u.qs("form.details", this);
			if(form) {
				u.f.init(form);
			}


			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}



Util.Objects["shopAddress"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;


			var form = u.qs("form.address", this);
			if(form) {
				u.f.init(form);
			}


			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

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
				u.bug("submitted")
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
						u.bug("response")

						page.notify(response);

						if(response) {
							// check for constraint error preventing row from actually being deleted
							if(response.cms_object && response.cms_object.constraint_error) {
								this.value = this.confirm_submit_button.org_value;
								u.ac(this, "disabled");
							}
							else {

								if(this.success_location) {
									u.bug("location:" + this.success_location)

									u.ass(this.confirm_submit_button, {
										"display": "none"
									});

									location.href = this.success_location;
								}
								else if(this.success_function) {
									u.bug("function:" + this.success_function)
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