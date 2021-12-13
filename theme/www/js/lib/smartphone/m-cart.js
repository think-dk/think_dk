Util.Modules["cart"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", this);
		

		scene.resized = function() {
			// u.bug("scene.resized:", this);


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);



			this.isHTML = true;
			page.notify(this);

			this.header_cart = u.qs("li.cart span.total", page.hN);

			this.total_cart_price = u.qs("li.total span.total_price", this);
			this.total_cart_vat = u.qs("li.total span.total_vat", this);

			this.cart_nodes = u.qsa("ul.items li.item", this);


			var i, node;
			for(i = 0; node = this.cart_nodes[i]; i++) {
				

				node.scene = this;
				node.item_id = u.cv(node, "id");

//				node.span_x = u.qs("span.x", node);
				node.h3 = u.qs("h3", node);
				node.span_a = u.qs("span.a", node);
				node.unit_price = u.qs("span.unit_price", node);
				node.total_price = u.qs("span.total_price", node);

				node.div_prices = u.ie(node, "p", {"class":"prices"});
				u.ae(node.div_prices, node.span_a);
				u.ae(node.div_prices, node.unit_price);
				u.ae(node.div_prices, node.total_price);

				u.ie(node, node.h3);
				
				// look for quantity update form
				var quantity_form = u.qs("form.updateCartItemQuantity", node)

				// initialize quantity form
				if(quantity_form) {
					quantity_form.node = node;

					u.f.init(quantity_form);


					quantity_form.inputs["quantity"].updated = function() {
						u.ac(this._form.actions["update"], "primary");

						this._form.submit();
					}


					quantity_form.submitted = function() {

						this.response = function(response) {
							page.notify(response);

							if(response) {

								var total_price = u.qs("div.scene li.total span.total_price", response);
								var total_vat = u.qs("div.scene li.total span.total_vat", response);

								var header_cart = u.qs("div#header li.cart span.total", response);
								var item_row = u.ge("id:"+this.node.item_id, response);
								var item_total_price = u.qs("span.total_price", item_row);
								var item_unit_price = u.qs("span.unit_price", item_row);

								// update prices
								this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
								this.node.scene.total_vat_price.innerHTML = total_vat.innerHTML;

								this.node.scene.header_cart.innerHTML = header_cart.innerHTML;
								this.node.total_price.innerHTML = item_total_price.innerHTML;

								this.node.unit_price.innerHTML = item_unit_price.innerHTML;

					 			u.rc(this.actions["update"], "primary");

							}
						}

						u.request(this, this.action, {"method":"post", "data":this.getData()});
					}
				}


			

				var bn_delete = u.qs("ul.actions li.delete", node);
				if(bn_delete) {
					u.m.oneButtonForm.init(bn_delete);

					bn_delete.node = node;	
					bn_delete.confirmed = function(response) {

						if(response) {

							var header_cart = u.qs("div#header li.cart span.total", response);

							var total_price = u.qs("div.scene li.total span.total_price", response);
							var total_vat = u.qs("div.scene li.total span.total_vat", response);

							// update total price
							this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
							this.node.scene.total_cart_vat.innerHTML = total_vat ? total_vat.innerHTML : this.node.scene.total_cart_vat.innerHTML.replace(/\d/g, "0").replace(/[0]+,/, "0,");

							this.node.scene.header_cart.innerHTML = header_cart.innerHTML;

							this.node.parentNode.removeChild(this.node);
						}
					}

				}

			}

			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}


Util.Modules["checkoutSignup"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			var form_login = u.qs("form.login", this);
			if(form_login) {
				u.f.init(form_login);
			}


			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				u.f.init(form_signup);

				form_signup.preSubmitted = function() {
					this.actions["signup"].value = "Wait";
					u.ac(this, "submitting");
					u.ac(this.actions["signup"], "disabled");
				}
//				form_signup.submitted = function() {}
			}


			var cart_nodes = u.qsa("ul.items li.item", this);

			if(cart_nodes) {

				var i, node;
				for(i = 0; node = cart_nodes[i]; i++) {
				

					node.scene = this;
					node.item_id = u.cv(node, "id");

					node.h3 = u.qs("h3", node);
					node.span_a = u.qs("span.a", node);
					node.unit_price = u.qs("span.unit_price", node);
					node.total_price = u.qs("span.total_price", node);

					node.div_prices = u.ie(node, "p", {"class":"prices"});
					u.ae(node.div_prices, node.span_a);
					u.ae(node.div_prices, node.unit_price);
					u.ae(node.div_prices, node.total_price);

					u.ie(node, node.h3);

				}

			}

			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}

Util.Modules["checkout"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			var form_login = u.qs("form.login", this);
			if(form_login) {
				u.f.init(form_login);
			}


			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				u.f.init(form_signup);

				form_signup.preSubmitted = function() {
					this.actions["signup"].value = "Wait";
					u.ac(this, "submitting");
					u.ac(this.actions["signup"], "disabled");
				}
//				form_signup.submitted = function() {}
			}


			var cart_nodes = u.qsa("ul.items li.item", this);

			if(cart_nodes) {

				var i, node;
				for(i = 0; node = cart_nodes[i]; i++) {
				

					node.scene = this;
					node.item_id = u.cv(node, "id");

					node.h3 = u.qs("h3", node);
					node.span_a = u.qs("span.a", node);
					node.unit_price = u.qs("span.unit_price", node);
					node.total_price = u.qs("span.total_price", node);

					node.div_prices = u.ie(node, "p", {"class":"prices"});
					u.ae(node.div_prices, node.span_a);
					u.ae(node.div_prices, node.unit_price);
					u.ae(node.div_prices, node.total_price);

					u.ie(node, node.h3);

				}

			}

			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}


Util.Modules["shopProfile"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);


			var form = u.qs("form.details", this);
			if(form) {
				u.f.init(form);
			}


			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}



Util.Modules["shopAddress"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);



			var form = u.qs("form.address", this);
			if(form) {
				u.f.init(form);
			}


			u.showScene(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}