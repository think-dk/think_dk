Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			// Position all content relatively to this._h1
			// u.a.translate(this._h1, (page.cN.offsetWidth/2)-(this._h1.offsetWidth/2), (page.cN.offsetHeight/2)-(this._h1.offsetHeight))
			// u.a.translate(this._forgotten, this._h1._x + this._h1.offsetWidth/2, this._h1._y+this._h1.offsetHeight);
			// u.a.translate(this._safety, this._h1._x - this._h1.offsetWidth/1.5, this._h1._y-this._safety.offsetHeight);
			// u.a.translate(this._long, this._safety._x + this._safety.offsetWidth, this._h1._y-this._long.offsetHeight/2);
			// u.a.translate(this._bills, this._safety._x + this._safety.offsetWidth, this._long._y-this._bills.offsetHeight);
			// u.a.translate(this._everything, this._h1._x - this._everything.offsetWidth, this._h1._y + this._everything.offsetHeight/3);
			// u.a.translate(this._slaves, this._forgotten._x - this._slaves.offsetWidth, this._forgotten._y);
			// u.a.translate(this._ability, this._h1._x + this._h1.offsetWidth, this._long._y + this._long.offsetHeight);
			// u.a.translate(this._tyrant, this._slaves._x + this._slaves.offsetWidth/3, this._forgotten._y + this._now.offsetHeight);
			// u.a.translate(this._means, this._h1._x - this._means.offsetWidth, this._slaves._y-this._slaves.offsetHeight);
			// u.a.translate(this._luxery, this._tyrant._x - this._tyrant.offsetWidth/2, this._tyrant._y+this._tyrant.offsetHeight);
			// u.a.translate(this._wake, this._bills._x - this._bills.offsetWidth/2, this._safety._y-this._wake.offsetHeight);
			// u.a.translate(this._goal, this._bills._x + this._bills.offsetWidth, this._bills._y);
			// u.a.translate(this._think, this._h1._x + this._h1.offsetWidth/2, this._luxery._y+this._luxery.offsetHeight);
			// u.a.translate(this._busy, this._ability._x, this._ability._y+this._ability.offsetHeight);
			// u.a.translate(this._nothing, this._luxery._x + this._luxery.offsetWidth, this._luxery._y);
			// u.a.translate(this._cost, this._forgotten._x + this._forgotten.offsetWidth, this._h1._y+this._h1.offsetHeight);
			// u.a.translate(this._idleness, this._tyrant._x - this._idleness.offsetWidth, this._tyrant._y);
			// u.a.translate(this._except, this._everything._x - this._except.offsetWidth, this._safety._y + this._safety.offsetHeight);
			// u.a.translate(this._content, this._long._x + this._long.offsetWidth, this._ability._y - this._now.offsetHeight);
			// u.a.translate(this._now, this._tyrant._x + this._tyrant.offsetWidth, this._tyrant._y);
			// u.a.translate(this._time, this._now._x + this._now.offsetWidth, this._cost._y + this._cost.offsetHeight);

			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			// reference content
			this._h1 = u.qs("h1", this);
			this._long = u.qs(".long", this);
			this._long._spans = u.qsa("span", this._long);

			this._now = u.qs(".now", this);
			this._time = u.qs(".time", this);
			this._wake = u.qs(".wake", this);
			this._wake._spans = u.qsa("span", this._wake);
			this._realize = u.qs(".realize", this);

			this._means = u.qs(".means", this);
			this._tyrant = u.qs(".tyrant", this);
			this._tyrant._spans = u.qsa("span", this._tyrant);

			this._goal = u.qs(".goal", this);
			this._goal._spans = u.qsa("span", this._goal);

			this._forgotten = u.qs(".forgotten", this);
			this._bills = u.qs(".bills", this);
			this._busy = u.qs(".busy", this);
			this._idleness = u.qs(".idleness", this);
			this._idleness._spans = u.qsa("span", this._idleness);

			this._safety = u.qs(".safety", this);
			this._safety._spans = u.qsa("span", this._safety);

			this._luxery = u.qs(".luxery", this);
			this._luxery._spans = u.qsa("span", this._luxery);

			this._cost = u.qs(".cost", this);
			this._everything = u.qs(".everything", this);
			this._content = u.qs(".content", this);
			this._slaves = u.qs(".slaves", this);
			this._slaves._spans = u.qsa("span", this._slaves);

			this._nothing = u.qs(".nothing", this);
			this._nothing._spans = u.qsa("span", this._nothing);

			this._except = u.qs(".except", this);
			this._ability = u.qs(".ability", this);
			this._think = u.qs(".think", this);


			// adjust scene padding for nice centered animation
			u.as(this, "paddingTop", (((u.browserH() - this._h1.offsetHeight)/2) - page.hN.offsetHeight) + "px");
			u.as(this, "paddingBottom", ((u.browserH() - this._think.offsetHeight)/2) - 0 + "px");


			// show all content - makes for a nice final splash
			this.showAllContent = function() {

				// scroll back to top
				u.scrollTo(window, {"y":0});

				var node, i, span;
				var nodes = u.qsa("p,h1,h2,h3", this);
				for(i = 0; node = nodes[i]; i++) {
					node.transitioned = function() {
						u.ac(this, "active");
					}
					if(node._opacity == 0) {
						u.a.transition(node, "all 0.4s ease-in-out " + (i)*100 + "ms");
						u.a.setOpacity(node, 1);
					}
					// else {
					// 	u.a.transition(node, "none");
					// }
				}
				var spans = u.qsa("span", this);
				for(i = 0; span = spans[i]; i++) {
					span.transitioned = function() {
						u.ac(this, "active");
						u.a.transition(this, "none");
					}
					if(span._opacity == 0) {
						u.a.transition(span, "all 0.4s ease-in-out " + ((i)*100)+((nodes.length)*100));
						u.a.setOpacity(span, 1);
					}
					// else {
					// 	u.a.transition(span, "none");
					// }
				}

				// // map links to texts
				// u.ce(this._time);
				// u.ac(this._time, "link");
				// this._time.clicked = function() {
				// 	location.href = "/artikler/det-er-på-tide";
				// }
				// u.ce(this._h1);
				// u.ac(this._h1, "link");
				// this._h1.clicked = function() {
				// 	location.href = "/artikler/jeg-tror";
				// }
			}


			scene.sequence = new Array();
			scene.addSequence = function(sequence) {
				this.sequence.push(sequence);
			}

			scene.nextSequence = function(delay) {
				if(this.random) {
					this.playRandom(delay);
				}
				else {
					if(this.sequence.length) {
						this._sequence = this.sequence.shift();
	
						if(delay) {
							this.t_sequence = u.t.setTimer(this, this._sequence, delay);
						}
						else {
							this._sequence();
						}
					}
				}
			}

			// show node
			scene.show = function(node) {
				node.transitioned = function() {
					u.ac(this, "active");
				}
				u.a.transition(node, "all 0.5s ease-in");
				u.a.setOpacity(node, 1);

				u.scrollTo(window, {"node":node, "offset_y":(u.browserH() - node.offsetHeight)/2});
			}
	
			// hide node
			scene.hide = function(node) {
				node.transitioned = function() {
					u.rc(this, "active");
				}
				u.a.transition(node, "all 0.3s ease-in");
				u.a.setOpacity(node, 0);
			}
	

			// show one span, and hide the rest for later
			scene.showSpan = function(span, show_node) {
				var i, _span;
				if(show_node) {
					for(i = 0; _span = span.parentNode._spans[i]; i++) {
						if(_span != span) {
							u.a.transition(_span, "none");
							u.a.setOpacity(_span, 0);
						}
					}
					this.show(span.parentNode);
				}
				else {
					this.show(span);
				}
			}


			// show: jeg tror
			scene.addSequence(function() {
				this.show(this._h1);
				this.nextSequence(1200);
			});

			// show: vi har
			scene.addSequence(function() {
				this.showSpan(this._long._spans[0], true);
				this.nextSequence(100);
			});

			// show: sovet
			scene.addSequence(function() {
				this.showSpan(this._long._spans[1]);
				this.nextSequence(800);
			});

			// hide: jeg tror
			scene.addSequence(function() {
				this.hide(this._h1);
				this.nextSequence(200);
			});

			// show: længe nok
			scene.addSequence(function() {
				this.showSpan(this._long._spans[2]);
				this.nextSequence(700);
			});

			// show: nu
			scene.addSequence(function() {
				this.show(this._now);
				this.nextSequence(200);
			});


			// hide: vi har
			scene.addSequence(function() {
				this.hide(this._long._spans[0]);
				this.nextSequence(200);
			});

			// hide: sovet
			scene.addSequence(function() {
				this.hide(this._long._spans[1]);
				this.nextSequence(900);
			});

			// hide: længe nok
			scene.addSequence(function() {
				this.hide(this._long._spans[2]);
				this.nextSequence(400);
			});

			// show: er det på tide
			scene.addSequence(function() {
				this.show(this._time);
				this.nextSequence(400);
			});

			// hide: nu
			scene.addSequence(function() {
				this.hide(this._now);
				this.nextSequence(1000);
			});

			// hide: er det på tide
			scene.addSequence(function() {
				this.hide(this._time);
				this.nextSequence(100);
			});

			// show: at
			scene.addSequence(function() {
				this.showSpan(this._wake._spans[0], true);
				this.nextSequence(100);
			});

			// show: vågne
			scene.addSequence(function() {
				this.showSpan(this._wake._spans[1]);
				this.nextSequence(700);
			});

			// hide: at
			scene.addSequence(function() {
				this.hide(this._wake._spans[0]);
				this.nextSequence(0);
			});

			// show: og
			scene.addSequence(function() {
				this.showSpan(this._wake._spans[2]);
				this.nextSequence(1000);
			});

			// hide: vågne
			scene.addSequence(function() {
				this.hide(this._wake._spans[1]);
				this.nextSequence(100);
			});

			// show: indse
			scene.addSequence(function() {
				this.show(this._realize);
				this.nextSequence(400);
			});

			// hide: vågne og
			scene.addSequence(function() {
				this.hide(this._wake);
				this.nextSequence(800);
			});

			// show: at midlet
			scene.addSequence(function() {
				this.show(this._means);
				this.nextSequence(300);
			});

			// hide: indse
			scene.addSequence(function() {
				this.hide(this._realize);
				this.nextSequence(700);
			});

			// show: er blevet en tyran
			scene.addSequence(function() {
				this.show(this._tyrant);
				this.nextSequence(400);
			});

			// hide: at midlet
			scene.addSequence(function() {
				this.hide(this._means);
				this.nextSequence(800);
			});

			// hide: er blevet
			scene.addSequence(function() {
				this.hide(this._tyrant._spans[0]);
				this.nextSequence(600);
			});

			// hide: en tyran
			scene.addSequence(function() {
				this.hide(this._tyrant._spans[1]);
				this.nextSequence(100);
			});

			// show: og målet er
			scene.addSequence(function() {
				this.show(this._goal);
				this.nextSequence(800);
			});

			// show: glemt
			scene.addSequence(function() {
				this.show(this._forgotten);
				this.nextSequence(600);
			});

			// hide: og målet er
			scene.addSequence(function() {
				this.hide(this._goal);
				this.nextSequence(300);
			});

			// show: is stakken af regninger
			scene.addSequence(function() {
				this.show(this._bills);
				this.nextSequence(500);
			});

			// hide: glemt
			scene.addSequence(function() {
				this.hide(this._forgotten);
				this.nextSequence(900);
			});

			// hide: i stakken af regning
			scene.addSequence(function() {
				this.hide(this._bills);
				this.nextSequence(700);
			});

			// show: vi har så travlt
			scene.addSequence(function() {
				this.show(this._busy);
				this.nextSequence(800);
			});

			// show: at stilstand
			scene.addSequence(function() {
				this.show(this._idleness);
				this.nextSequence(600);
			});

			// hide: vi har så travlt
			scene.addSequence(function() {
				this.hide(this._busy);
				this.nextSequence(200);
			});

			// show: er tryghed
			scene.addSequence(function() {
				this.show(this._safety);
				this.nextSequence(800);
			});

			// hide: at stilstand
			scene.addSequence(function() {
				this.hide(this._idleness);
				this.nextSequence(400);
			});

			// hide: er tryghed
			scene.addSequence(function() {
				this.hide(this._safety);
				this.nextSequence(100);
			});

			// show: og tryghed er
			scene.addSequence(function() {
				this.showSpan(this._luxery._spans[0], true);
				this.nextSequence(500);
			});

			// show: en luksus
			scene.addSequence(function() {
				this.showSpan(this._luxery._spans[1]);
				this.nextSequence(900);
			});

			// hide: og tryghed er
			scene.addSequence(function() {
				this.hide(this._luxery._spans[0]);
				this.nextSequence(300);
			});

			// show: der koster os
			scene.addSequence(function() {
				this.show(this._cost);
				this.nextSequence(600);
			});

			// hide: en luxus
			scene.addSequence(function() {
				this.hide(this._luxery._spans[1]);
				this.nextSequence(300);
			});

			// hide: der koster os
			scene.addSequence(function() {
				this.hide(this._cost);
				this.nextSequence(100);
			});

			// show: alt
			scene.addSequence(function() {
				this.show(this._everything);
				this.nextSequence(1600);
			});

			// hide: alt
			scene.addSequence(function() {
				this.hide(this._everything);
				this.nextSequence(800);
			});

			// show: tilfredse
			scene.addSequence(function() {
				this.show(this._content);
				this.nextSequence(700);
			});

			// show: som mættede slaver
			scene.addSequence(function() {
				this.showSpan(this._slaves._spans[0], true);
				this.nextSequence(200);
			});
			// show: som mættede slaver
			scene.addSequence(function() {
				this.showSpan(this._slaves._spans[1]);
				this.nextSequence(1000);
			});


			// hide: som mættede
			scene.addSequence(function() {
				this.hide(this._slaves._spans[0]);
				this.nextSequence(800);
			});

			// hide: tilfredse
			scene.addSequence(function() {
				this.hide(this._content);
				this.nextSequence(100);
			});

			// hide: slaver
			scene.addSequence(function() {
				this.hide(this._slaves._spans[1]);
				this.nextSequence(400);
			});

			// show: men
			scene.addSequence(function() {
				this.showSpan(this._nothing._spans[0], true);
				this.nextSequence(400);
			});

			// show: intet er vores
			scene.addSequence(function() {
				this.showSpan(this._nothing._spans[1]);
				this.nextSequence(800);
			});

			// hide: men
			scene.addSequence(function() {
				this.hide(this._nothing._spans[0]);
				this.nextSequence(100);
			});

			// show: bortset fra
			scene.addSequence(function() {
				this.show(this._except);
				this.nextSequence(400);
			});

			// hide: intet er vores
			scene.addSequence(function() {
				this.hide(this._nothing._spans[1]);
				this.nextSequence(100);
			});

			// show: evnen
			scene.addSequence(function() {
				this.show(this._ability);
				this.nextSequence(1400);
			});

			// hide: bortset fra
			scene.addSequence(function() {
				this.hide(this._except);
				this.nextSequence(1000);
			});

			// hide: evnen
			scene.addSequence(function() {
				this.hide(this._ability);
				this.nextSequence(400);
			});

			// show: til at tænke selv
			scene.addSequence(function() {
				this.show(this._think);
				this.nextSequence(3000);
			});

			// hide: til at tænke selv
			scene.addSequence(function() {
				this.hide(this._think);
				this.nextSequence(500);
			});

			scene.addSequence(function() {
				this.showAllContent();
			});

			scene.fontsLoaded = function() {
				// start sequence after 1s
				this.nextSequence(1000);
			}

			// start sequence after 1s
			scene.nextSequence(1000);


			page.cN.scene = this;
			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
