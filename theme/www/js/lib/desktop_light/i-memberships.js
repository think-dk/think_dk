Util.Objects["memberships"] = new function() {
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

			this._memberships = u.qs("div.memberships", this);
			var place_holder = u.qs("div.articlebody .placeholder.memberships", this);

			if(this._memberships && place_holder) {
				place_holder.parentNode.replaceChild(this._memberships, place_holder);
			}


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
