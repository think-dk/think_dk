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
			this.stripe_link = u.qs(".payment_method.stripe li.continue input.button", this);
			this.stripe_link.scene = this;

			if(this.stripe_link) {

				u.e.click(this.stripe_link);
				this.stripe_link.onclick = function(event) {
					u.e.kill(event);




					this.scene.tokenReturned = function(token) {

						this.processing = true;

						var form = u.qs("form.token", this);
						if(form) {

							var input = u.qs("input#token", form);
							if(input) {

								// set token value received from Stripe
								input.value = token.id

								// submit form to server
								form.submit();
							}

						}

				
						// console.log("token:");
						// console.log(this);
						// console.log(token);
				
				
					}
					var email = "martin@think.dk";
					var reference = "asdfa";
					var currency = "DKK";
					var amount = 15600;
					this.scene.Stripe = StripeCheckout.configure({
						key: 'pk_test_9JXIVsrick4rvSoLltT9eKny',
						image: '/img/logo.png',
						locale: 'auto',
						token: this.scene.tokenReturned.bind(this.scene),
						name: 'think.dk',
						email: email,
						description: reference,
						zipCode: true,
						currency: currency,
						amount: amount,
						allowRememberMe:false,

					});
					
					this.scene.Stripe.scene = this;


					this.scene.Stripe.closed = function() {

						if(this.scene.processing) {
							u.qs("h2", this.scene).innerHTML = "We are waiting for the gateway response";

							u.a.transition(this.scene, "all 0.2s ease-in-out");
							u.ass(this.scene, {
								"opacity":1
							});
						}
						else {
							history.back();
						}
						console.log("closed")
						console.log(this);
				
					}
					this.scene.Stripe.opened = function() {

						u.a.transition(this.scene, "all 0.2s ease-in-out");
						u.ass(this.scene, {
							"opacity":0
						})
					}

					// Open Checkout with further options:
					this.scene.Stripe.open({
						opened: this.scene.Stripe.opened.bind(this.scene.Stripe),
						closed: this.scene.Stripe.closed.bind(this.scene.Stripe)
					});
					
	
				}


				// this.stripe_link.setAttribute("data-success-function", "stripePayment");
				// u.o.oneButtonForm.init(this.stripe_link);
				// this.stripe_link.stripePayment = function(response) {
				//
				// 	if(response.isHTML) {
				// 		page.cN.new_scene = u.qs("div.scene", response);
				// 		u.ass(page.cN.new_scene, {
				// 			"opacity":0
				// 		});
				// 		u.ae(page.cN, page.cN.new_scene);
				// 		page.cN.scene.transitioned = function(event) {
				// 			page.cN.removeChild(page.cN.scene);
				// 			page.cN.scene = this;
				// 			delete page.cN.new_scene;
				//
				// 			u.init();
				// 		}
				// 		u.a.transition(page.cN.scene, "all 0.5s ease-in-out");
				// 		u.ass(page.cN.scene, {
				// 			"opacity":0
				// 		});
				// 	}
				// 	else {
				// 		page.notify({"cms_status":"error", "cms_message":"Something went wrong. Please reload the page and try again."})
				// 	}
				//
				// 	console.log(response);
				// }
			}


			// accept cookies?
//			page.acceptCookies();


			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}