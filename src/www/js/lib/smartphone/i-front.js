Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			// Position all content relatively to this._h1
			// u.a.translate(this._h1, (page.cN.offsetWidth/2)-(this._h1.offsetWidth/2), (page.cN.offsetHeight/2)-(this._h1.offsetHeight))
			// u.a.translate(this._forgotten, this._h1._x + this._h1.offsetWidth/2, this._h1._y+this._h1.offsetHeight);
			// u.a.translate(this._safety, this._h1._x - this._h1.offsetWidth/1.5, this._h1._y-this._safety.offsetHeight);
			// u.a.translate(this._long, this._safety._x + this._safety.offsetWidth, this._h1._y-this._long.offsetHeight/2);
			// u.a.translate(this._bills, this._safety._x + this._safety.offsetWidth, this._long._y-this._bills.offsetHeight);
			// u.a.translate(this._everything, this._h1._x - this._everything.offsetWidth, this._h1._y + this._everything.offsetHeight/3);
			// u.a.translate(this._slaves, this._forgotten._x - this._slaves.offsetWidth, this._forgotten._y);
			// u.a.translate(this._ability, this._h1._x + this._h1.offsetWidth, this._long._y + this._long.offsetHeight);
			// u.a.translate(this._tyrant, this._slaves._x + this._slaves.offsetWidth/3, this._forgotten._y + this._now.offsetHeight);
			// u.a.translate(this._means, this._h1._x - this._means.offsetWidth, this._slaves._y-this._slaves.offsetHeight);
			// u.a.translate(this._luxery, this._tyrant._x - this._tyrant.offsetWidth/2, this._tyrant._y+this._tyrant.offsetHeight);
			// u.a.translate(this._wake, this._bills._x - this._bills.offsetWidth/2, this._safety._y-this._wake.offsetHeight);
			// u.a.translate(this._goal, this._bills._x + this._bills.offsetWidth, this._bills._y);
			// u.a.translate(this._think, this._h1._x + this._h1.offsetWidth/2, this._luxery._y+this._luxery.offsetHeight);
			// u.a.translate(this._busy, this._ability._x, this._ability._y+this._ability.offsetHeight);
			// u.a.translate(this._nothing, this._luxery._x + this._luxery.offsetWidth, this._luxery._y);
			// u.a.translate(this._cost, this._forgotten._x + this._forgotten.offsetWidth, this._h1._y+this._h1.offsetHeight);
			// u.a.translate(this._idleness, this._tyrant._x - this._idleness.offsetWidth, this._tyrant._y);
			// u.a.translate(this._except, this._everything._x - this._except.offsetWidth, this._safety._y + this._safety.offsetHeight);
			// u.a.translate(this._content, this._long._x + this._long.offsetWidth, this._ability._y - this._now.offsetHeight);
			// u.a.translate(this._now, this._tyrant._x + this._tyrant.offsetWidth, this._tyrant._y);
			// u.a.translate(this._time, this._now._x + this._now.offsetWidth, this._cost._y + this._cost.offsetHeight);

			// refresh dom
			//this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));



			page.cN.scene = this;
			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
