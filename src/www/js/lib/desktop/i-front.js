Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			if(this.intro) {
				u.ass(this.intro, {
					"height": page.browser_h + "px"
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
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			// map reference
			page.cN.scene = this;

			// required fonts loaded
			this.fontsLoaded = function() {

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
			 u.bug("initIntro")

			// map reference
			this.intro.scene = this;



			// does intro contain any text?
			this.intro._textnodes = u.qsa("p,h2,h3,h4", this.intro);
			if(this.intro._textnodes.length) {

				// end intro on click
				u.e.click(this.intro);
				this.intro.clicked = function(event) {

					if(this.is_active) {
						u.scrollTo(window, {"node":this.scene._article, "offset_y":100});
					}

					// stop event chain
					// if(typeof(this.stop) == "function") {
					// 	// stop any playback
					// 	this.stop();
					// }
					// // or just hide intro
					// else {
					// 	// remove trigger event listener (just to be on the safe side)
					// 	u.e.removeWindowEvent(this.scene, "mousemove", this.scene.intro_event_id);
					//
					// 	// hide intro
					// 	this.scene.hideIntro();
					// }
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


				// set height of intro and show it
				u.ass(this.intro, {
//					"height": u.browserH()-(page.hN.offsetHeight+page.fN.offsetHeight+125) + "px",
					"height": u.browserH() + "px",
//					"margin-top": - (page.hN.offsetHeight + this.intro.offsetTop) + "px",
//					"margin-buttom": - (page.hN.offsetHeight + this.intro.offsetTop) + "px",
					"opacity": 1
				});

				var i, node;
				// set initial state for all intro content
				for(i = 0; node = this.intro._textnodes[i]; i++) {
					// var node_x = (this.intro.offsetWidth-(node.offsetWidth+50));
					// var node_y = (this.intro.offsetHeight-(node.offsetHeight+150));
					u.bug(node.offsetHeight);
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


				u.preloader(this.intro, [
					"/assets/images/bg_front_1.jpg",
					"/assets/images/bg_front_2.jpg",
					"/assets/images/bg_front_3.jpg",
					"/assets/images/bg_front_4.jpg",
					"/assets/images/bg_front_5.jpg",
					"/assets/images/bg_front_6.jpg",
					"/assets/images/bg_front_7.jpg",
					"/assets/audio/intro.mp3",
				]);

				this.intro.bgs = [""];
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg1", "html":"<h2>do you</h2>"}));
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg2", "html":"<h2>want</h2>"}));
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg3", "html":"<h2>to make</h2>"}));
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg4", "html":"<h2>a</h2>"}));
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg5", "html":"<h2>differenc?</h2>"}));

				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg6", "html":"<h2>welcome</h2>"}));
				this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg7", "html":"<h2>to the club</h2>"}));

				// prepare audioPlayer
				this.intro.loaded = function() {
					this.scene.showIntro();
					
				}
			}

			// skip intro if it has no content
			else {
				this.hideIntro();
			}

		}

		// start intro animation playback
		scene.showIntro = function() {
			u.bug("scene.showIntro");

			var node, duration, i;

			// cancel autoplay timer
//			u.t.resetTimer(this.t_autoplay);

			this.intro.audioPlayer = u.audioPlayer();
			this.intro.audioPlayer.intro = this.intro;
			this.intro.audioPlayer.load("/assets/audio/intro.mp3");


			// this.intro.audioPlayer.timeupdate = function(event) {
			// 	console.log(this.currentTime);
			//
				// var tone_length = 0.28;
				// var frame = Math.round(this.currentTime/tone_length);
				// console.log(frame)

				// if(this.currentTime >= 0 && this.currentTime < tone_length*1) {
				// 	this.intro.showFrame(1);
				// }
				// else if(this.currentTime >= tone_length*1 && this.currentTime < tone_length*2) {
				// 	this.intro.showFrame(2);
				// }
				// else if(this.currentTime >= tone_length*2 && this.currentTime < tone_length*3) {
				// 	this.intro.showFrame(3);
				// }
				// else if(this.currentTime >= tone_length*3 && this.currentTime < tone_length*4) {
				// 	this.intro.showFrame(4);
				// }
				// else if(this.currentTime >= tone_length*4 && this.currentTime < tone_length*6) {
				// 	this.intro.showFrame(5);
				// }
				// else if(this.currentTime >= tone_length*6 && this.currentTime < tone_length*7) {
				// 	this.intro.showFrame(6);
				// }
				// else if(this.currentTime >= tone_length*7) {
				// 	this.intro.showFrame(7);
				// }



			// }
			// this.intro.audioPlayer.ended = function() {
			//
			// 	// start event chain playback
			// 	this.intro.play();
			//
			// }


			this.intro.showFrame = function(frame) {
				
				if(this.frame != frame) {

//					console.log("on " + frame)
					u.ass(this.bgs[frame], {
						"opacity":0,
						"display":"block",
					});

					u.a.transition(this.bgs[frame], "all 0.1s ease-in-out");
					u.ass(this.bgs[frame], {
						"opacity":1,
					});


					if(this.frame) {
						u.a.transition(this.bgs[this.frame], "all 0.05s ease-in-out 0.05s");
						u.ass(this.bgs[this.frame], {
							"opacity":0,
						});
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


			this.intro.audioPlayer.playing = function(event) {

//				console.log(event)
				// current time
				var _time = event.target.currentTime;
				// tmp_intro.mp3
//				this.intro.timestamps = ["", 25, 315, 605, 895, 1185, 2045, 2335];

				// long intro (intro.mp3)
				this.intro.timestamps = ["", 2239, 2625, 2900, 3200, 3487, 4349, 4645];


				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[1]+_time, 1);
				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[2]+_time, 2);
				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[3]+_time, 3);
				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[4]+_time, 4);
				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[5]+_time, 5);

				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[6]+_time, 6);
				u.t.setTimer(this.intro, this.intro.showFrame, this.intro.timestamps[7]+_time, 7);

				// only once
				delete this.playing;
			}
			this.intro.audioPlayer.play();






			// // remove trigger event listener
			// if(u.e.event_support == "mouse") {
			// 	// remove trigger event listener
			// 	u.e.removeWindowEvent(this, "mousemove", this.intro_event_id);
			// }

			// start new event chain
// 			u.eventChain(this.intro);
//
// 			// first node
// 			node = this.intro._textnodes[0];
// 			// calculate duration based on text length
// 			duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*100 : 1500;
//
// 			// add events to event chain
// 			this.intro.addEvent(node, u._stepA1, duration);
// 			this.intro.addEvent(node, u._stepA2, 300);
//
// 			// loop through middle child nodes
// 			for(i = 1; i < this.intro._textnodes.length-1; i++) {
// 				node = this.intro._textnodes[i];
// 				// calculate duration based on text length
// 				duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*75 : 1500;
//
// 				// add events to event chain
// 				this.intro.addEvent(node, u._stepA1, duration);
// 				this.intro.addEvent(node, u._stepA2, 400);
// 			}
//
// 			// // last node
// 			// node = this.intro._textnodes[this.intro._textnodes.length-1];
// 			// // calculate duration based on text length
// 			// duration = node.innerHTML.length*100 > 1500 ? node.innerHTML.length*100 : 1500;
// 			//
// 			// // add events to event chain
// 			// this.intro.addEvent(node, u._stepA1, duration);
// 			// this.intro.addEvent(node, u._stepA2, 400);
//
// 			// event chain ended
// 			this.intro.eventChainEnded = function() {
// //				u.bug("eventChainEnded")
//
// 				// hide intro
// 				// this.scene.hideIntro();
// 			}


			this.activateIntro = function() {

				var ul_hotspots = u.ae(this.intro, "ul", {"class":"hotspots"});
				u.ce(ul_hotspots);
				ul_hotspots.clicked = function(event) {
					u.e.kill(event);
				}
				this.intro.hotspots = [""];
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot1"}));
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot2"}));
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot3"}));
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot4"}));
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot5"}));

				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot6"}));
				this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot7"}));

//				u.bug(this.intro.hotspots.length)

				var i, hotspot;
	//			for(i = 0; hotspot = this.intro.hotspots[i]; i++) {
				for(i = 1; i < this.intro.hotspots.length; i++) {
					hotspot = this.intro.hotspots[i];
					// u.bug(this.intro.hotspots[i]);
					// u.bug(hotspot + ", " + i)

// 					var height = this.intro.offsetHeight();
// 					var width = this.intro.offsetWidth();
// 					u.ass(hotspot, {
//
// //						"top":(((height-200) / 5) * i) - i%2 + "px",
// 						// "left":width-200 / 100 /
//
// 					});

					this.intro.hotspots[i].inputStarted = function(event) {
						u.bug("click")
						u.e.kill(event);
						this.intro.showFrame(this.i);
					}
					u.e.addStartEvent(this.intro.hotspots[i], this.inputStarted);
					u.ce(this.intro.hotspots[i])

					// u.e.hover(this.intro.hotspots[i]);
					this.intro.hotspots[i].intro = this.intro;
					this.intro.hotspots[i].i = i;
					// this.intro.hotspots[i].over = function() {
					//
					//
					// 	this.blink = function() {
					// 		console.log("blink");
					//
					// 		u.a.transition(this, "all 0.4s ease-in-out");
					// 		u.ass(this, {
					// 			"opacity":0
					// 		});
					// 	}
					//
					// 	u.a.transition(this, "all 0.1s ease-in-out", "blink");
					// 	u.ass(this, {
					// 		"opacity":1
					// 	});
					//
					//
					//
					// 	u.bug("over:" + this.i)
					// 	this.intro.showFrame(this.i);
					//
					// 	this.intro.audioPlayer.play(this.intro.timestamps[this.i]/1000);
					//
					//
					// }

				}
				
//				this.intro.play();


				this.hideIntro();


				this.intro.is_active = true;
			}



			u.t.setTimer(this, this.activateIntro, 6045);

			// start event chain playback
//			this.intro.play();

		}

		// hide intro and continue to article
		scene.hideIntro = function() {
//			u.bug("exit intro")

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


				u.ass(u.qs("h2", this.intro.bgs[1]), {"opacity":0});
				u.ass(u.qs("h2", this.intro.bgs[2]), {"opacity":0});
				u.ass(u.qs("h2", this.intro.bgs[3]), {"opacity":0});
				u.ass(u.qs("h2", this.intro.bgs[4]), {"opacity":0});
				u.ass(u.qs("h2", this.intro.bgs[5]), {"opacity":0});
				u.ass(u.qs("h2", this.intro.bgs[6]), {"opacity":0});

				var last_bg_header = u.qs("h2", this.intro.bgs[7]);
				u.a.transition(last_bg_header, "all 0.2s ease-in-out");
				u.ass(last_bg_header, {
					"opacity":0
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


		// scene is ready
		scene.ready();

	}

}
