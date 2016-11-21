

Util.Objects["checkout"] = new function() {
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



Util.Objects["shopProfile"] = new function() {
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



Util.Objects["shopAddress"] = new function() {
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