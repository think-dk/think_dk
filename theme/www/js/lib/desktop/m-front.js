Util.Modules["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);

		scene.resized = function() {
//			u.bug("scene.resized:", this);

			if(this.intro && !this.intro.is_small) {
				u.ass(this.intro, {
					"height": page.browser_h + "px",
					"width": page.browser_w + "px"
				});
			}
			// re-position text nodes
			// if(this.intro && this.intro._textnodes) {
			// 	var i, node;
			// 	for(i = 0; node = this.intro._textnodes[i]; i++) {
			// 		var node_x = (page.cN.offsetWidth-node.offsetWidth) / 2;
			// 		var node_y = ((page.cN.offsetHeight-node.offsetHeight) / 2) - page.hN.offsetHeight / 2;
			// 		u.ass(node, {
			// 			"right": node_x+"px",
			// 			"bottom": node_y+"px",
			// 		}, false);
			// 	}
			// }

			

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			// map reference
			page.cN.scene = this;

			// required fonts loaded
			this.fontsLoaded = function() {

				u.columns(this, [
					{"c175": [
						"div.intro", 
						"div.article", 
						"div.news"
						// ".pagination"
					]},
					{"c125": [
						".all_events",
					]},
					{"c300": [
						"div.company"
					]}
				]);



				page.resized();


				this.build();
			}

			// preload fonts
			u.fontsReady(this, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			]);

		}


		scene.build = function() {
//			u.bug("scene.build:, this);
			var intro_cookie = u.getCookie("intro_v1");

			if (u.qs(".intro", this)) {
				this.intro = u.qs(".intro", this);
				this.intro.scene = this;
	
				this.showLoader();
			}


			// TODO: maybe also check for tablet? It does not play audio and then the intro loop breaks


			if(!intro_cookie && this.intro) {
				this.show_full_intro = true;
				this.initIntro();
			}
			// just show end result of intro
			else if (intro_cookie && this.intro) {
				this.show_full_intro = false;
				this.initShortIntro();
			}
			// there is no intro page
			else {
				this.initNoIntro();
			}

		}



		// INTRO

		scene.showLoader = function() {

			this.intro_loader = u.ae(this.intro, "div", {"class":"loader"});
			this.intro_loader_dot = u.ae(this.intro_loader, "div", {"class":"dot"});
			this.intro_loader_dot.scene = this;
			this.intro_loader_dot.loaderAnimation = function() {
				
//				console.log("loop:" + this.loaderAnimationA)
				var random = u.random(0, 5);
				u.a.transition(this, "all 0.3s ease-in-out");
				u.ass(this, {
					"transform":"scale("+random+")",
				});

			}
			this.t_intro_loader = u.t.setInterval(this.intro_loader_dot, "loaderAnimation", 300);
//			this.intro_loader_dot.loaderAnimationA();

			// u.ass(this.intro, {
			// 	"background":"red"
			// });
//			console.log("loader on");
		}



		scene.removeLoader = function() {

			u.t.resetInterval(this.t_intro_loader);
			this.intro_loader_dot.transitioned = function() {
				this.scene.intro_loader.parentNode.removeChild(this.scene.intro_loader);
			}
			u.a.transition(this.intro_loader_dot, "all 0.2s ease-in-out");
			u.ass(this.intro_loader_dot, {
				"transform":"scale(25)",
			});
			// u.ass(this.intro, {
			// 	"background":"white"
			// });
//			console.log("loader off");
		}

		
		scene.createIntroBgs = function() {
//			u.bug("createIntroBgs");

			u.preloader(this.intro, [
				"/img/intro/bg_front_1.jpg",
				"/img/intro/bg_front_2.jpg",
				"/img/intro/bg_front_3.jpg",
				"/img/intro/bg_front_4.jpg",
				"/img/intro/bg_front_5.jpg",
				"/img/intro/bg_front_6.jpg",
				"/img/intro/bg_front_7.jpg",
//				"/assets/audio/intro-4-2.mp3",
			]);

			this.intro.bgs = [""];
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg1", "html":"<h2>do you</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg2", "html":"<h2>want</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg3", "html":"<h2>to make</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg4", "html":"<h2>a</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg5", "html":"<h2>difference?</h2>"}));

			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg6", "html":"<h2>welcome</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg7", "html":"<h2>to the club</h2>"}));

		}

		scene.injectHotspots = function() {
//			u.bug("injectHotspots");

			var ul_hotspots = u.ae(this.intro, "ul", {"class":"hotspots"});
			u.ce(ul_hotspots);
			ul_hotspots.clicked = function(event) {
				u.e.kill(event);
			}
			this.intro.hotspots = [""];
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot1", "html":"t"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot2", "html":"h"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot3", "html":"i"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot4", "html":"n"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot5", "html":"k"}));

			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot6", "html":"d"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot7", "html":"k"}));


			var i;
