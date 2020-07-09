

Util.Modules["checkout"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			page.cN.scene = this;


			var form_login = u.qs("form.login", this);
			if(form_login) {
				u.f.init(form_login);
			}


			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				u.f.init(form_signup);
			}


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}



Util.Modules["shopProfile"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			page.cN.scene = this;


			var form = u.qs("form.details", this);
			if(form) {
				u.f.init(form);
			}


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}



Util.Modules["shopAddress"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			page.cN.scene = this;


			var form = u.qs("form.address", this);
			if(form) {
				u.f.init(form);
			}


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}