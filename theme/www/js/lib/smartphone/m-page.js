Util.Modules["page"] = new function() {
	this.init = function(page) {
		// u.bug("init page");

		// show parentnode comment in console
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		u.bug("Visit https://parentnode.dk for more information");
		u.bug_force = false;


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs(".servicenavigation", page.hN);
		u.e.drag(page.hN, page.hN);


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.nN.nav = u.qs("ul.navigation", page.nN)


		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs(".servicenavigation", page.fN);


		// global resize handler
		page.resized = function() {
			// u.bug("page resized");

			this.browser_h = u.browserH();
			this.browser_w = u.browserW();


			// adjust content height
			this.available_height = this.browser_h - this.hN.offsetHeight - this.fN.offsetHeight;
			// Reset to auto height to be able to calculate real height
			u.as(this.cN, "min-height", "auto", false);
			if(this.available_height >= this.cN.offsetHeight) {
				u.as(this.cN, "min-height", this.available_height+"px", false);
			}


			// forward resize event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.resized) == "function") {
				this.cN.scene.resized(event);
			}

			// refresh DOM
			this.offsetHeight;

			if(this.bn_nav) {

				// Update navigation if open
				if (this.bn_nav.is_open) {
					// Update heights
					u.ass(page.hN, {
						"height":window.innerHeight + "px"
					});

					u.ass(page.nN, {
						"height":(window.innerHeight - page.hN.service.offsetHeight) + "px"
					});

					// Update drag coordinates
					u.e.setDragPosition(page.nN.nav, 0, 0);
					u.e.setDragBoundaries(page.nN.nav, page.nN);
				}
			}

		}

		// iOS scroll fix
		page.fixiOSScroll = function() {

			u.ass(this.hN, {
				"position":"absolute",
			});


			u.ass(this.hN, {
				"position":"fixed",
			});

		}

		// global scroll handler
		page.scrolled = function() {

			// Fix issue with fixed element after scroll
			u.t.resetTimer(this.t_fix);
			this.t_fix = u.t.setTimer(this, "fixiOSScroll", 200);


			this.scrolled_y = u.scrollY();

			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled();
			}

		}

		// global orientationchange handler
		page.orientationchanged = function() {

			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.orientationchanged) == "function") {
				this.cN.scene.orientationchanged();
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

			var random_images = this.getRandomBackgrounds(1);
			this.intro.bg_image_1 = random_images[0];
			// this.intro.bg_image_2 = random_images[1];
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
					var random_images = page.getRandomBackgrounds(1);
					page.intro.bg_image_2 = random_images[0];
					// page.intro.bg_image_4 = random_images[1];

					u.preloader(page.intro, [
						page.intro.bg_image_2,
						// page.intro.bg_image_4,
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
				// this.intro.bg_image_2,
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
			u.ass(this.intro, {
				"background-image":"url("+this.intro.bg_image_1+")",
			});
			// u.ass(this.intro.bg_1, {
			// 	"background-image":"url("+this.intro.bg_image_1+")",
			// });
			// u.ass(this.intro.bg_2, {
			// 	"background-image":"url("+this.intro.bg_image_2+")",
			// });


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
				"clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",
				

				// 4: complex
				// "clipPath": "polygon(100% 0, 75% 50%, 100% 0, 75% 50%, 75% 50%, 50% 100%, 75% 50%, 50% 100%)",
			});

			u.ass(this.intro.bg_1, {
				"transition": "all 0.5s ease 0.5s",
				// 1: standard
				// "clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",

				// 2: reverse
				"clipPath": "polygon(0% 0, 0% 0, -50% 100%, -50% 100%)",
				

				// 4: complex
				// "clipPath": "polygon(100% 0, 0 0, -20% 0, 0 50%, 0 50%, -80% 100%, 0 100%, 50% 100%)",
			});

			u.ass(this.intro.bg_2, {
				// 1: standard
				// "clipPath": "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)",

				// 2: reverse
				"clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",
				// "clipPath": "polygon(100% 0, 0 0, 0 100%, 50% 100%)",

				// 4: complex
				// "clipPath": "polygon(50% 0, 25% 50%, 50% 0, 25% 50%, 25% 50%, 0 100%, 25% 50%, 0 100%)",
			});

			u.ass(this.intro.bg_2, {
				"transition": "all 0.5s ease 0.5s",
				// 1: standard
				// "clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",

				// 2: reverse
				"clipPath": "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)",
				// "clipPath": "polygon(75% 0, 0 0, 0 100%, 100% 100%)",

				// 4: complex
				// "clipPath": "polygon(50% 0, 100% 0, 120% 0, 100% 50%, 100% 50%, 120% 100%, 100% 100%, 0 100%)",
			});

		}



		// Shrink intro into header
		page.finishIntro = function() {

			// Prepare intro for final animation
			// u.ass(this.intro.bg_1, {
			// 	"clipPath": "polygon(100% 0, 0 0, 0 100%, 50% 100%)",
			// });
			// u.ass(this.intro.bg_2, {
			// 	"clipPath": "polygon(100% 0, 50% 0, 0 100%, 100% 100%)",
			// });

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
				"height": "80px",
			});
			// u.ass(this.intro.bg_1, {
			// 	"transition": "all 0.6s ease",
			// 	"width": "57.2%",
			// 	"clipPath": "polygon(75% 0, 0 0, 0 100%, 100% 100%)",
			// });
			// u.ass(this.intro.bg_2, {
			// 	"transition": "all 0.6s ease",
			// 	"width": "57.2%",
			// 	"clipPath": "polygon(100% 0, 0 0, 25% 100%, 100% 100%)",
			// });

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
				// set orientation change handler
				u.e.addWindowEvent(this, "orientationchange", this.orientationchanged);


				if(fun(u.notifier)) {
					u.notifier(this);
				}
				if(u.getCookie("smartphoneSwitch") == "on") {
					var bn_switch = u.ae(document.body, "div", {id:"desktop_switch", html:"Back to desktop"});
					u.ce(bn_switch);
					bn_switch.clicked = function() {
						u.saveCookie("smartphoneSwitch", "off");
						location.href = location.href.replace(/[&]segment\=smartphone|segment\=smartphone[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=desktop";
					}
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

				// // Start showing the page
				// if(!fun(this.cN.scene.revealPage)) {
				// 	this.revealPage();
				// }
				//
				// this.cN.scene.ready();

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
			// u.bug("navigate", url, raw_url);

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

			// this.outro.bg_1 = u.ae(this.outro, "div", {"class":"bg bg1", "style":"background-image: url("+this.intro.bg_image_3+")"});
			// this.outro.bg_2 = u.ae(this.outro, "div", {"class":"bg bg2", "style":"background-image: url("+this.intro.bg_image_4+")"});

			this.outro.bg_1 = u.ae(this.outro, "div", {"class":"bg bg1"});
			this.outro.bg_2 = u.ae(this.outro, "div", {"class":"bg bg2"});

			u.ass(this.outro, {
				"clipPath": "polygon(100% 0, 100% 0, 50% 100%, 50% 100%)",
				"background-image":"url("+this.intro.bg_image_2+")",
			});

			// Outro is in place
			this.outro.transitioned = function() {

				if(page.bn_nav.is_open) {
					page.bn_nav.clicked();
				}
				this.ready = true;
				page.pageLoadController();

			}
			u.ass(this.outro, {
				"transition": "all 0.4s ease",
				"clipPath": "polygon(0 0, 150% 0, 100% 100%, -50% 100%)",
			});


			// u.ass(this.outro.bg_1, {
			// 	"transition": "all 0.4s ease",
			// 	"clipPath": "polygon(0 0, 100% 0, 50% 100%, -50% 100%)",
			// });
			// u.ass(this.outro.bg_2, {
			// 	"transition": "all 0.4s ease",
			// 	"clipPath": "polygon(50% 0, 150% 0, 100% 100%, 0 100%)",
			// });

		}

		// Reveal new page by shrinking outro into header
		page.endPageTransition = function() {

			// Prepare outro for final animation
			// u.ass(this.outro.bg_1, {
			// 	"clipPath": "polygon(100% 0, 0 0, 0 100%, 50% 100%)",
			// });
			// u.ass(this.outro.bg_2, {
			// 	"clipPath": "polygon(100% 0, 50% 0, 0 100%, 100% 100%)",
			// });


			// Outro is done
			this.outro.transitioned = function() {

				// Update intro images
				u.ass(page.intro, {
					"background-image": "url("+page.intro.bg_image_2+")"
				});

				// u.ass(page.intro.bg_1, {
				// 	"background-image": "url("+page.intro.bg_image_3+")"
				// });
				// u.ass(page.intro.bg_2, {
				// 	"background-image": "url("+page.intro.bg_image_4+")"
				// });


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
				var random_images = page.getRandomBackgrounds(1);
				page.intro.bg_image_2 = random_images[0];
				// page.intro.bg_image_4 = random_images[1];

				u.preloader(page.intro, [
					page.intro.bg_image_2,
					// page.intro.bg_image_4,
				]);

			}

			// Start shrinking animation
			u.ass(this.outro, {
				"transition": "all 0.6s ease 0.48s",
				"height": "80px",
			});
			// u.ass(this.outro.bg_1, {
			// 	"transition": "all 0.6s ease 0.3s",
			// 	"width": "57.2%",
			// 	"clipPath": "polygon(75% 0, 0 0, 0 100%, 100% 100%)",
			// });
			// u.ass(this.outro.bg_2, {
			// 	"transition": "all 0.6s ease 0.3s",
			// 	"width": "57.2%",
			// 	"clipPath": "polygon(100% 0, 0 0, 25% 100%, 100% 100%)",
			// });

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

			// add logo to navigation
			this.logo = u.ie(this.hN, "a", {"class":"logo", "html":"think.dk", "href": "/"});

		}

		// initialize navigation elements
		page.initNavigation = function() {


			this.nN.list = u.qs("ul.navigation", this.nN);


			// create burger menu
			this.bn_nav = u.qs(".servicenavigation li.navigation", this.hN);
			if(this.bn_nav) {
				u.ae(this.bn_nav, "div");
				u.ae(this.bn_nav, "div");
				u.ae(this.bn_nav, "div");

				// enable nav link
				u.ce(this.bn_nav);
				this.bn_nav.clicked = function(event) {

					// close navigation
					if(this.is_open) {
						// Update open state
						this.is_open = false;
						u.rc(this, "open");

						var i, node;
						// set hide animation for nav nodes
						for(i = 0; node = page.nN.nodes[i]; i++) {

							u.a.transition(node, "all 0.15s ease-in "+(i*50)+"ms");
							u.ass(node, {
								"opacity": 0,
								"transform":"translate(30px, 0)"
							});
						}

						// hide navigation when hidden
						page.hN.transitioned = function() {
							u.ass(page.nN, {
								"display": "none"
							});
						}

						// collapse header
						u.a.transition(page.hN, "all 0.3s ease-in "+(page.nN.nodes.length*50)+"ms");
						u.ass(page.hN, {
							"height": "80px"
						});

						// Disable nav scroll 
						u.ass(page.nN, {
							"overflow-y":"hidden"
						});

						// Enable body scroll
						u.ass(page.parentNode, {
							"overflow-y":"scroll"
						});

					}
					// open navigation
					else {
						// Update open state
						this.is_open = true;
						u.ac(this, "open");

						// Clear hN transitioned, in order to prevent bugs
						delete page.hN.transitioned;

						var i, node;
						// set initial animation state for nav nodes
						for(i = 0; node = page.nN.nodes[i]; i++) {
							u.ass(node, {
								"opacity": 0,
								"transform":"translate(90px, 0)"
							});
						}

						// set animation for header
						u.a.transition(page.hN, "all 0.3s ease-in");

						// Set height of hN
						u.ass(page.hN, {
							"height": window.innerHeight+"px",
						});

						// Set height on navigation
						u.ass(page.nN, {
							"height":(window.innerHeight - page.hN.service.offsetHeight) + "px"
						});

						u.ass(page.nN, {
							"display": "block"
						});

						// set animation for nav nodes
						for(i = 0; node = page.nN.nodes[i]; i++) {

							u.a.transition(node, "all 0.2s ease-in-out "+(50 + (i*50))+"ms");
							u.ass(node, {
								"opacity": 1,
								"transform":"translate(0, 0)"
							});
						}
						
						// Enable nav scroll 
						u.ass(page.nN, {
							"overflow-y":"scroll"
						});

						// Disable body scroll
						u.ass(page.parentNode, {
							"overflow-y":"hidden"
						});
					}

					// Update drag coordinates
					u.e.setDragPosition(page.nN.nav, 0, 0);
					u.e.setDragBoundaries(page.nN.nav, page.nN);

				}
				// enable dragging on navigation
				u.e.drag(this.nN.nav, this.nN, {"strict":false, "elastica":200, "vertical_lock":true, "overflow":"scroll"});
			}


			var i, node;

			// append footer servicenavigation to header servicenavigation
			if(this.fN.service) {
				nodes = u.qsa("li", this.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(this.nN.list, node);
				}
				this.fN.removeChild(this.fN.service);
			}

			// append header servicenavigation to header servicenavigation
			if(this.hN.service) {
				nodes = u.qsa("li:not(.navigation)", this.hN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(this.nN.list, node);
				}
			}

			var i, node, nodes;
			// enable animation on submenus and logo
			nodes = u.qsa("#navigation li,a.logo", this.hN);
			for(i = 0; node = nodes[i]; i++) {

				// build first living proof model of CEL clickableElementLink
				u.ce(node, {"type":"link"});

				// add over and out animation
				u.e.hover(node);
				node.over = function() {

					this.transitioned = function() {

						this.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}

					u.a.transition(this, "all 0.1s ease-in-out");
					u.a.scale(this, 1.22);
				}
				node.out = function() {

					this.transitioned = function() {

						this.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1);
					}

					u.a.transition(this, "all 0.1s ease-in-out");
					u.a.scale(this, 0.9);
				}

			}

			// get clean set of navigation nodes (for animation on open and close)
			this.nN.nodes = u.qsa("li", this.nN.list);

			if(this.hN.service) {
				u.ass(this.hN.service, {
					"opacity":1
				});
			}

		}

		// initialize footer elements
		page.initFooter = function() {}


		// Show page elements (header, navigation, footer)
		page.revealPage = function() {
			// u.bug("page.revealPage");

			u.a.transition(this.hN, "all 0.3s ease-in");
			u.ass(this.hN, {
				"opacity":1
			});

			u.a.transition(this.nN, "all 0.3s ease-in");
			u.ass(this.nN, {
				"opacity":1
			});

			u.a.transition(this.fN, "all 0.3s ease-in");
			u.ass(this.fN, {
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
