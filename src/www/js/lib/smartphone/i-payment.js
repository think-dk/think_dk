Util.Objects["payment"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;


			u.showScene(this);


			// should index buttons and ajax load stipe page to make ajax work
			// needs to be tested
			this.stripe_link = u.qs(".payment_method.stripe li.continue", this);
			this.stripe_link.scene = this;

			if(this.stripe_link) {

				this.stripe_link.setAttribute("data-success-function", "stripePayment");
				u.o.oneButtonForm.init(this.stripe_link);
				this.stripe_link.stripePayment = function(response) {
					if(response.isHTML) {
						
						// var script = document.createElement("script");
						// script.onload = function() {
						//
						// }
						// script.src = "https://checkout.stripe.com/checkout.js";
						// document.head.appendChild(script);

						page.cN.new_scene = u.qs("div.scene", response);
						u.ass(page.cN.new_scene, {
							"opacity":0
							// "position":"absolute",
							// "top":0,
							// "left":0,
							// "width": page.browser_w+"px",
							// "transform":"translate("+page.browser_w+"px, 0)"
						});
						u.ae(page.cN, page.cN.new_scene);
						// page.cN.new_scene.transitioned = function(event) {
						// 	page.cN.removeChild(page.cN.scene);
						// 	page.cN.scene = this;
						// 	delete page.cN.new_scene;
						//
						// 	// u.ass(page.cN.scene, {
						// 	// 	"position":"static",
						// 	// 	"width": "auto"
						// 	// });
						// 	u.init();
						// }
						page.cN.scene.transitioned = function(event) {
//							u.a.transition(page.cN.new_scene, "all 0.5s ease-in-out");
// 							u.ass(page.cN.new_scene, {
// 								"opacity":1,
// //								"transform":"translate(0, 0)"
// 							});
							page.cN.removeChild(page.cN.scene);
							page.cN.scene = this;
							delete page.cN.new_scene;
							
							u.init();
						}
						u.a.transition(page.cN.scene, "all 0.5s ease-in-out");
						u.ass(page.cN.scene, {
							"opacity":0
//							"transform":"translate(-"+page.browser_w+"px, 0)"
							// "position":"absolute",
							// "top":0,
							// "left":0,
							// "width": page.browser_w+"px",
						});
					}
					else {
						page.notify({"cms_status":"error", "cms_message":"Something went wrong. Please reload the page and try again."})
					}

					console.log(response);
				}
			}


			// accept cookies?
//			page.acceptCookies();


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}