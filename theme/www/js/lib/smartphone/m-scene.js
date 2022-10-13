Util.Modules["scene"] = new function() {
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

			u.showScene(this);

		}

		// Destroy active scene modules
		scene.destroy = function() {

			var i;

			var list, article_lists = u.qsa(".articlePreviewList");
			if(article_lists) {
				for(i = 0; i < article_lists.length; i++) {
					list = article_lists[i];

					list.destroy();

				}
			}

			var pagination, paginations = u.qsa(".pagination");
			if(paginations) {
				for(i = 0; i < paginations.length; i++) {
					pagination = paginations[i];

					if(fun(pagination.destroy)) {
						pagination.destroy();
					}

				}
			}

			page.cN.removeChild(this);

		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}
