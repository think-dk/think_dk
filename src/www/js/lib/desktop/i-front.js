Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			// re-position text nodes
			if(this.intro && this.intro._textnodes) {
				var i, node;
				for(i = 0; node = this.intro._textnodes[i]; i++) {
					var node_x = (page.cN.offsetWidth-node.offsetWidth) / 2;
					var node_y = ((page.cN.offsetHeight-node.offsetHeight) / 2) - page.hN.offsetHeight / 2;
					u.ass(node, {
						"left": node_x+"px", 
						"top": node_y+"px",
					}, false);
				}
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			// map reference
			page.cN.scene = this;

			// required fonts loaded
			scene.fontsLoaded = function() {

				page.resized();
				this.build();
			}

			// preload fonts
			u.fontsReady(scene, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			]);

		}


		scene.build = function() {
//			u.bug("scene.build:" + u.nodeId(this));

			this.intro = u.qs(".intro", this);
			if(this.intro) {
				this.initIntro();
			}
			else {
				this.showArticle();
			}

		}



		// INTRO

		// Prepare intro content for playback
		scene.initIntro = function() {
			// u.bug("initIntro")

			// map reference
			this.intro.scene = this;

			// does intro contain any text?
			this.intro._textnodes = u.qsa("p,h2,h3,h4", this.intro);
			if(this.intro._textnodes.length) {

				// end intro on click
				u.e.click(this.intro);
				this.intro.clicked = function() {

					// stop event chain
					if(typeof(this.stop) == "function") {
						// stop any playback
						this.stop();
					}
					// or just hide intro
					else {
						// remove trigger event listener (just to be on the safe side)
						u.e.removeWindowEvent(this.scene, "mousemove", this.scene.intro_event_id);

						// hide intro
						this.scene.hideIntro();
					}
				}

				// apply text-scaling
				u.textscaler(this.intro, {
					"min_height":400,
					"max_height":1000,
					"min_width":600,
					"max_width":1300,
					"unit":"rem",
					"h2":{
						"min_size":4,
						"max_size":8
					},
					"h3":{
						"min_size":3,
						"max_size":6
					},
					"p":{
						"min_size":2,
						"max_size":4
					}

				});

				var i, node;
				// set initial state for all intro content
				for(i = 0; node = this.intro._textnodes[i]; i++) {
					var node_x = (page.cN.offsetWidth-node.offsetWidth) / 2;
					var node_y = ((page.cN.offsetHeight-node.offsetHeight) / 2) - page.hN.offsetHeight / 2;
					u.ass(node, {
						"position":"absolute",
						"opacity": 0, 
						"left": node_x+"px", 
						"top": node_y+"px",
					});
				}

				// set height of intro and show it
				u.ass(this.intro, {
					"height": u.browserH()-(page.hN.offsetHeight+page.fN.offsetHeight+100) + "px",
					"opacity": 1
				});


				// apply start-intro event listener
				if(u.e.event_support == "mouse") {
					this.intro_event_id = u.e.addWindowEvent(this, "mousemove", this.showIntro);
				}
				else {
					u.t.setTimer(this, "showIntro", 500);
				}
			}

			// skip intro if it has no content
			else {
				this.hideIntro();
			}

		}

		// start intro animation playback
		scene.showIntro = function() {

			var node, duration, i;

			// remove trigger event listener
			if(u.e.event_support == "mouse") {
				// remove trigger event listener
				u.e.removeWindowEvent(this, "mousemove", this.intro_event_id);
			}

			// start new event chain
			u.eventChain(this.intro);

			// first node
			node = this.intro._textnodes[0];
			// calculate duration based on text length
			duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*100 : 1500;

			// add events to event chain
			this.intro.addEvent(node, u._stepA1, duration);
			this.intro.addEvent(node, u._stepA2, 300);

			// loop through middle child nodes
			for(i = 1; i < this.intro._textnodes.length-1; i++) {
				node = this.intro._textnodes[i];
				// calculate duration based on text length
				duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*75 : 1500;

				// add events to event chain
				this.intro.addEvent(node, u._stepA1, duration);
				this.intro.addEvent(node, u._stepA2, 400);
			}

			// last node
			node = this.intro._textnodes[this.intro._textnodes.length-1];
			// calculate duration based on text length
			duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*100 : 1500;

			// add events to event chain
			this.intro.addEvent(node, u._stepA1, duration);
			this.intro.addEvent(node, u._stepA2, 400);

			// event chain ended
			this.intro.eventChainEnded = function() {
//				u.bug("eventChainEnded")

				// hide intro
				this.scene.hideIntro();
			}

			// start event chain playback
			this.intro.play();

		}

		// hide intro and continue to article
		scene.hideIntro = function() {
//			u.bug("exit intro")

			// could also be called if no intro is present
			if(this.intro) {

				// hide intro
				u.ass(this.intro, {
					"opacity": 0,
					"display": "none"
				});

				// remove intro from DOM
				this.intro.parentNode.removeChild(this.intro);

				// delete reference
				delete this.intro;
			}

			// accept cookies?
			page.acceptCookies();

			// start showing article
			this.showArticle();
		}



		// ARTICLE

		// start article animation playback
		scene.showArticle = function() {
			// u.bug("showArticle")

			// does article exist
			this._article = u.qs("div.article", this);
			if(this._article) {
				this._article.scene = this;

				u.ass(this._article, {
					"opacity":0,
					"display":"block"
				});

				// prepare childnodes for animation
				var cn = u.cn(this._article);
				this._article.nodes = [];
				for(i = 0; node = cn[i]; i++) {
					if(u.gcs(node, "display") != "none") {
						u.ass(node, {
							"opacity":0,
						});
						this._article.nodes.push(node);
					}
				}

				// show article node
				u.ass(this._article, {
					"opacity":1,
				});

				// apply headline anumation
				u._stepA1.call(this._article.nodes[0]);

				// show remaining article elements
				for(i = 1; node = cn[i]; i++) {
					u.a.transition(node, "all 0.3s ease-in "+(100+(i*200))+"ms");
					u.ass(node, {
						"transform":"translate(0, 0)",
						"opacity":1
					});

				}

				// show news when time is up
				u.t.setTimer(this, "showNews", 800);

			}
			// show news if no article exists
			else {
				this.showNews();
			}

		}



		// NEWS

		// start news animation playback
		scene.showNews = function() {
			u.bug("showNews")

			this._news = u.qs("div.news", this);

			if(this._news) {
				this._news.scene = this;

				u.ass(this._news, {
					"opacity": 0,
					"display":"block"
				});

				u.a.transition(this._news, "all 0.4s ease-in-out", "showPosts");
				u.ass(this._news, {
					"opacity":1
				});

				this._news.showPosts = function() {
					this._posts = u.qsa("li.item", this._news);
					if(this._posts) {
						var i, node;
						for(i = 0; node = this._posts[i]; i++) {

							var header = u.qs("h2,h3", node);
							header.current_readstate = node.getAttribute("data-readstate");
							if(header.current_readstate) {
								u.addCheckmark(header);
//								u.as(node.checkmark, "top", (header.offsetTop + 3) + "px");
							}


							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
							u.ass(node, {
								"opacity": 1
							});

						}

					}
				} 
			}
		}


		// scene is ready
		scene.ready();

	}

}
