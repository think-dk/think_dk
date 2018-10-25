Util.Objects["wishes"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);


		scene.resized = function() {
//			u.bug("scene.resized:", this);

			// if(this.nodes && this.nodes.length) {
			// 	for(i = 0; node = this.nodes[i]; i++) {
			// 		if(node.image_mask) {
			// 			u.ass(node.image_mask, {
			// 				"height":Math.floor(node.image_mask.offsetWidth / (250/140)) + "px"
			// 			});
			// 		}
			// 	}
			// }
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:, this);
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.cN.scene = this;

			var i, node;

			this.nodes = u.qsa("li.item", this);
			if(this.nodes.length) {

				for(i = 0; node = this.nodes[i]; i++) {

					node.item_id = u.cv(node, "id");
					node.image_format = u.cv(node, "format");
					node.image_variant = u.cv(node, "variant");
					if(node.item_id && node.image_format && node.image_variant) {
						node.image_mask = u.ie(node, "div", {"class":"image"});
						u.ae(node.image_mask, "img", {"src":"/images/"+node.item_id+"/"+node.image_variant+"/480x."+node.image_format});

//						u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+node.image_variant+"/540x."+node.image_format+")");
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
