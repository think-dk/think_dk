Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))


		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			if(this.wishes && this.wishes.length) {
				for(i = 0; node = this.wishes[i]; i++) {
					if(node.image_mask) {
						u.ass(node.image_mask, {
							"height":Math.floor(node.image_mask.offsetWidth / (250/140)) + "px"
						});
					}
				}
			}
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this));
		}

		scene.ready = function() {
			u.bug("scene.ready:" + u.nodeId(this));

			page.cN.scene = this;

			var i, node;

			this.wishes = u.qsa("li.item", this);
			if(this.wishes.length) {

				for(i = 0; node = this.wishes[i]; i++) {

					node.item_id = u.cv(node, "id");
					node.image_format = u.cv(node, "format");
					node.image_variant = u.cv(node, "variant");
					if(node.item_id && node.image_format && node.image_variant) {
						node.image_mask = u.ie(node, "div", {"class":"image"});
						u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+node.image_variant+"/540x."+node.image_format+")");
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
