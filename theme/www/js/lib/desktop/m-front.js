Util.Modules["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:", this);

			var i, box;
			if(this.div_article) {
				var box_height = (this.div_article.offsetHeight/2);

				for(i = 0; i < this.boxes.length; i++) {
					box = this.boxes[i];

					u.ass(box, {
						"height": box_height + "px",
					});

				}

			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scrolled:", this);;
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);


			u.columns(this, [
				{"c300": [
					{"c200": [
						"div.intro", 
						"div.article",
					]},
					{"c100": [
						"div.projects",
						"div.services",
					]},
				]},
				{"c300": [
					{"c100": [
						"div.events",
					]},
					{"c100": [
						"div.membership",
					]},
					{"c100": [
						"div.bulletin",
					]},
					{"c100": [
						"div.about",
					]},
					{"c100": [
						"div.blog",
					]},
					{"c100": [
						"div.contact",
					]}
				]},

			]);

			this.div_article = u.qs(".article", this);
			if(u.segment() === "tablet") {
				this.div_article.tap = function() {
					u.tc(this, "hover");
				}
				u.e.addStartEvent(this.div_article, this.div_article.tap);
			}
			else {
				u.e.hover(this.div_article);
				this.div_article.over = function() {
					u.ac(this, "hover");
				}
				this.div_article.out = function() {
					u.rc(this, "hover");
				}
			}

			this.boxes = [];
			this.boxes.push(u.qs(".projects", this));
			this.boxes.push(u.qs(".services", this));
			this.boxes.push(u.qs(".events", this));
			this.boxes.push(u.qs(".membership", this));
			this.boxes.push(u.qs(".bulletin", this));
			this.boxes.push(u.qs(".about", this));
			this.boxes.push(u.qs(".blog", this));
			this.boxes.push(u.qs(".contact", this));


			var i, box;
			for(i = 0; i < this.boxes.length; i++) {
				box = this.boxes[i];

				if(u.segment() === "tablet") {
					box.tap = function() {
						u.tc(this, "hover");
					}
					u.e.addStartEvent(box, box.tap);

					actions = u.qsa("ul.actions li", box);
					for(j = 0; j < actions.length; j++) {
						action = actions[j];
						u.ce(action, {"type":"link"});
						action.inputStarted = function(event) {
							u.e.kill(event);
						}
					}
				}
				else {
					u.e.hover(box);
					box.over = function() {
						u.ac(this, "hover");
					}
					box.out = function() {
						u.rc(this, "hover");
					}
				}

			}

			page.resized();

			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