//			for(i = 0; hotspot = this.intro.hotspots[i]; i++) {
			for(i = 1; i < this.intro.hotspots.length; i++) {
//				hotspot = this.intro.hotspots[i];

				this.intro.hotspots[i].intro = this.intro;
				this.intro.hotspots[i].i = i;

				this.intro.hotspots[i].over = function(event) {
					this.intro.scene.showIntroFrame(this.i);
				}
				u.e.addOverEvent(this.intro.hotspots[i], this.intro.hotspots[i].over);

			}


			this.hideIntro();

			this.intro.is_active = true;

		}

		scene.showIntroFrame = function(frame) {
//			u.bug("showIntroFrame:" + frame);

			if(this.frame != frame) {

//					console.log("on " + frame)
				u.ass(this.intro.bgs[frame], {
					"opacity":0,
					"display":"block",
				});

				u.a.transition(this.intro.bgs[frame], "all 0.15s ease-in-out");
				u.ass(this.intro.bgs[frame], {
					"opacity":1,
				});

				if(this.intro.hotspots) {
					u.ac(this.intro.hotspots[frame], "selected");
				}


				if(this.frame) {
					u.a.transition(this.intro.bgs[this.frame], "all 0.15s ease-in-out 0.05s");
					u.ass(this.intro.bgs[this.frame], {
						"opacity":0,
					});

					if(this.intro.hotspots) {
						u.rc(this.intro.hotspots[this.frame], "selected");
					}
				}

				this.frame = frame;
				
			}
			// // this.frame++;
//				console.log("this.frame:" + this.frame);
			// var colors = ["","red",  "yellow", "green", "blue", "orange", "purple", "cyan"];
			// u.ass(this, {
			// 	"background-color":colors[this.frame],
			// });
		}

		scene.showCarousel = function() {
			this.intro.loaded = function() {

				this.scene.injectHotspots();

				// apply text-scaling
				u.textscaler(this, {
					"min_height":400,
					"max_height":1000,
					"min_width":600,
					"max_width":1300,
					"unit":"rem",
					"h2":{
						"min_size":4,
						"max_size":6
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

				this.scene.showIntroFrame(u.random(1, this.bgs.length-1));

			}
			this.createIntroBgs();
		}

		scene.initNoIntro = function() {
			u.bug("initNoIntro");

			// Inject needed div for image carousel
			this.intro = u.ie(scene, "div", {class:"intro"});
			this.intro.scene = this;

			this.showCarousel();
		}

		scene.initShortIntro = function() {
			u.bug("initShortIntro");

			this.removeLoader();

			this.showCarousel();
		}

		// Prepare intro content for playback
		scene.initIntro = function() {
			 u.bug("initIntro")

			// does intro contain any text?
			this.intro._textnodes = u.qsa("p,h2,h3,h4", this.intro);
			if(this.intro._textnodes.length) {

				// apply text-scaling
				u.textscaler(this.intro, {
					"min_height":400,
					"max_height":1000,
					"min_width":600,
					"max_width":1300,
					"unit":"rem",
					"h2":{
						"min_size":4,
						"max_size":6
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


				// set height of intro and show it
				u.ass(this.intro, {
					"height": page.browser_h + "px",
					"width": page.browser_w + "px",
					"opacity": 1,
				});

				var i, node;
				// set initial state for all intro content
				for(i = 0; node = this.intro._textnodes[i]; i++) {
					u.ass(node, {
						"position":"absolute",
						"opacity": 0, 
						"right": "50px", 
						"bottom": (50) + "px",
					});
				}

				u.ass(this, {
					"height":this.intro.offsetHeight - page.hN.offsetHeight+"px"
				});



				// prepare audioPlayer
				this.intro.loaded = function() {
//					this.scene.removeLoader();

					this.scene.showIntro();
					
				}
				this.createIntroBgs();
			}

			// skip intro if it has no content
			else {
				this.hideIntro();
			}

		}


		// start intro animation playback
		scene.showIntro = function() {
//			u.bug("scene.showIntro");

			var node, duration, i;

			// cancel autoplay timer
//			u.t.resetTimer(this.t_autoplay);

			
			this.intro.audioPlayer = u.audioPlayer({autoplay:true});
			this.intro.audioPlayer.playing = function(event) {
//				u.bug("this.intro.audioPlayer.playing");
				u.t.resetTimer(this.t_timeout);
				// current time
				var _time = event.target.currentTime;

				// tmp_intro.mp3
//				this.intro.timestamps = ["", 25, 315, 605, 895, 1185, 2045, 2335];

				// long intro (intro.mp3)
//				this.intro.timestamps = ["", 2239, 2625, 2900, 3200, 3487, 4349, 4645];

				// 4.1
				this.intro.timestamps = ["", 2330, 2625, 2900, 3200, 3487, 4349, 4645];

				u.t.setTimer(this.intro.scene, "removeLoader", this.intro.timestamps[1]-_time - 200);

				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[1]-_time, 1);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[2]-_time, 2);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[3]-_time, 3);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[4]-_time, 4);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[5]-_time, 5);

				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[6]-_time, 6);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[7]-_time, 7);

				u.t.setTimer(this.intro.scene, "injectHotspots", 6045 - _time);

				// only once
				delete this.playing;
			}
			u.ae(this, this.intro.audioPlayer);
			this.intro.audioPlayer.timeout = function() {
				if(this.currentTime) {
					this.playing({"target":{"currentTime":this.currentTime}});
					
				}
				else {
					this.stop();
					this.playing({"target":{"currentTime":2000}});
				}
			}
			this.intro.audioPlayer.ready = function() {
//				u.bug("this.intro.audioPlayer.ready");
				if(this.can_autoplay) {
					this.t_timeout = u.t.setTimer(this, "timeout", 4000);
					this.load("/assets/audio/intro-4-2.mp3");
				}
				else {
					this.playing({"target":{"currentTime":2000}});
				}
			}

			this.intro.audioPlayer.intro = this.intro;



			// var promise = this.intro.audioPlayer.play();
			// if (promise !== undefined) {
			// 	promise.catch(error => {
			// 		console.log("shiite");
			//         // Auto-play was prevented
			//         // Show a UI element to let the user manually start playback
			//     }).then(() => {
			// 		console.log("all good");
			//     });
			// }


			// start event chain playback
