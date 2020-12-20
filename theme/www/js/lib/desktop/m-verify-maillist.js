Util.Modules["verify_maillist"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", scene);


		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);


			var form_verify = u.qs("form.verify_code", this);

			if(form_verify) {
				u.f.init(form_verify);
			}


			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
