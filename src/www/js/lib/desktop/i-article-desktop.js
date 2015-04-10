Util.Objects["article"] = new function() {
	this.init = function(scene) {

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


			var article = u.qs("div.article", this);

			if(article) {
				// look for a hardlink for this article
				var hardlink = u.qs("dd.hardlink", article);
				article.hardlink = hardlink ? hardlink.innerHTML : false;

				// INIT SHARING
				if(article.hardlink) {

					u.injectSharing(article);

				}

			}



			page.cN.scene = this;
			page.resized();
		}


		// scene is ready
		scene.ready();

	}
}
