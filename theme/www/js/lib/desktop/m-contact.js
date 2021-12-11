Util.Modules["contact"] = new function() {
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
					".teams",
				]},
				{"c300": [
					"div.company"
				]}
			]);


			this.article = u.qs("div.article", this);
			if(this.article) {

				var injection_point = u.ns(u.qs("h1", this.article));
				this.map = u.ae(this, "div", {"class":"map"});
				this.map.loaded = function() {
	
					u.googlemaps.addMarker(this, [55.6912109,12.5631139]);
	
					delete this.loaded;
	
				}
				injection_point.parentNode.insertBefore(this.map, injection_point);
				u.googlemaps.map(this.map, [55.6912109,12.5631139], {"zoom":14});
	
			}

			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}