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
				var li_lng = u.qs("ul.geo li.longitude");
				var li_lat = u.qs("ul.geo li.latitude");

				if(li_lng && li_lat) {
					
					this.map = u.ae(this, "div", {"class":"map"});
					this.map.lng = li_lng.getAttribute("content");
					this.map.lat = li_lat.getAttribute("content");
					this.map.loaded = function() {
	
						u.googlemaps.addMarker(this, [this.lat, this.lng]);
	
						delete this.loaded;
	
					}

					injection_point.parentNode.insertBefore(this.map, injection_point);
					u.googlemaps.map(this.map, [this.map.lat, this.map.lng], {"zoom":14});

				}
	
			}

			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}