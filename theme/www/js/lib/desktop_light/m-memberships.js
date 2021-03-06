Util.Modules["memberships"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);



			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.cN.scene = this;

			this.div_memberships = false;

			this.div_membership = u.qs("div.membership", this);
			var place_holder = u.qs("div.articlebody .placeholder.memberships", this);
			// this.div_memberships = u.qs("div.memberships", this);
			// var place_holder = u.qs("div.articlebody .placeholder.memberships", this);

			if(this.div_membership && place_holder) {
				place_holder.parentNode.replaceChild(this.div_membership, place_holder);

				this.form_membership = u.qs("form.membership", this.div_membership);
				u.f.init(this.form_membership);
			}

			// this.div_memberships = u.qs("div.memberships", this);
			// var place_holder = u.qs("div.articlebody .placeholder.memberships", this);
			//
			// if(this.div_memberships && place_holder) {
			// 	place_holder.parentNode.replaceChild(this.div_memberships, place_holder);
			// }


			this.div_maillist = u.qs("div.maillist", this);
			var maillist_place_holder = u.qs("div.articlebody .placeholder.maillist", this);

			if(this.div_maillist && maillist_place_holder) {
				maillist_place_holder.parentNode.replaceChild(this.div_maillist, maillist_place_holder);
			}

			// build maillist form
			if(this.div_maillist) {

				this.div_maillist.form = u.qs("form.maillist", this.div_maillist);
				u.f.init(this.div_maillist.form);

			}

			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
