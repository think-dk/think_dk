Util.Objects["events"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:", this);
		

		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
//			u.bug("scrolled:", this);;
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);



			u.showScene(this);


		}

		// Map scene – page will call scene.ready
		page.cN.scene = scene;

	}
}