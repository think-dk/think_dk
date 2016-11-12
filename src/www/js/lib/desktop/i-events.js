Util.Objects["events"] = new function() {
	this.init = function(scene) {
		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;


			u.showScene(this);


			// accept cookies?
			page.acceptCookies();


			// get event list
			this.all_events = u.qs("div.all_events", this);
			if(this.all_events) {

				this.ul_events = u.qs("ul.events", this.all_events);
				this.li_events = u.qsa("li.event", this.all_events);
				if(this.li_events.length) {

					this.ul_views = u.ae(this.all_events, "ul", {"class":"views"});

					
					
				}

			}


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}