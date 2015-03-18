Util.Objects["article"] = new function() {
	this.init = function(scene) {

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


			var article = u.qs("div.article", this);

			if(article) {
				// look for a hardlink for this article
				var hardlink = u.qs("dd.hardlink", article);
				article.hardlink = hardlink ? hardlink.innerHTML : false;

				// INIT SHARING
				if(article.hardlink) {

					var article_body = u.qs(".articlebody", article);
					var injection_position = u.ns(article_body);

					// sharing wrapper
					article.sharing = u.ae(article, "div", {"class":"sharing"});

					// position correct below article body
					if(injection_position) {
						article.insertBefore(article.sharing, injection_position);
					}


					article.h3_share = u.ae(article.sharing, "h3", {"html":"Del artiklen"})
					article.p_share = u.ae(article.sharing, "p", {"html":article.hardlink})
					u.e.click(article.p_share);
					article.p_share.clicked = function() {
						u.selectText(this);
					}

					// create base svg (base sharing icon)
					article.sharing.svg = u.svg({
						"node":article.sharing,
						"class":"sharing",
						"width":500,
						"height":300,
						"shapes":[
							{
								"type": "line",
								"class": "primary",
								"x1": 6,
								"y1": 150,
								"x2": 22,
								"y2": 150
							},
							{
								"type": "circle",
								"class": "primary",
								"cx": 6,
								"cy": 150,
								"r": 5
							},
							{
								"type": "circle",
								"class": "primary",
								"cx": 22,
								"cy": 150,
								"r": 3
							}
							// ,
							// {
							// 	"type": "rect",
							// 	"class": "primary",
							// 	"x": 70,
							// 	"y": 90,
							// 	"width": 300,
							// 	"height": 20
							// }
						]
					});


					// create counter for svg drawings, to limit number of possible drawings
					article.sharing.svg.drawings = 0;


					article.sharing.drawCircle = function(svg, cx, cy) {

						var circle = u.svgShape(svg, {
							"type": "circle",
							"cx": cx,
							"cy": cy,
							"r":  1,
						});
						circle.svg = svg;

						var new_radius = u.random(2, 5);
						circle.transitioned = svg._circle_transitioned;
						u.a.to(circle, "all linear 100ms", {"r":new_radius});
				
						return circle;
					}
					article.sharing.drawLine = function(svg, x1, y1, x2, y2) {
		//				u.bug("scene.drawLine:" + x1 + ", " + y1);

						x2 = x2 ? x2 : (x1 + u.random(30, 50));

						if(!y2) {
							if(y1 < 150) {
								y2 = y1 + u.random(-50, 30);
							}
							else {
								y2 = y1 + u.random(-30, 50);
							}
						}

		//					u.bug("x2:" + x2 + " , y2:" + y2)

						if(x2 < 490 && y2 > 10 && y2 < 290 && (x2 < 70 || x2 > 450 || (y2 < 130 && y1 < 130) || (y2 > 170 && y1 > 170))) {
					
							var line = u.svgShape(svg, {
								"type": "line",
								"x1": x1,
								"y1": y1,
								"x2": x1,
								"y2": y1
							});

							u.ie(svg, line);
							line.svg = svg;

		//					u.bug("x2:" + x2 + " , y2:" + y2)

							line.transitioned = svg._line_transitioned;
							u.a.to(line, "all linear 150ms", {"x2": x2, "y2": y2});

							return line;
					
						}
						return false;
					}


					article.sharing.svg._line_transitioned = function() {
		//				u.bug("line done:" + u.nodeId(this));

						this.transitioned = null;

						if(!this.svg.hide) {
							var key = u.randomString(4);
			//				u.bug("do circle:" + key)
							var cx = Number(this.getAttribute("x2"));
							var cy = Number(this.getAttribute("y2"));
							var circle = this.svg.node.drawCircle(this.svg, cx, cy);
							circle.id = key;
						}
					}
					article.sharing.svg._circle_transitioned = function() {
		//				u.bug("circle done:" + u.nodeId(this));

		//				u.bug("this.svg.drawings:" + this.svg.drawings)
						this.transitioned = null;

						if(!this.svg.hide) {

							this.svg.drawings++;
							if(this.svg.drawings < 50) {

								var x1 = Number(this.getAttribute("cx"));
								var y1 = Number(this.getAttribute("cy"));
								var r = Number(this.getAttribute("r"));
			//					u.bug("x1:" + x1 + " , y1:" + y1)


								var line, i;

			//					var key = u.randomString(4);
			//					u.bug("do line:" + u.randomString(4));

								if(r >= 5 && this.svg.drawings < 6) {

									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, -60));
									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(50, 60), y1 + u.random(-20, 20));
									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(40, 60));

								}
								else if(r >= 4) {

									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(-15, -40));
									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(15, 40));
						
								}
								else if(r >= 3 || this.svg.drawings%2 == 1) {


									line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, 40));
		//							line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(15, 40));

								}
								else {}
							}
						}
					}


					// create rect for mouseover
					article.sharing.button = u.svgShape(article.sharing.svg, {
						"type": "rect",
						"class": "share",
						"x": 0,
						"y": 130,
						"width": 40,
						"height": 40,
						"fill": "transparent"
					});

					article.sharing.button._x1 = 22;
					article.sharing.button._y1 = 150;
					article.sharing.button.sharing = article.sharing;
					article.sharing.button.over = function() {

						u.t.resetTimer(this.t_hide);

						u.ac(this.sharing, "hover");

		//				u.bug("base line:");
						this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(-55, -40));
						this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(-20, -15));

						this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(15, 20));
						this.sharing.drawLine(article.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(40, 55));

						// this.transitioned = svg_drawing._line_transitioned;
						// u.a.to(this, "all linear 50ms", {"x2":x2});
					}
					article.sharing.button.out = function() {
						var circles = u.qsa("circle:not(.primary)", this.sharing.svg);
						var lines = u.qsa("line:not(.primary)", this.sharing.svg);

						var line, circle, i;

						u.rc(this.sharing, "hover");

						this.sharing.svg.hide = true;
						this.sharing.svg.drawings = 0;

						for(i = 0; circle = circles[i]; i++) {
							circle.transitioned = function() {
								this.transitioned = null;
								this.svg.removeChild(this);
							}

							u.a.to(circle, "all linear 0.15s", {"r":0})
						}
						for(i = 0; line = lines[i]; i++) {

							x1 = Number(line.getAttribute("x1"));
							y1 = Number(line.getAttribute("y1"));
							x2 = Number(line.getAttribute("x2"));
							y2 = Number(line.getAttribute("y2"));

							new_x = x2 - ((x2-x1)/2);
							if(y1 < y2) {
								new_y = y2 - ((y2-y1)/2);
							}
							else {
								new_y = y1 - ((y1-y2)/2);
							}

		//					u.bug(x1 + ", " + x2 + ":new_x:" + new_x + ", " + new_y);

							line.transitioned = function() {
								this.transitioned = null;
								this.svg.removeChild(this);
							}
							u.a.to(line, "all linear 0.25s", {"x1":new_x, "y1":new_y, "x2":new_x, "y2":new_y})

						}

						u.t.setTimer(this.sharing.svg, function() {this.hide = false;}, 250)

					}
					article.sharing.autohide = function() {
						u.t.resetTimer(this.button.t_hide);
						this.button.t_hide = u.t.setTimer(this.button, this.button.out, 500);
					}

					u.e.addEvent(article.sharing.button, "mouseover", article.sharing.button.over);
					u.e.addEvent(article.sharing, "mouseleave", article.sharing.autohide);

				}

			}



			// INIT COMMENTS




			page.cN.scene = this;
			page.resized();
		}


		// scene is ready
		scene.ready();

	}
}
