Util.Objects["frios"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		scene.resized = function() {
			// u.bug("scene.resized:", this);
			console.log(this.ul_images, this.images);

			if(this.ul_images) {
				console.log("height:", this.ul_images.offsetWidth);
				u.ass(this.ul_images, {
					"height":Math.floor(this.ul_images.offsetWidth / 1.32) +"px"
				});
			}

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			u.columns(this, [
				{"c200": [
					"div.article", 
				]},
				{"c100": [
					"div.people",
				]},
			]);


			var load_queue = [];
			var i, image, person;

			this.ul_images = u.qs("ul.images", this);
			if(this.ul_images) {
				this.images = u.qsa("li div.image", this.ul_images);
				console.log(this.images)
				for(i = 0; i < this.images.length; i++) {
					image = this.images[i];
					image.item_id = u.cv(image, "item_id");
					image.variant = u.cv(image, "variant");
					image.format = u.cv(image, "format");

					load_queue.push("/images/" + image.item_id + "/" + image.variant + "/540x." + image.format);
				}

			}

			console.log(load_queue);

			this.ul_people = u.qs("ul.people", this);
			if(this.ul_people) {
				this.people = u.qsa("li.person", this.ul_people);
				for(i = 0; i < this.people.length; i++) {
					person = this.people[i];
					person.image_src = person.getAttribute("data-image-src");

					load_queue.push(person.image_src);
				}
			}


			this.form_signup = u.qs("form.signup", this);
			if(this.form_signup) {
				u.f.init(this.form_signup);
			}


			this.loaded = function(queue) {

				var i, person;

				if(this.ul_people) {
					this.people = u.qsa("li.person", this.ul_people);

					for(i = 0; i < this.people.length; i++) {
						person = this.people[i];
						u.ie(person, "img", {src: person.image_src});
					}

				}

				console.log(this.ul_images, this.images);

				if(this.ul_images) {
					this.slideshow = u.slideshow(this.ul_images);
					this.slideshow.scene = this;
					this.resized();

					// Slides are preloaded
					this.slideshow.preloaded = function() {
						// select current node (first slide if none specified)
						if(!this.selected_node) {
							this.selectNode(0);
						}

					}
					
					this.slideshow.prepare();
					u.addNextArrow(this.slideshow.bn_next);
					u.addPreviousArrow(this.slideshow.bn_prev);
					
				}


				u.showScene(this);

			}


			u.preloader(this, load_queue);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
