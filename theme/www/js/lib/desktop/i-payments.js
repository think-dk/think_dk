Util.Objects["payments"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
			u.bug("scene.ready:", this);


			page.cN.scene = this;

			var form = u.qs("form", this);
			if(form) {
				u.f.init(form);
			}

			u.showScene(this);


			// accept cookies?
//			page.acceptCookies();


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}