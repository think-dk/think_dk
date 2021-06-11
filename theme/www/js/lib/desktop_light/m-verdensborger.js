Util.Modules["verdensborger"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);


		scene.resized = function() {
			// u.bug("scene.resized:", this);
			// console.log(this.ul_images, this.images);


			// refresh dom
			this.offsetHeight;
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

		}

		// scene is ready
		scene.ready();

	}
}
