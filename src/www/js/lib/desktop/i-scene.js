Util.Objects["scene"] = new function() {
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


			var i, node;

			// get all scene children
			var nodes = u.cn(this);
			if(nodes.length) {

				// hide all childnodes
				for(i = 0; node = nodes[i]; i++) {

					u.ass(node, {
						"opacity":0,
						"transform":"translate(0, 40px)"
					});

				}

				// show scene
				u.ass(this, {
					"opacity":1,
				});

				// show content
				for(i = 0; node = nodes[i]; i++) {

					u.a.transition(node, "all 0.2s ease-in "+(i*100)+"ms");
					u.ass(node, {
						"opacity":1,
						"transform":"translate(0, 0)"
					});

				}

			}

			// don't know what we are dealing with here - just show scene
			else {

				// show scene
				u.ass(this, {
					"opacity":1,
				});

			}

			// accept cookies?
			page.acceptCookies();


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}