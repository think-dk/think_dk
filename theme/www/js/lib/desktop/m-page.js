Util.Modules["page"] = new function() {
	this.init = function(page) {
		// u.bug("init page");

		// show parentnode comment in console
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		u.bug("Visit https://parentnode.dk for more information");
		u.bug_force = false;


		// create a generel style rule
		page.style_tag = document.createElement("style");
		page.style_tag.setAttribute("media", "all");
		page.style_tag.setAttribute("type", "text/css");
		page.style_tag = u.ae(document.head, page.style_tag);


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = page.insertBefore(page.nN, page.cN);


		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);


		// global resize handler
		page.resized = function(event) {
			// u.bug("page resized");

			page.browser_h = u.browserH();
			page.browser_w = u.browserW();


			// adjust content height
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;
			// Reset to auto height to be able to calculate real height
			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}


			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized(event);
			}

			// refresh DOM
			page.offsetHeight;

		}

		// global scroll handler
		page.scrolled = function(event) {

			this.scrolled_y = u.scrollY();


			// reduce logo
			if(this.scrolled_y < this.logo.top_offset) {

				if(this.logo.is_reduced) {
					this.logo.is_reduced = false;
					u.rc(this.logo, "reduced");
				}

				var reduce_font = (1-(this.logo.top_offset-this.scrolled_y)/this.logo.top_offset) * this.logo.font_size_gap;
				this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-reduce_font)+"px", "important");

			}
			// claim end state, once
			else if(!this.logo.is_reduced) {

				this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-this.logo.font_size_gap)+"px", "important");

				this.logo.is_reduced = true;
				u.ac(this.logo, "reduced");

			}


			// reduce navigation
			if(this.nN.top_offset && this.scrolled_y < this.nN.top_offset) {

				if(this.nN.is_reduced) {
					this.nN.is_reduced = false;
					u.rc(this.nN, "reduced");
				}

				var factor = (1-(this.nN.top_offset-this.scrolled_y)/this.nN.top_offset);

				var reduce_font = factor * this.nN.font_size_gap;
				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-reduce_font)+"px", "important");

				var reduce_top = factor * this.nN.top_offset_gap;
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-reduce_top)+"px", "important");

			}
			// claim end state, once
			else if(this.nN.top_offset && !this.nN.is_reduced) {

				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-this.nN.font_size_gap)+"px", "important");
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-this.nN.top_offset_gap)+"px", "important");

				this.nN.is_reduced = true;
				u.ac(this.nN, "reduced");

			}


			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled(event);
			}

		}


		// Build page loader (dot)
		page.buildLoader = function() {

			this.loader = u.ae(this, "div", {"id":"loader"});
			u.ass(this.loader, {
				"height": this.browser_h + "px",
			});

			this.loader.dot = u.ae(this.loader, "div", {"class": "dot"});
			this.loader.loaderAnimation = function() {
				var random = u.random(1, 4);
				u.ass(this.dot, {
					"transition":"all 0.3s ease-in-out",
					"transform":"scale("+random+")",
				});
			}

			// Start loader animation
			this.loader.t_loader = u.t.setInterval(this.loader, "loaderAnimation", 300);

		}

		// Destroy page loader (dot)
		page.destroyLoader = function(node) {

			if(this.loader) {
				u.t.resetInterval(this.loader.t_loader);

				this.loader.dot.transitioned = function() {
					page.removeChild(page.loader);

					// callback if needed
					if(node && fun(node.loaderDestroyed)) {
						node.loaderDestroyed();
					}
					delete page.loader;

				}
				u.ass(this.loader.dot, {
					"transition":"all 0.2s ease-in-out",
					// "transform":"scale(25)",
					"transform":"scale(0)",
					"opacity": 0,
				});

			}

		}


		// How many background images are available
		page.bg_image_count = 20;

		// Get two random different background images
		page.getRandomBackgrounds = function(count) {
			var i, images = [];
			while(images.length < this.bg_image_count) {
				images.push(images.length+1);
			}

			var return_images = [];
			for(i = 0; i < count; i++) {
				return_images.push("/img/intro/bg_"+images.splice(u.random(0, images.length-1), 1)[0]+".jpg");
			}

			return return_images;
		}


		// Preload page assets
		page.preload = function() {
			// u.bug("preload page assets");

			// Show loader
			this.buildLoader();


			// Prepare intro HTML and images
			this.intro = u.ie(this.hN, "div", {"id":"intro"});

			var random_images = this.getRandomBackgrounds(2);
			this.intro.bg_image_1 = random_images[0];
			this.intro.bg_image_2 = random_images[1];
			this.intro.bg_1 = u.ae(this.intro, "div", {"class":"bg bg1"});
			this.intro.bg_2 = u.ae(this.intro, "div", {"class":"bg bg2"});


			this.loader.checkLoading = function() {
				// u.bug("checkLoading", this.images_loaded, this.fonts_loaded);

				if(this.images_loaded && this.fonts_loaded) {

					// Scroll to top
					window.scrollTo(0, 0);

					page.destroyLoader();
					page.showIntro();

					// Find outro images and preload them
					var random_images = page.getRandomBackgrounds(2);
					page.intro.bg_image_3 = random_images[0];
					page.intro.bg_image_4 = random_images[1];

					u.preloader(page.intro, [
						page.intro.bg_image_3,
						page.intro.bg_image_4,
					]);
				}

			}


			// Preload fonts
			this.loader.fontsLoaded = function() {
				this.fonts_loaded = true;
				this.checkLoading();
			}
			u.fontsReady(this.loader, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			], {"callback": "fontsLoaded"});


			// Preload images
			this.loader.imagesLoaded = function() {
				this.images_loaded = true;
				this.checkLoading();
			}
			u.preloader(this.loader, [
				this.intro.bg_image_1,
				this.intro.bg_image_2,
			], {"loaded": "imagesLoaded"});

		}


		// Show main intro
		page.showIntro = function() {
			// u.bug("page showIntro");

			u.ass(this.hN, {
				"opacity": 1,
			});
			// set height of intro and show it
			u.ass(this.intro, {
				"height": page.browser_h + "px",
			});


			// Set background images
			u.ass(this.intro.bg_1, {
				"background-image":"url("+this.intro.bg_image_1+")",
			});
			u.ass(this.intro.bg_2, {
				"background-image":"url("+this.intro.bg_image_2+")",
			});


			// Intro is covering page
			this.intro.bg_2.transitioned = function() {

				// Enable scene intro takeover
				if(fun(page.cN.scene.takeoverIntro)) {
					page.cN.scene.takeoverIntro(page.intro);
				}
				// Or just finish
				else {
					page.finishIntro();
				}

			}


			u.ass(this.intro.bg_1, {
				// 1: standard
				// "clipPath": "polygon(0 0, 0 0, -50% 100%, -50% 100%)",

				// 2: reverse
				"clipPath": "polygon(100% 0, 100% 0, 50% 100%, 50% 100%)",

				// 4: complex
				// "clipPath": "polygon(100% 0, 75% 50%, 100% 0, 75% 50%, 75% 50%, 50% 100%, 75% 50%, 50% 100%)",
			});

			u.ass(this.intro.bg_1, {
				"transition": "all 0.5s ease 0.5s",
				// 1: standard
				// "clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",

				// 2: reverse
				"clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",

				// 4: complex
				// "clipPath": "polygon(100% 0, 0 0, -20% 0, 0 50%, 0 50%, -80% 100%, 0 100%, 50% 100%)",
			});

			u.ass(this.intro.bg_2, {
				// 1: standard
				// "clipPath": "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)",

				// 2: reverse
				"clipPath": "polygon(50% 0, 50% 0, 0 100%, 0 100%)",

				// 4: complex
				// "clipPath": "polygon(50% 0, 25% 50%, 50% 0, 25% 50%, 25% 50%, 0 100%, 25% 50%, 0 100%)",
			});

			u.ass(this.intro.bg_2, {
				"transition": "all 0.5s ease 0.5s",
				// 1: standard
				// "clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",

				// 2: reverse
				"clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",

				// 4: complex
				// "clipPath": "polygon(50% 0, 100% 0, 120% 0, 100% 50%, 100% 50%, 120% 100%, 100% 100%, 0 100%)",
			});

		}



		// Shrink intro into header
		page.finishIntro = function() {

			// Prepare intro for final animation
			u.ass(this.intro.bg_1, {
				"clipPath": "polygon(100% 0, 0 0, 0 100%, 50% 100%)",
			});
			u.ass(this.intro.bg_2, {
				"clipPath": "polygon(100% 0, 50% 0, 0 100%, 100% 100%)",
			});

			// Intro shrunk into place
			this.intro.transitioned = function() {
				u.ass(this, {
					"position": "relative",
					"z-index": 1,
				});

				page.build();
			}

			u.ass(this.intro, {
				"transition": "all 0.6s ease 0.14s",
				"height": "250px",
			});
			u.ass(this.intro.bg_1, {
				"transition": "all 0.6s ease",
				"width": "57.2%",
				"clipPath": "polygon(75% 0, 0 0, 0 100%, 100% 100%)",
			});
			u.ass(this.intro.bg_2, {
				"transition": "all 0.6s ease",
				"width": "57.2%",
				"clipPath": "polygon(100% 0, 0 0, 25% 100%, 100% 100%)",
			});

		}

		// Get page ready
		page.ready = function() {
			// u.bug("page ready");

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;

				// set resize handler
				u.e.addWindowEvent(this, "resize", this.resized);
				// set scroll handler
				u.e.addWindowEvent(this, "scroll", this.scrolled);


				if(fun(u.notifier)) {
					u.notifier(this);
				}
				if(obj(u.smartphoneSwitch)) {
					u.smartphoneSwitch.init(this);
				}
				if(fun(u.navigation)) {
					u.navigation();
				}


				this.resized();

				this.preload();

				this.initHeader();

				this.initNavigation();

				this.initFooter();

				this.resized();

				this.scrolled();

			}
		}

		// Build page and scene
		page.build = function() {

			// Start showing page elements (unless scene takes care of that)
			if(!fun(this.cN.scene.revealPage)) {
				this.revealPage();
			}

			// Show scene content
			this.cN.scene.ready();


			this.resized();


			// find remaining unhandled links (after scene has been initialized)
			var i, scene_link, scene_links = u.qsa("a[href]", this.cN.scene);
			for(i = 0; i < scene_links.length; i++) {
				scene_link = scene_links[i];
				u.ce(scene_link, {"type":"link"});
			}

		}


		// Control the page transition assets loading
		page.pageLoadController = function() {
			if(this.outro.ready && this.cN.response_ready) {

				if(fun(page.cN.scene.takeoverIntro)) {
					page.cN.scene.takeoverIntro(this.outro);
				}
				else {
					page.endPageTransition();
				}

			}
		}

		// Handle popstate url changes
		page.cN.navigate = function(url, raw_url) {
			u.bug("navigate", url, raw_url);

			this.response_ready = false;

			// Navigation exceptions
			if(url.match(/^\/janitor/)) {

				location.href = url;

			}
			else {

				// Activate outro
				page.startPageTransition();

				// Receive page response
				this.response = function(response, request_id) {
					u.bug("page response", response);


					// Remove old scene – 
					if(fun(page.cN.scene.destroy)) {
						page.cN.scene.destroy();
					}
					else {
						this.removeChild(page.cN.scene);
					}


					// Map new scene
					page.cN.scene = u.qs(".scene", response);

					// Set body class
					u.sc(document.body, response.body_class);

					// Set page title
					document.title = response.head_title;

					// Update navigation selection and path
					var current_selected_navigation = u.qs("#navigation li.selected, .servicenavigation li.selected", page);
					if(current_selected_navigation) {
						u.rc(current_selected_navigation, "selected");
					}
					var current_path_navigation = u.qs("#navigation li.path", page);
					if(current_path_navigation) {
						u.rc(current_path_navigation, "path");
					}

					var selected_navigation = u.qs("#navigation li.selected, .servicenavigation li.selected", response);
					if(selected_navigation) {
						var matching_navigation = u.qs("." + selected_navigation.className.replace(/selected/, "").replace(/[ ]+/g, " ").trim().split(" ").join("."), page);
						if(matching_navigation) {
							u.ac(matching_navigation, "selected");
						}
					}
					var path_navigation = u.qs("#navigation li.path", response);
					if(path_navigation) {
						var matching_path_navigation = u.qs("." + path_navigation.className.replace(/path/, "").replace(/[ ]+/g, " ").trim().split(" ").join("."), page);
						if(matching_path_navigation) {
							u.ac(matching_path_navigation, "path");
						}
					}

					// append new scene
					u.ae(page.cN, page.cN.scene);
					// Initialize new scene
					u.init(page.cN);
				

					// Scroll to top
					window.scrollTo(0, 0);


					this.response_ready = true;
					page.pageLoadController();

				}
				u.request(this, url);

			}

		}

		// Start page transition by covering page with outro
		page.startPageTransition = function() {

			this.outro = u.ae(page, "div", {"id":"outro"});
			this.outro.ready = false;

			this.outro.bg_1 = u.ae(this.outro, "div", {"class":"bg bg1", "style":"background-image: url("+this.intro.bg_image_3+")"});
			this.outro.bg_2 = u.ae(this.outro, "div", {"class":"bg bg2", "style":"background-image: url("+this.intro.bg_image_4+")"});

			// Outro is in place
			this.outro.bg_2.transitioned = function() {

				page.outro.ready = true;
				page.pageLoadController();

			}

			u.ass(this.outro.bg_1, {
				"transition": "all 0.4s ease",
				"clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",
			});
			u.ass(this.outro.bg_2, {
				"transition": "all 0.4s ease",
				"clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",
			});

		}

		// Reveal new page by shrinking outro into header
		page.endPageTransition = function() {

			// Prepare outro for final animation
			u.ass(this.outro.bg_1, {
				"clipPath": "polygon(100% 0, 0 0, 0 100%, 50% 100%)",
			});
			u.ass(this.outro.bg_2, {
				"clipPath": "polygon(100% 0, 50% 0, 0 100%, 100% 100%)",
			});


			// Outro is done
			this.outro.transitioned = function() {

				// Update intro images
				u.ass(page.intro.bg_1, {
					"background-image": "url("+page.intro.bg_image_3+")"
				});
				u.ass(page.intro.bg_2, {
					"background-image": "url("+page.intro.bg_image_4+")"
				});


				// Remove outro
				this.transitioned = function() {
					page.removeChild(this);
					delete page.outro;
				}
				u.ass(this, {
					"transition": "all 0.3s ease",
					"opacity": 0,
				});


				// Build new scene
				page.cN.scene.ready();


				// find remaining unhandled links (after scene has been initialized)
				var i, scene_link, scene_links = u.qsa("a[href]", page.cN.scene);
				for(i = 0; i < scene_links.length; i++) {
					scene_link = scene_links[i];
					u.ce(scene_link, {"type":"link"});
				}


				// Find next outro images and preload them
				var random_images = page.getRandomBackgrounds(2);
				page.intro.bg_image_3 = random_images[0];
				page.intro.bg_image_4 = random_images[1];

				u.preloader(page.intro, [
					page.intro.bg_image_3,
					page.intro.bg_image_4,
				]);

			}

			// Start shrinking animation
			u.ass(this.outro, {
				"transition": "all 0.6s ease 0.48s",
				"height": "250px",
			});
			u.ass(this.outro.bg_1, {
				"transition": "all 0.6s ease 0.3s",
				"width": "57.2%",
				"clipPath": "polygon(75% 0, 0 0, 0 100%, 100% 100%)",
			});
			u.ass(this.outro.bg_2, {
				"transition": "all 0.6s ease 0.3s",
				"width": "57.2%",
				"clipPath": "polygon(100% 0, 0 0, 25% 100%, 100% 100%)",
			});

		}

		// show accept cookies dialogue
		page.acceptCookies = function() {
			// u.bug("acceptCookies", u.terms_version);

			// show terms notification
			if(u.terms_version && !u.getCookie(u.terms_version)) {

				var terms_link = u.qs("li.terms a");
				if(terms_link && terms_link.href) {

					var terms = u.ie(document.body, "div", {"id":"terms_notification"});
					u.ae(terms, "h3", {"html":u.stringOr(u.txt["terms-headline"], "We love <br />cookies and privacy")});
					var bn_accept = u.ae(terms, "a", {"class":"accept", "html":u.stringOr(u.txt["terms-accept"], "Accept")});
					bn_accept.terms = terms;
					u.ce(bn_accept);
					bn_accept.clicked = function() {
						this.terms.parentNode.removeChild(this.terms);
						u.saveCookie(u.terms_version, true, {"path":"/", "expires":false});
					}

					var bn_details = u.ae(terms, "a", {"class":"details", "html":u.stringOr(u.txt["terms-details"], "Details"), "href":terms_link.href});
					u.ce(bn_details, {"type":"link"});

					// show terms/cookie approval
					u.a.transition(terms, "all 0.5s ease-in");
					u.ass(terms, {
						"opacity": 1
					});

				}

			}

		}


		// initialize header elements
		page.initHeader = function() {

			// LOGO
			// add logo to navigation
			page.logo = u.ae(page.hN, "a", {"class":"logo", "html":"think.dk"});
			page.logo.url = '/';
			page.logo.font_size = parseInt(u.gcs(page.logo, "font-size"));
			page.logo.font_size_gap = page.logo.font_size-14;
			page.logo.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));


			// create rule for logo
			page.style_tag.sheet.insertRule("#header a.logo {}", 0);
			page.logo.css_rule = page.style_tag.sheet.cssRules[0];

		}

		// initialize navigation elements
		page.initNavigation = function() {

			var i, node, nodes;

			page.nN.list = u.qs("ul", page.nN);
			if(page.nN.list) {
				page.nN.list.nodes = u.qsa("li", page.nN.list);

				if(page.nN.list.nodes.length > 1) {
					// set reducing scope
					page.nN.font_size = parseInt(u.gcs(page.nN.list.nodes[1], "font-size"));
					page.nN.font_size_gap = page.nN.font_size-14;
					page.nN.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
					page.nN.top_offset_gap = page.nN.top_offset-10;

					// create rule for Navigation
					page.style_tag.sheet.insertRule("#navigation {}", 0);
					page.nN.css_rule = page.style_tag.sheet.cssRules[0];

					// create rule for Navigation nodes
					page.style_tag.sheet.insertRule("#navigation ul li {}", 0);
					page.nN.list.css_rule = page.style_tag.sheet.cssRules[0];
		//			u.bug("cssText:" + page.nN.css_rule.cssText + ", " + u.nodeId(page.nN));
				}
			}

			// remove accessibility #navigation anchor from header servicenavigation
			if(page.hN.service) {
				var nav_anchor = u.qs("li.navigation", page.hN.service);
				if(nav_anchor) {
					page.hN.service.removeChild(nav_anchor);
				}
			}

			// insert footer servicenavigation into header servicenavigation
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ie(page.hN.service, node);
				}
				page.fN.removeChild(page.fN.service);
			}

			// enable navigation link animation where relevant
			nodes = u.qsa("#navigation li,a.logo,.servicenavigation li", page);
			for(i = 0; node = nodes[i]; i++) {

				if(!u.hc(node, "logoff")) {
					u.ce(node, {"type":"link"});
				}

				// add over and out animation
				u.e.hover(node);
				node.over = function() {
					u.a.transition(this, "none");

					this.transitioned = function() {

						this.transitioned = function() {
							this.transitioned = function() {
								u.a.transition(this, "none");
							}

							u.a.transition(this, "all 0.1s ease-in-out");
							u.a.scale(this, 1.2);
						}

						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}

					if(this._scale != 1.22) {
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.22);
					}
					else {
						this.transitioned();
					}
				}

				node.out = function() {
					u.a.transition(this, "none");

					this.transitioned = function() {

						this.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(this, "all 0.2s ease-in-out");
						u.a.scale(this, 1);
					}


					// if(this._scale != 0.8) {
					// 	u.a.transition(this, "all 0.1s ease-in");
					// 	u.a.scale(this, 0.8);
					// }
					// else {
						this.transitioned();
					// }
				}

			}

		}

		// initialize footer elements
		page.initFooter = function() {}


		// Show page elements (header servicenavigation, logo, navigation, footer)
		page.revealPage = function() {
			// u.bug("page.revealPage");

			if(page.hN.service) {
				u.a.transition(page.hN.service, "all 0.3s ease-in");
				u.ass(page.hN.service, {
					"opacity":1
				});
			}

			u.a.transition(page.logo, "all 0.3s ease-in");
			u.ass(page.logo, {
				"opacity":1
			});

			u.a.transition(page.nN, "all 0.3s ease-in");
			u.ass(page.nN, {
				"opacity":1
			});

			u.a.transition(page.fN, "all 0.3s ease-in");
			u.ass(page.fN, {
				"opacity":1
			});

			// accept cookies?
			this.acceptCookies();

		}

		// ready to start page preload process
		page.ready();

	}
}

u.e.addDOMReadyEvent(u.init);
