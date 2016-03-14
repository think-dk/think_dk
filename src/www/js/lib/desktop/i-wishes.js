Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))


		scene.image_width = 250;


		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			// resize text nodes
			if(this.nodes.length) {
				var text_width = this.nodes[0].offsetWidth - this.image_width;
				for(i = 0; node = this.nodes[i]; i++) {
					u.as(node.text_mask, "width", text_width+"px", false);
				}
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this));
		}

		scene.ready = function() {
			u.bug("scene.ready:" + u.nodeId(this));

			page.cN.scene = this;

			var i, node;

			this.nodes = u.qsa("li.item", this);
			if(this.nodes.length) {

				var text_width = this.nodes[0].offsetWidth - this.image_width;
				for(i = 0; node = this.nodes[i]; i++) {

					node.item_id = u.cv(node, "id");
					node.image_format = u.cv(node, "format");
					node.image_variant = u.cv(node, "variant");

					// restructure content
					node.image_mask = u.ae(node, "div", {"class":"image"});
					node.text_mask = u.ae(node, "div", {"class":"text"});

					u.as(node.text_mask, "width", text_width+"px", false);
					if(node.image_format) {
						u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+node.image_variant+"/"+this.image_width+"x."+node.image_format+")");
					}
					// or fallback image
					else {
						u.as(node.image_mask, "backgroundImage", "url(/images/0/missing/"+this.image_width+"x.png)");
					}

					u.ae(node.text_mask, u.qs("h3", node));
					u.ae(node.text_mask, u.qs("dl", node));

					node._actions = u.qs("ul.actions", node);
					if(node._actions) {
						u.ae(node.text_mask, node._actions);
					}

					node._descriptions = u.qs("div.description", node);
					if(node._descriptions) {
						u.ae(node.text_mask, node._descriptions);
					}

				}

			}

			// animation
			// get all scene children
			var nodes = u.cn(this);
			if(nodes.length) {

				// hide all childnodes
				for(i = 0; node = nodes[i]; i++) {

					u.ass(node, {
						"opacity":0,
						"transform":"translate(0, 40px)"
					});

				}

				// show scene
				u.ass(this, {
					"opacity":1,
				});

				// show content
				for(i = 0; node = nodes[i]; i++) {

					u.a.transition(node, "all 0.2s ease-in "+(i*100)+"ms");
					u.ass(node, {
						"opacity":1,
						"transform":"translate(0, 0)"
					});

				}

			}

			// don't know what we are dealing with here - just show scene
			else {

				// show scene
				u.ass(this, {
					"opacity":1,
				});

			}

			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}
