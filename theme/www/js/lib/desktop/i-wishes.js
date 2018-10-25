Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);


		scene.image_width = 250;


		scene.resized = function() {
//			u.bug("scene.resized:", this);

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
//			u.bug("scene.scrolled:, this);
		}

		scene.ready = function() {
			u.bug("scene.ready:", this);

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

					node._header = u.qs("h3", node);
					if(node._header) {
						u.ae(node.text_mask, node._header);
					}
					node._info = u.qs("dl.info", node);
					if(node._info) {
						u.ae(node.text_mask, node._info);
					}

					node._actions = u.qs("ul.actions", node);
					if(node._actions) {
						u.ae(node.text_mask, node._actions);
					}

					node._description = u.qs("div.description", node);
					if(node._description) {
						u.ae(node.text_mask, node._description);
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
