Util.Objects["contact"] = new function() {
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



			var injection_point = u.ns(u.qs("div.article h1", this));
			this.map = u.ae(this, "div", {"class":"map"});
			this.map.loaded = function() {

				u.googlemaps.addMarker(this.g_map, [55.711510,12.564495]);

				delete this.loaded;

			}
			injection_point.parentNode.insertBefore(this.map, injection_point);
			u.googlemaps.map(this.map, [55.711510,12.564495], {"zoom":14});


			u.showScene(this);


		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}