//			this.intro.play();

		}




		// hide intro and continue to article
		scene.hideIntro = function() {
//			u.bug("exit intro")

			u.saveCookie("intro_v1", 1, {"expires":false});

			// could also be called if no intro is present
			// if(this.intro) {
			//
			// 	// hide intro
			// 	u.ass(this.intro, {
			// 		"opacity": 0,
			// 		"display": "none"
			// 	});
			//
			// 	// remove intro from DOM
			// 	this.intro.parentNode.removeChild(this.intro);
			//
			// 	// delete reference
			// 	delete this.intro;
			// }


			if(!this.intro.is_active) {

				u.ass(this, {
					"height":"auto"
				});


				// u.ass(u.qs("h2", this.intro.bgs[1]), {"opacity":0});
				// u.ass(u.qs("h2", this.intro.bgs[2]), {"opacity":0});
				// u.ass(u.qs("h2", this.intro.bgs[3]), {"opacity":0});
				// u.ass(u.qs("h2", this.intro.bgs[4]), {"opacity":0});
				// u.ass(u.qs("h2", this.intro.bgs[5]), {"opacity":0});
				// u.ass(u.qs("h2", this.intro.bgs[6]), {"opacity":0});
				//
				// var last_bg_header = u.qs("h2", this.intro.bgs[7]);
				// u.a.transition(last_bg_header, "all 0.2s ease-in-out");
				// u.ass(last_bg_header, {
				// 	"opacity":0
				// });

				u.ce(this.intro);
				this.intro.clicked = function() {

					u.a.transition(this, "all .5s ease-in-out");
					u.a.transition(this.scene._article, "all .5s ease-in-out");

					if(this.is_small) {
						u.ass(this, {
							"width": page.browser_w + "px",
							"height": page.browser_h + "px",
							"top": "-150px",
							"left": "0px",
							"border-radius":"0px",
							"cursor":"zoom-out",
						});

						u.ass(this.scene._article, {
							"margin-top": "-70px",
						});

						this.is_small = false;
					}
					else {
						u.ass(this, {
							"width": "540px",
							"top": 0,
							"height": 350 + "px",
							"left": "50px",
							"border-radius":"5px",
							"cursor":"zoom-in",
						});

						u.ass(this.scene._article, {
							"margin-top": "50px",
						});

						this.is_small = true;
					}
					
					
				}

//				console.log(this.intro.hotspots + ", " + this.frame)
				if(this.frame) {
					u.ac(this.intro.hotspots[this.frame], "selected");
				}


				if(this.show_full_intro) {
					u.a.transition(this.intro, "all .5s ease-in-out");
				}
				u.ass(this.intro, {
					"width": "540px",
					"top": 0,
					"height": "350px",
					"left": "50px",
					"border-radius":"5px",
					"cursor":"zoom-in",
				});

				this.intro.is_small = true;


				u.a.transition(this.intro, "all .5s ease-in-out");
				u.ass(this.intro, {
					"opacity":1,
				});

				// show header and footer
				u.a.transition(page.hN, "none");
				u.ass(page.hN, {
					"opacity":0,
					"display":"block"
				});

				u.a.transition(page.fN, "none");
				u.ass(page.fN, {
					"opacity":0,
					"display":"block"
				});

				u.a.transition(page.hN, "all 0.5s ease-in");
				u.ass(page.hN, {
					"opacity":1,
				});

				u.a.transition(page.fN, "all 0.5s ease-in");
				u.ass(page.fN, {
					"opacity":1,
				});

				// accept cookies?
				page.acceptCookies();

				// start showing article
				this.showArticle();
				
			}
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
				u.t.setTimer(this, "showEvents", 800);

			}
			// show events if no article exists
			else {
				this.showEvents();
			}

		}



		// EVENTS

		// start news animation playback
		scene.showEvents = function() {
			u.bug("showEvents")

			this._events = u.qs("div.all_events", this);

			if(this._events) {
				this._events.scene = this;

				u.ass(this._events, {
					"opacity": 0,
					"display":"block"
				});

				u.a.transition(this._events, "all 0.4s ease-in-out", "showPosts");
				u.ass(this._events, {
					"opacity":1
				});

				this._events.showPosts = function() {
					this._posts = u.qsa("li.item", this._events);
					if(this._posts) {
						var i, node;
						for(i = 0; node = this._posts[i]; i++) {

							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
							u.ass(node, {
								"opacity": 1
							});

						}

					}
				} 

				// show news when time is up
				u.t.setTimer(this, "showNews", 800);

			}
			// show news if no events exists
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


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
