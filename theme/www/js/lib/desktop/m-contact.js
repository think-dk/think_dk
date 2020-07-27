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


			if (u.qs("div.article", this)) {

				var injection_point = u.ns(u.qs("div.article h1", this));
				this.map = u.ae(this, "div", {"class":"map"});
				this.map.loaded = function() {
	
					u.googlemaps.addMarker(this, [55.683577,12.563829]);
	
					delete this.loaded;
	
				}
				injection_point.parentNode.insertBefore(this.map, injection_point);
				u.googlemaps.map(this.map, [55.683577,12.563829], {"zoom":14});
	
			}

			u.showScene(this);


			// // accept cookies?
			// page.acceptCookies();


			// page.resized();
		}

		// scene is ready
		// scene.ready();

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}