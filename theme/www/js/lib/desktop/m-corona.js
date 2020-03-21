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

			u.showScene(this);


			page.resized();
		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}