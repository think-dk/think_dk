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

				// u.ass(this.div_services, {
				// 	"height": box_height + "px",
				// });
				// u.ass(this.div_events, {
				// 	"height": box_height + "px",
				// });
				// u.ass(this.div_membership, {
				// 	"height": box_height + "px",
				// });
				// u.ass(this.div_bulletin, {
				// 	"height": box_height + "px",
				// });
				//
				// u.ass(this.div_about, {
				// 	"height": box_height + "px",
				// });
				// u.ass(this.div_blog, {
				// 	"height": box_height + "px",
				// });
				// u.ass(this.div_contact, {
				// 	"height": box_height + "px",
				// });
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scrolled:", this);;
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			// map reference
			page.cN.scene = this;



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
				
				//
				// {"c300": [
				// 	"div.intro",
				// 	"div.article",
				// ]},
				// {"c300": [
				// 	{"c100": [
				// 		"div.projects",
				// 	]},
				// 	{"c100": [
				// 		"div.events",
				// 	]},
				// 	{"c100": [
				// 		"div.membership",
				// 	]},
				// ]},
				// {"c300": [
				// 	{"c100": [
				// 		"div.services",
				// 	]},
				// 	{"c100": [
				// 		"div.news",
				// 	]},
				// 	{"c100": [
				// 		"div.about",
				// 	]},
				// ]},
				// {"c300": [
				// 	{"c100": [
				// 		"div.contact",
				// 	]}
				// ]}
				
			]);

			this.div_article = u.qs(".article", this);
			u.e.hover(this.div_article);
			this.div_article.over = function() {
				u.ac(this, "hover");
			}
			this.div_article.out = function() {
				u.rc(this, "hover");
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

				u.e.hover(box);
				box.over = function() {
					u.ac(this, "hover");
				}
				box.out = function() {
					u.rc(this, "hover");
				}

			}

			page.resized();

			u.showScene(this);

		}


		// ARTICLE
//
// 		// start article animation playback
// 		scene.showArticle = function() {
// 			// u.bug("showArticle")
//
// 			// does article exist
// 			this._article = u.qs("div.article", this);
// 			if(this._article) {
// 				this._article.scene = this;
//
// 				u.ass(this._article, {
// 					"opacity":0,
// 					"display":"block"
// 				});
//
// 				// prepare childnodes for animation
// 				var cn = u.cn(this._article);
// 				this._article.nodes = [];
// 				for(i = 0; node = cn[i]; i++) {
// 					if(u.gcs(node, "display") != "none") {
// 						u.ass(node, {
// 							"opacity":0,
// 						});
// 						this._article.nodes.push(node);
// 					}
// 				}
//
// 				// show article node
// 				u.ass(this._article, {
// 					"opacity":1,
// 				});
//
// 				// apply headline anumation
// 				u._stepA1.call(this._article.nodes[0]);
//
// 				// show remaining article elements
// 				for(i = 1; node = cn[i]; i++) {
// 					u.a.transition(node, "all 0.3s ease-in "+(100+(i*200))+"ms");
// 					u.ass(node, {
// 						"transform":"translate(0, 0)",
// 						"opacity":1
// 					});
//
// 				}
//
// 				// show news when time is up
// 				u.t.setTimer(this, "showEvents", 800);
//
// 			}
// 			// show events if no article exists
// 			else {
// 				this.showEvents();
// 			}
//
// 		}
//
//
//
// 		// EVENTS
//
// 		// start news animation playback
// 		scene.showEvents = function() {
// 			// u.bug("showEvents")
//
// 			this._events = u.qs("div.all_events", this);
//
// 			if(this._events) {
// 				this._events.scene = this;
//
// 				u.ass(this._events, {
// 					"opacity": 0,
// 					"display":"block"
// 				});
//
// 				u.a.transition(this._events, "all 0.4s ease-in-out", "showPosts");
// 				u.ass(this._events, {
// 					"opacity":1
// 				});
//
// 				this._events.showPosts = function() {
// 					this._posts = u.qsa("li.item", this._events);
// 					if(this._posts) {
// 						var i, node;
// 						for(i = 0; node = this._posts[i]; i++) {
//
// 							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
// 							u.ass(node, {
// 								"opacity": 1
// 							});
//
// 						}
//
// 					}
// 				}
//
// 				// show news when time is up
// 				u.t.setTimer(this, "showNews", 800);
//
// 			}
// 			// show news if no events exists
// 			else {
// 				this.showNews();
// 			}
// 		}
//
//
//
// 		// NEWS
//
// 		// start news animation playback
// 		scene.showNews = function() {
// 			// u.bug("showNews")
//
// 			this._news = u.qs("div.news", this);
//
// 			if(this._news) {
// 				this._news.scene = this;
//
// 				u.ass(this._news, {
// 					"opacity": 0,
// 					"display":"block"
// 				});
//
// 				u.a.transition(this._news, "all 0.4s ease-in-out", "showPosts");
// 				u.ass(this._news, {
// 					"opacity":1
// 				});
//
// 				this._news.showPosts = function() {
// 					this._posts = u.qsa("li.item", this._news);
// 					if(this._posts) {
// 						var i, node;
// 						for(i = 0; node = this._posts[i]; i++) {
//
// 							var header = u.qs("h2,h3", node);
// 							header.current_readstate = node.getAttribute("data-readstate");
// 							if(header.current_readstate) {
// 								u.addCheckmark(header);
// //								u.as(node.checkmark, "top", (header.offsetTop + 3) + "px");
// 							}
//
//
// 							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
// 							u.ass(node, {
// 								"opacity": 1
// 							});
//
// 						}
//
// 					}
// 				}
// 			}
// 		}
//

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
