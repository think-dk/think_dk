Util.Objects["memberships"] = new function() {
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

			this._memberships = u.qs("div.memberships", this);
			var place_holder = u.qs("div.articlebody .placeholder.memberships", this);

			if(this._memberships && place_holder) {
				place_holder.parentNode.replaceChild(this._memberships, place_holder);
			}


			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
