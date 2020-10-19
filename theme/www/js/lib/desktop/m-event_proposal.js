Util.Modules["eventProposal"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		scene.resized = function() {
			// u.bug("scene.resized:", this);

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);


			u.columns(this, [
				{"c300":[
					{"c200": [
						"div.proposal", 
					]},
					{"c100": [
						"div.info",
					]},
				]},
			]);


			this._form = u.qs("form", this);
			u.f.init(this._form);


			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
