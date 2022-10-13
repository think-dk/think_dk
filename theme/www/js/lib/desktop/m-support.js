Util.Modules["support"] = new function() {
	this.init = function(scene) {
		u.bug("scene init:", this);

		scene.resized = function() {
//			u.bug("scene.resized:", this);

			if(this.membership_nodes) {

// 				var tallest_node = 0;
// 				var i, node;
// 				for(i = 0; node = this.membership_nodes[i]; i++) {
// 					u.ass(node, {
// 						"height":"auto"
// 					})
// //					u.bug(node.offsetHeight);
// 					tallest_node = tallest_node < node.offsetHeight ? node.offsetHeight : tallest_node;
// 				}
//
// 				for(i = 0; node = this.membership_nodes[i]; i++) {
// 					u.ass(node, {
// 						"height":(tallest_node+65)+"px"
// 					})
// 				}
			}

		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			// page.cN.scene = this;


			// // this.div_memberships = u.qs("div.memberships", this);
			// this.div_memberships = false;
			//
			// // Membership
			// this.div_membership = u.qs("div.membership", this);
			// var place_holder = u.qs("div.articlebody .placeholder.memberships", this);
			//
			// // if(this.div_memberships && place_holder) {
			// // 	place_holder.parentNode.replaceChild(this.div_memberships, place_holder);
			// // }
			//
			// if(this.div_membership && place_holder) {
			// 	place_holder.parentNode.replaceChild(this.div_membership, place_holder);

				this.form_membership = u.qs("form.membership", this);
				u.f.init(this.form_membership);
			// }



//

			u.showScene(this);


			// page.resized();
		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
