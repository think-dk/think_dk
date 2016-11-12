Util.Objects["stripe"] = new function() {
	this.init = function(scene) {
		u.bug("stripe init:" + u.nodeId(scene))
		

		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;


//			u.showScene(this);


			this.transitioned = function() {

				// Open Checkout with further options:
				this.Stripe.open({
					opened: this.Stripe.opened.bind(this.Stripe),
					closed: this.Stripe.closed.bind(this.Stripe)
				});
	
	
			}

			u.a.transition(this, "all 0.4s ease-in-out");
			u.ass(this, {
				"opacity":1
			})

			var amount = Number(u.qs("dd.amount", this).innerHTML)*100;
			var currency = u.qs("dd.currency", this).innerHTML;
			var email = u.qs("dd.email", this).innerHTML;
			var reference = u.qs("dd.reference", this).innerHTML;



			this.tokenReturned = function(token) {

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


			this.Stripe = StripeCheckout.configure({
				key: 'pk_test_9JXIVsrick4rvSoLltT9eKny',
				image: '/img/logo.png',
				locale: 'auto',
				token: this.tokenReturned.bind(this),
				name: 'think.dk',
				email: email,
				description: reference,
				zipCode: true,
				currency: currency,
				amount: amount,
				allowRememberMe:false,

			});
			this.Stripe.scene = this;



			this.Stripe.closed = function() {

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
			this.Stripe.opened = function() {

				u.a.transition(this.scene, "all 0.2s ease-in-out");
				u.ass(this.scene, {
					"opacity":0
				})
			}



			// Close Checkout on page navigation:
			window.addEventListener('popstate', function() {
			  handler.close();
			});



			page.resized();
		}

		// scene is ready
		scene.ready();
	}
}