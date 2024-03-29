Util.Modules["event"] = new function() {
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
						"div.article", 
					]},
					{"c100": [
						"div.tickets",
						"div.related",
					]},
				]}
			]);


			u.showScene(this);

		}

		scene.destroy = function() {

			var i;
			var pagination, paginations = u.qsa(".pagination");
			if(paginations) {
				for(i = 0; i < paginations.length; i++) {
					pagination = paginations[i];

					if(fun(pagination.destroy)) {
						pagination.destroy();
					}

				}
			}

			page.cN.removeChild(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
