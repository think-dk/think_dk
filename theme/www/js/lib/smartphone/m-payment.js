Util.Modules["payment"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);


			var login_form = u.qs("form.login", this);
			if(login_form) {
				u.f.init(login_form);
			}

			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}