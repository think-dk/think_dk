Util.Modules["blogs"] = new function() {
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


			var list = u.qs("ul.blogs");
			if(list) {
				
				list.articles = u.qsa("li.article", list);

				// Init article preview
				list.initArticle = function(article) {
					// u.bug("initArticle", article);

					// FIND LINK
					article._a = u.qs("h3 a", article);
					if(article._a) {
						article._link = article._a.href ? article._a.href : article._a.url;
					}

					// READ MORE
					article._description_p = u.qs("div.description p", article)
					if(article._description_p && article._link) {
						u.ae(article._description_p, "br");
						u.ae(article._description_p, "a", {href: article._link, class:"readmore", html:u.txt("readmore")});
					}

					// INIT IMAGES
					var i, image;
					article._images = u.qsa("div.image,div.media", article);
					for(i = 0; image = article._images[i]; i++) {

						image.node = article;

						// remove link from caption
						image.caption = u.qs("p a", image);
						if(image.caption) {
							image.caption.removeAttribute("href");
						}

						// get image variables
						image._id = u.cv(image, "item_id");
						image._format = u.cv(image, "format");
						image._variant = u.cv(image, "variant");


						// if image
						if(image._id && image._format) {

							// add image
							image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
							u.ass(image, {
								"opacity": 0
							});

							image.loaded = function(queue) {

								u.ac(this, "loaded");

								this._image = u.ie(this, "img");
								this._image.image = this;
								this._image.src = queue[0].image.src;

								u.a.transition(this, "all 0.5s ease-in-out");
								u.ass(this, {
									"opacity": 1
								});
							}
							u.preloader(image, [image._image_src]);
						}
					}

				}


				// Calculate browser sizes on resize
				list.resized = function() {

					this.browser_h = u.browserH();
					this.screen_middle = this.browser_h/2;

				}

				// scroll handler
				// loads next/prev and initializes focused articles
				list.scrolled = function(event) {
					// u.bug("list scrolled: " + u.scrollY(), event);

					// reset article load-timer
					u.t.resetTimer(this.t_init);

					// get values for calculations
					this.scroll_y = u.scrollY();


					// auto extend list, when appropriate
					// load next if list-bottom is less than scrolloffset + 2 x browser-height
					if(this._next_url) {

						var i, node, node_y, list_y;
						list_y = u.absY(this);

						if(list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
							this.loadNext();
						}

					}


					// only initialize new articles when scrolling stops with article in focus
					this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);

				}

				// initialize focues article
				list.initFocusedArticles = function() {
					// u.bug("initFocusedArticles");

					var i, node, node_y;
					// loop through all items to find nodes within view
					for(i = 0; node = this.articles[i]; i++) {

						// if node is not already loaded
						if(!node.is_ready) {

							// get y coordinate of item
							node_y = u.absY(node);

							// check first if node is below visible area
							// then we are past point of interest and don't need to waste resources
							if(node_y > this.scroll_y + this.browser_h) {
								break;
							}

							// if node is in visible area
							else if(
								// bottom of node is in view
								// if node-bottom is more than scroll position
								// and node-bottom is less than scroll position + browser height
								(
									node_y + node.offsetHeight > this.scroll_y && 
									node_y + node.offsetHeight < this.scroll_y + this.browser_h
								)
								 || 

								// top of node is in view
								// if node-top is more than scroll position
								// and node-top is less than scroll position + browser height
								(
									node_y > this.scroll_y &&
									node_y < this.scroll_y + this.browser_h
								)
								 ||

								// node is larger than view
								// if node-top is less than scroll position
								// and node-bottom is 
								(
									node_y < this.scroll_y &&
									node_y + node.offsetHeight > this.scroll_y + this.browser_h
								)
							) {

								this.initArticle(node);
								node.is_ready = true;

							}
						}
					}
				}


				// Map article_list to articles
				var i, node;
				for(i = 0; node = list.articles[i]; i++) {

					node.article_list = list;
					u.columns(node, [
						{"c125": [
							"div.image"
						]},
						{"c175": [
							"h3",
							"dl.author",
							"div.description"
						]}
					]);

				}


				// Pre-calculated browser size values
				list.resized();

				// initial load next check
				list.scrolled();

				// set specific resize handler for list
				u.e.addWindowEvent(list, "resize", list.resized);

				// set specific scroll handler for list
				u.e.addWindowEvent(list, "scroll", list.scrolled);

			}

			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}

Util.Modules["blog"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			u.columns(this, [
				{"c-main": [
					"div.article",
					"div.articles",
				]},
				{"c-sidebar": [
					"div.bio", 
				]}
			]);


			u.showScene(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
