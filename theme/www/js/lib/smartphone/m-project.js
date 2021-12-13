Util.Modules["project"] = new function() {
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

			u.columns(this, [
				{"c200": [
					"div.article", 
				]},
				{"c100": [
					".projectdetails",
				]},
			]);


			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}