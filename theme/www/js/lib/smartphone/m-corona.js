Util.Modules["corona"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", this);

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			this.form_signup = u.qs("form.signup", this);
			if(this.form_signup) {
				u.f.init(this.form_signup);
			}

			u.showScene(this);


			page.resized();
		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}