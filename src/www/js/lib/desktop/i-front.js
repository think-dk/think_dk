Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));




			scene.fontsLoaded = function() {

				page.resized();

				this.initIntro();





			}



			page.cN.scene = this;


			u.fontsReady(scene, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			]);

		}

		scene.build = function() {



		}

		scene.initIntro = function() {
			u.bug("initIntro")

			this.intro = u.qs(".intro", this);
			this.intro.scene = scene;

			u.e.click(this.intro);
			this.intro.clicked = function() {
				this.scene.step7();
			}

			this._h1 = u.qs("h1", this.intro);
			this._h2 = u.qs("h2", this.intro);
			this._body = u.qs("div.articlebody", this.intro);

			if(this._h1) {
				this._h1.scene = this;
				u.as(this._h1, "opacity", 0);
			}

			if(this._h2) {
				this._h2.scene = this;
				u.as(this._h2, "opacity", 0);
			}

			if(this._body) {
				this._body.scene = this;
				u.as(this._body, "opacity", 0);
			}

			u.textscaler(this.intro, {
				"min_height":400,
				"max_height":1000,
				"min_width":600,
				"max_width":1300,
				"unit":"rem",
				"h1":{
					"min_size":4,
					"max_size":8
				},
				"h2":{
					"min_size":2,
					"max_size":4
				},
				"p":{
					"min_size":4,
					"max_size":6
				}

			});



			this.intro_event_id = u.e.addWindowEvent(this, "mousemove", this.startIntro);
		}
		scene.startIntro = function() {

			u.e.removeWindowEvent(this, "mousemove", this.intro_event_id);

			// make sure css is updated
			u.as(this.intro, "opacity", 1);

			this.step1 = function() {

				var h1_x = (page.cN.offsetWidth-this._h1.offsetWidth) / 2;
				var h1_y = ((page.cN.offsetHeight-this._h1.offsetHeight) / 2) - page.hN.offsetHeight/2;


				u.ass(this._h1, {
					"position":"absolute",
					"opacity": 0, 
					"left": h1_x+"px", 
					"top": h1_y+"px",
				});


				u.a.transition(this._h1, "all 0.3s ease-in-out", "step2");
				u.ass(this._h1, {
					"opacity": 1
				});

			}

			this._h1.step2 = function() {

				if(this.scene._h2) {

					var h2_x = (page.cN.offsetWidth-this.scene._h2.offsetWidth) / 2;
					var h2_y = ((page.cN.offsetHeight-this.scene._h2.offsetHeight) / 2) - page.hN.offsetHeight/2;
					u.ass(this.scene._h2, {
						"position":"absolute",
						"opacity": 0, 
						"left": h2_x+"px", 
						"top": h2_y+"px",
					});

					this.scene._h2.innerHTML = "<span>"+this.scene._h2.innerHTML.split("").join("</span><span>")+"</span>"; 
					this.scene._h2.spans = u.qsa("span", this.scene._h2);

					for(i = 0; span = this.scene._h2.spans[i]; i++) {
						span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
						u.ass(span, {
							"transformOrigin": "0 100% 0",
							"transform":"translate(-40px, 0) rotate(85deg)",
							"opacity":0
						});
					}


					//(/([A-Za-z0-9 -\'\"?&\(\)]?)/g, "<span>$1</span>");
					u.t.setTimer(this.scene, "step3", 1100);
				}
				else {
					this.scene.introDone();
				}
			}

			this.step3 = function() {

				u.a.transition(this._h1, "all 0.2s ease-in", "step4");
				u.ass(this._h1, {
					"transform":"translate(0, -20px)",
					"opacity": 0
				});


			}

			this._h1.step4 = function() {

				u.as(this.scene._h2, "opacity", 1);

				var i, span;
				for(i = 0; span = this.scene._h2.spans[i]; i++) {
					u.a.transition(span, "all 0.2s ease-in-out "+(10*i)+"ms");
					u.ass(span, {
						"transform":"translate(0, 0) rotate(0)",
						"opacity":1
					});
				}


				u.t.setTimer(this.scene, "step5", 2000);
			}

			this.step5 = function() {

				var i, span;
				for(i = 0; span = this._h2.spans[i]; i++) {
					u.bug("span:" + span);
					u.a.transition(span, "all 0.2s ease-in-out "+(10*i)+"ms");
					u.ass(span, {
						"transform":"translate(60px, -60px) rotate(-135deg)",
						"opacity":0
					});
				}

				u.t.setTimer(this, "step6", 500);
			}

			this.step6 = function() {

				u.as(this._h2, "opacity", 0);

				var body_x = (page.cN.offsetWidth-this._body.offsetWidth) / 2;
				var body_y = ((page.cN.offsetHeight-this._body.offsetHeight) / 2) - page.hN.offsetHeight/2;
				u.ass(this._body, {
					"position":"absolute",
					"left": body_x+"px", 
					"top": body_y+"px",
					"transform":"translate(0, 20px)"
				});

				u.a.transition(this._body, "all 0.2s ease-in-out");
				u.ass(this._body, {
					"transform":"translate(0, 0)",
					"opacity": 1
				});

				u.t.setTimer(this, "step7", 1800);

			}

			this.step7 = function() {

				u.a.transition(this.intro, "all 0.2s ease-in-out", "step8");
				u.as(this.intro, "opacity", 0);

			}

			this.intro.step8 = function() {

				u.as(this, "display", "none");

				u.t.setTimer(this.scene, "introDone", 500);

			}


			// start intro if data is available
			if(this._h1) {
				this.step1();
			}
			else {
				this.introDone();
			}


		}

		scene.introDone = function() {


			this._posts = u.qsa("li.post", this);
			if(this._posts) {
				var i, node;
				for(i = 0; node = this._posts[i]; i++) {

					u.as(node, "display", "block");
					u.as(node, "opacity", 0);

					node.header = u.qs("h2", node);

					u.o.article.init(node);

					node.readstate = u.cv(node, "readstate");
					if(node.readstate) {
						u.addCheckmark(node);
						u.as(node.checkmark, "top", (this.header.offsetTop + 3) + "px");
					}
					u.as(node, "opacity", 1);

				}

			}

		}

		// scene is ready
		scene.ready();

	}

}
