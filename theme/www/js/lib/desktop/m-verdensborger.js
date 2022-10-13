Util.Modules["verdensborger"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", scene);

		u.txt["login_to_comment"] = '<a href="/login">Log ind</a> eller <a href="/support">opret en konto</a> for at tilføje kommentarer.';

		u.txt["share"] = "Del denne side";
		u.txt["share-info-headline"] = "(Hvordan deler jer?)";
		u.txt["share-info-txt"] = "Vi har med vilje ikke inkluderet social media plugins, fordi disse ofte misbruges til at indsamle data om dig. Vi ønsker heller ikke at promovere nogle kanaler over andre. I stedet kan du blot kopiere det viste link og selv dele det, dér hvor du finder det relevant.";
		u.txt["share-info-ok"] = "OK";

		u.txt["add_comment"] = "Tilføj kommentar";
		u.txt["comment"] = "Kommentar";

		u.txt["cancel"] = "Fortryd";



		scene.resized = function() {
			// u.bug("scene.resized:", this);
			// console.log(this.ul_images, this.images);

			// if(this.ul_images) {
			// 	// console.log("height:", this.ul_images.offsetWidth);
			// 	u.ass(this.ul_images, {
			// 		"height":Math.floor(this.ul_images.offsetWidth / 1.32) +"px"
			// 	});
			// }
			//
			// if(this.c_1) {
			//
			// 	u.ass(this.help_us, {
			// 		"padding-top": "0px"
			// 	});
			//
			//
			// 	if(this.c_1.offsetHeight < this.c_2.offsetHeight) {
			// 		u.ass(this.help_us, {
			// 			"padding-top": (this.c_2.offsetHeight - this.c_1.offsetHeight) + "px"
			// 		});
			// 	}
			//
			// }

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			u.txt["login_to_comment"] = '<a href="/login">Log ind</a> eller <a href="/support">Opret en konto</a> for at tilføje kommentarer.';


			u.columns(this, [
				{"c300":[
					{"c200": [
						"div.article", 
					]},
					{"c100": [
						"div.konfirmation",
						"div.dictionary",
						"div.info_meeting",
						"div.practicalities",
						"div.signup",
						"div.more_info",

						"div.help_us",
					]},
				]},
				{"c300": [
					"div.people",
				]}
			]);

			// this.c_1 = u.qs(".c .c100", this);
			// this.c_2 = u.qs(".c .c200", this);
			//
			// console.log(this.c_2);
			//
			// var load_queue = [];
			// var i, image, person;

			// this.ul_images = u.qs("ul.images", this);
			// if(this.ul_images) {
			// 	this.images = u.qsa("li div.image", this.ul_images);
			// 	// console.log(this.images)
			// 	for(i = 0; i < this.images.length; i++) {
			// 		image = this.images[i];
			// 		image.item_id = u.cv(image, "item_id");
			// 		image.variant = u.cv(image, "variant");
			// 		image.format = u.cv(image, "format");
			//
			// 		load_queue.push("/images/" + image.item_id + "/" + image.variant + "/540x." + image.format);
			// 	}
			//
			// }
			//
			// // console.log(load_queue);
			//
			// this.ul_people = u.qs("ul.people", this);
			// if(this.ul_people) {
			// 	this.people = u.qsa("li.person", this.ul_people);
			// 	for(i = 0; i < this.people.length; i++) {
			// 		person = this.people[i];
			// 		person.image_src = person.getAttribute("data-image-src");
			//
			// 		load_queue.push(person.image_src);
			// 	}
			// }


			this.div_signup = u.qs("div.signup", this);

			this.form_signup = u.qs("form.signup", this);
			if(this.form_signup) {
				this.form_signup.div_signup = this.div_signup;
				u.f.init(this.form_signup);

				// Scroll to error if it exists
				var error = u.qs("div.messages .error", this.div_signup);
				if(error) {
					u.scrollTo(window, {"node": this.div_signup, "offset_y":100});
				}

				// this.form_signup.submitted = function() {
				// 	this.response = function(response) {
				// 		var response_form_signup = u.qs("form.signup", response);
				// 		if(response_form_signup) {
				// 			this.div_signup.replaceChild(response_form_signup, this);
				// 		}
				// 		else {
				// 			this.div_signup.replaceChild(u.wc(u.qs(".scene.verdensborger", response), "div", {"class":"receipt"}), this);
				// 		}
				// 	}
				// 	u.request(this, this.action, {"method":"post", "data":this.getData()})
				// }
			}

			this.verdensborger_header = u.ae(page.hN, "div", {"class":"verdensborger_header", "html":"Verdensborger"});

			u.ass(page.intro, {
				"transition": "all 0.5s ease-in-out",
				"opacity": 0
			});


			u.showScene(this);

		}


		scene.destroy = function() {
			// u.bug("destroy");

			u.ass(page.intro, {
				"opacity": 1
			});

			page.hN.removeChild(this.verdensborger_header);
			page.cN.removeChild(this);

		}


		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
