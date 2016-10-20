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
			var description = u.qs("div.articlebody", this);

			// move membership overview
			if(this._memberships && u.text(description).match(/\{div\.memberships\}/)) {
				for(i = 0; node = description.childNodes[i]; i++) {
					if(u.text(node).match(/\{div\.memberships\}/)) {
						description.replaceChild(this._memberships, node);
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
