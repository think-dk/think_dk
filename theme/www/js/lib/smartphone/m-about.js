Util.Modules["about"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", this);

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			u.showScene(this);

		}

		// Custom intro
		// scene.takeoverIntro = function(node) {
		//
		// 	this.loadIntro(node);
		//
		// 	u.ce(node);
		// 	node.clicked = function() {
		// 		page.cN.scene.finishIntro();
		// 		delete this.clicked;
		// 	}
		//
		// }

		scene.loadIntro = function(node) {

			page.buildLoader();


			// Create hotspots
			this.ul_hotspots = u.ae(node, "ul", {"class":"hotspots"});
			this.hotspots = [];
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot1", "html":"t"}));
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot2", "html":"h"}));
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot3", "html":"i"}));
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot4", "html":"n"}));
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot5", "html":"k"}));

			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot6", "html":"d"}));
			this.hotspots.push(u.ae(this.ul_hotspots, "li", {"class":"hotspot hotspot7", "html":"k"}));


			// Create additional bg element
			this.bgs = [];
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));

			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));
			this.bgs.push(u.ae(node, "div", {"class":"bg about"}));


			// Find next outro images and preload them
			this.bg_images = page.getRandomBackgrounds(7);

			// Images loaded
			this.loaded = function(queue) {

				var i;
				for(i = 0; i < this.bg_images.length; i++) {
					u.ass(this.bgs[i], {
						"background-image":"url("+this.bg_images[i]+")",
					});
				}

				this.images_ready = true;
				this.loadController();
			}
			u.preloader(this, this.bg_images);

			// Remove existing audioPlayer
			if(this.audioPlayer) {
				this.audioPlayer.stop();
				this.removeChild(this.audioPlayer);
			}

			//. Prepare audio player
			this.audioPlayer = u.audioPlayer({autoplay:true});
			u.ae(this, this.audioPlayer);

			this.audioPlayer.scene = this;
			this.audioPlayer.ready = function() {
				this.scene.audioplayer_ready = true;
				this.scene.loadController();
			}

		}


		// Control intro assets loading
		scene.loadController = function() {
			if(this.images_ready && this.audioplayer_ready) {
				page.destroyLoader();
				this.playIntro();
			}
		}



		scene.showIntroFrame = function(frame) {
			// u.bug("showIntroFrame:" + frame);

			u.ass(this.hotspots[frame], {
				"transition": "all 0.1s ease",
				"color": "#26962d",
				"background-color": "#ffffff",
			});

			u.ass(this.bgs[frame], {
				"transition": "all 0.1s ease",
				"opacity": 1,
			});

		}


		// scene.intro_timestamps = [2330, 2625, 2900, 3200, 3487, 4349, 4645];
		scene.intro_timestamps = [2341, 2635, 2925, 3215, 3505, 4360, 4670];

		scene.playIntro = function() {

			// Show hotspots
			u.ass(this.ul_hotspots, {
				"transition":"all 0.5s ease 0.5s",
				"opacity": 1,
			});

			if(this.audioPlayer.can_autoplay) {

				this.current_frame = 0;
				this.audioPlayer.timeupdate = function() {
					// u.bug("timeupdate", this.currentTime*1000);

					scene.playIntroManually(this.currentTime*1000);

					// CurrentTime updates too slow – a timer is required for best result
					// if((this.currentTime*1000)+500 > this.scene.intro_timestamps[this.scene.current_frame]) {
					// 	this.scene.showIntroFrame(this.scene.current_frame);
					// 	this.scene.current_frame++
					// }
					//
					// if(this.scene.current_frame >= this.scene.intro_timestamps.length) {
					// 	u.t.setTimer(this.scene, "finishIntro", 500);
						delete this.timeupdate;
					// }

				}
				this.audioPlayer.loadAndPlay("/assets/audio/intro-4-2.mp3", {"position": 0}).then().catch(error => {
					this.scene.playIntroManually(0);
				});

				this.audioPlayer.ended = function() {
					this.scene.removeChild(this);
					delete this.scene.audioPlayer;
				}
			}
			else {
				scene.playIntroManually(0);
			}

		}

		// No sound - manual playback
		scene.playIntroManually = function(start_at) {
			// u.bug("scene.playIntroManually");
			this.sequence_timers = [];
			for(i = 0; i < this.intro_timestamps.length; i++) {
				this.sequence_timers.push(u.t.setTimer(this, "showIntroFrame", this.intro_timestamps[i]-start_at, i));
			}

			this.t_finish = u.t.setTimer(this, "finishIntro", 5000);
		}


		scene.finishIntro = function() {
			// u.bug("finishIntro");

			u.t.resetTimer(this.t_finish);
			for(i = 0; i < this.sequence_timers.length; i++) {
				u.t.resetTimer(this.sequence_timers[i]);
			}

			var i, bg;
			// Remove backgrounds, except last one – keep it as fadeout cover
			for(i = 0; i < this.bgs.length-1; i++) {
				bg = this.bgs[i];
				bg.parentNode.removeChild(bg);
			}


			this.ul_hotspots.transitioned = function() {
				this.parentNode.removeChild(this);
			}
			u.ass(this.ul_hotspots, {
				"transition": "all 0.5s ease",
				"opacity":0,
			});


			this.bgs[6].transitioned = function() {
				this.parentNode.removeChild(this);
			}
			u.ass(this.bgs[6], {
				"transition": "all 0.5s ease",
				"opacity":0,
			});


			if(this.ul_hotspots.parentNode.id == "outro") {
				page.endPageTransition();
			}
			else {
				page.finishIntro();
			}

			this.intro_is_finished = true;

		}


		scene.destroy = function() {

			if(this.audioPlayer && fun(this.audioPlayer.ended)) {
				this.audioPlayer.ended();
			}
			// if(!this.intro_is_finished) {
			// 	this.finishIntro()
			// }

			page.cN.removeChild(this);
		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}