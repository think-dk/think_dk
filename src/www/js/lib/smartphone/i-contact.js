Util.Objects["contact"] = new function() {
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


			var injection_point = u.ns(u.qs("div.article h1", this));
			this.map = u.ae(this, "div", {"class":"map"});
			this.map.loaded = function() {

				u.googlemaps.addMarker(this.g_map, [55.711510,12.564495]);

				delete this.loaded;

			}
			injection_point.parentNode.insertBefore(this.map, injection_point);
			u.googlemaps.map(this.map, [55.711510,12.564495], {"zoom":14});


			u.showScene(this);


			// accept cookies?
			page.acceptCookies();


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}