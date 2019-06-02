Util.Objects["verify_maillist"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", scene);


		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);
		}

		scene.ready = function() {
			u.bug("scene.ready:", this);

			page.cN.scene = this;

			var form_verify = u.qs("form.verify_code", this);

			if(form_verify) {
				u.bug("init form")
				u.f.init(form_verify);
			}

			// accept cookies?
			page.acceptCookies();

			u.showScene(this);

			page.resized();
		}

		// scene is ready
		scene.ready();

	}

}
