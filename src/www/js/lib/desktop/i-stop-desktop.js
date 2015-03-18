Util.Objects["stop"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			// index all subjects
			this.subjects = u.qsa(".topic", this);

			var i, node;
			for(i = 0; node = this.subjects[i]; i++) {

				node.scene = this;

				node.readstate = u.cv(node, "readstate");
				if(node.readstate) {
					u.addCheckmark(node);
				}

				// enable header as open/close node
				node.header = u.qs("h3", node);
				node.header.node = node;
				u.addExpandArrow(node.header);


				u.ce(node.header);
				node.header.clicked = function() {
					if(u.hc(this.node, "open")) {

						u.rc(this.node, "open");
						u.addExpandArrow(this);

					}
					else {

						u.addCollapseArrow(this);

						// content not loaded yet
						if(!this.node.topic) {
							u.request(this.node, this.url);
						}
						else {
							u.ac(this.node, "open");
						}
					}
				}


				node.response = function(response) {
					
					this.topic = u.ae(this, u.qs(".scene .topic", response));

					u.init(this.topic);
					u.ac(this, "open");
				}

			}

			page.cN.scene = this;
			page.resized();
		}



		// scene is ready
		scene.ready();

	}

}
