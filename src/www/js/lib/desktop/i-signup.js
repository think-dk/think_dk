Util.Objects["signup"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));


			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			page.cN.scene = this;

			this._form = u.qs("form.signup", this);

			var description = u.qs("div.articlebody", this);
			if(u.text(description).match(/\{form\.signup\}/)) {
				for(i = 0; node = description.childNodes[i]; i++) {
					if(u.text(node).match(/\{form\.signup\}/)) {
						description.replaceChild(this._form, node);
					}
				}
			}


			u.f.init(this._form);
//			this._form.fields["email"].focus();


			u.showScene(this);



			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
