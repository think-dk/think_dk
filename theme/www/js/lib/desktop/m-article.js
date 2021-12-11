// Stardard article enabling
Util.Modules["article"] = new function() {
	this.init = function(article) {
		u.bug("article init:", article);


		// csrf token for data manipulation
		article.csrf_token = article.getAttribute("data-csrf-token");


		// find primary header
		article.header = u.qs("h1,h2,h3", article);
		article.header.article = article;



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
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "960x." + image._format;
				u.ass(image, {
					"opacity": 0
				});

				image.loaded = function(queue) {

					u.ac(this, "loaded");

					this._image = u.ie(this, "img");
					this._image.image = this;
					this._image.src = queue[0].image.src;

					// correct scroll for image expansion
					if(this.node.article_list) {
						this.node.article_list.correctScroll(this);
					}


					// apply full-width option
					u.ce(this._image);
					this._image.clicked = function() {
						u.ass(document.body, {
							"overflow":"hidden"
						});

						this.image.fullscreen_image = u.ae(page, "div", {"class":"fullscreen"});
						u.ce(this.image.fullscreen_image);
						this.image.fullscreen_image.clicked = function() {
							u.ass(document.body, {
								"overflow":"auto"
							});

							this.transitioned = function() {
								page.removeChild(this);
							}
							u.ass(this, {
								"transition": "all 0.3s ease",
								"top":u.absY(this.image._image) - page.scrolled_y + "px",
								"left":u.absX(this.image._image) + "px",
								"width": this.image._image.offsetWidth + "px",
								"height": this.image._image.offsetHeight + "px"
							});
						}

						this.image.fullscreen_image.image = this.image;
						u.ass(this.image.fullscreen_image, {
							"background-image": "url("+this.src+")",
							"top":u.absY(this) - page.scrolled_y + "px",
							"left":u.absX(this) + "px",
							"width": this.offsetWidth + "px",
							"height": this.offsetHeight + "px"
						});

						u.ass(this.image.fullscreen_image, {
							transition: "all 0.6s ease",
							left: 0,
							top: 0,
							width: page.browser_w + "px",
							height: page.browser_h + "px"
						});


						// fullsize already defined and tested
						if(this.image._fullsize_src) {
							this.image.fullscreen_image.src = this.image._fullsize_src;
						}
						else {
							this.image._fullsize_width = 1600;
							this.image._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this.image._fullsize_width + "x." + this.image._format;

							// valid response - set new src
							this.image.fullscreen_image.response = function() {
								u.ass(this, {
									"background-image": "url("+this.image._fullsize_src+")",
								});
							}
							// 404 - reduce size and try again
							this.image.fullscreen_image.responseError = function() {
								u.bug("error")
								this.image._fullsize_width = this.image._fullsize_width-100;
								this.image._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
								u.request(this.image.fullscreen_image, this._fullsize_src);
							}
							u.request(this.image.fullscreen_image, this.image._fullsize_src);
						}

					}

					u.a.transition(this, "all 0.5s ease-in-out");
					u.ass(this, {
						"opacity": 1
					});
				}
				u.preloader(image, [image._image_src]);
			}
		}


		// INIT VIDEOS
		var video;
		article._videos = u.qsa("div.youtube, div.vimeo", article);
		for (i = 0; video = article._videos[i]; i++) {

			video._src = u.cv(video, "video_id");
			video._type = video._src.match(/youtube|youtu\.be/) ? "youtube" : "vimeo";

			// Youtube
			if (video._type == "youtube") {
				video._id = video._src.match(/watch\?v\=/) ? video._src.split("?v=")[1] : video._src.split("/")[video._src.split("/").length-1];

				video.iframe = u.ae(video, "iframe", {
					id: "ytplayer",
					type: "text/html",
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					allow: "autoplay",
					sandbox:"allow-same-origin allow-scripts",
					// width: "100%",
					// height: 540 / 1.7777,
					src: 'https://www.youtube.com/embed/'+video._id+'?autoplay=false&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1',
				});
			}

			// Vimeo
			else {
				video._id = video._src.split("/")[video._src.split("/").length-1];

				video.iframe = u.ae(video, "iframe", {
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					sandbox:"allow-same-origin allow-scripts",
					// width: "100%",
					// height: 540 / 1.7777,
					src: 'https://player.vimeo.com/video/'+video._id+'?autoplay=false&loop=0&byline=0&portrait=0',
				});
			}

		}


		// INIT GEOLOCATION MAP
		article.geolocation = u.qs("ul.geo", article);
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {

			u.injectGeolocation(article);

		}


		// INIT SHARING
		var hardlink = u.qs("li.main_entity.share", article);
		article.hardlink = hardlink ? (hardlink.hasAttribute("content") ? hardlink.getAttribute("content") : hardlink.innerHTML) : false;
		if(article.hardlink && typeof(u.injectSharing) == "function") {

			// Correct scroll offset - callback
			article.shareInjected = function() {
				if(this.article_list) {
					this.article_list.correctScroll(this, this.sharing);
				}
			}
			u.injectSharing(article);

		}

		// READ-STATE
		article.header.current_readstate = article.getAttribute("data-readstate");
		article.add_readstate_url = article.getAttribute("data-readstate-add");
		article.delete_readstate_url = article.getAttribute("data-readstate-delete");
		if(article.header.current_readstate || (article.add_readstate_url && article.delete_readstate_url)) {
			//			u.bug("add readstate:" + article.header.current_readstate);

			// add checkmark
			u.addCheckmark(article.header);

			u.ce(article.header.checkmark);
			article.header.checkmark.clicked = function(event) {

				// hide hint
				this.out(event);

				// already has readstate - delete it
				if(this.node.current_readstate) {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {

							// remove read info
							this.setAttribute("class", "checkmark not_read");
							this.node.current_readstate = false;
							this.node.article.setAttribute("data-readstate", "");
							this.hint_txt = u.txt["readstate-not_read"];

						}
					}
					u.request(this, this.node.article.delete_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token+"&item_id"});
				}
				// add readstate
				else {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {

							// add read info
							this.setAttribute("class", "checkmark read");
							this.node.current_readstate = new Date();
							this.node.article.setAttribute("data-readstate", this.node.current_readstate);
							this.hint_txt = u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", this.node.current_readstate);

						}
					}
					u.request(this, this.node.article.add_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token});
				}

			}

		}

	}
}
