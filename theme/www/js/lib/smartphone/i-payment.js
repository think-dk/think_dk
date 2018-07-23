Util.Objects["payment"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


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