Util.Objects["print"] = new function() {
	this.init = function(scene) {
		// u.bug("scene init:", this);
		

		scene.resized = function() {
			// u.bug("scene.resized:", this);

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
			// u.bug("scrolled:", this);
		}

		scene.ready = function() {
			u.bug("scene.ready:", this);

			this.ul_events = u.qs("ul.events", this);
			this.li_events = u.qsa("li", this.ul_events);

			this.div_columns = u.qs("div.events.columns", this);


			var current_ul_index = 0;
			var current_ul_events = u.ae(this.div_columns, "ul", {"class":"events i"+(current_ul_index++%2)});
			var descriptions = [];
			var reference_lis = [];

			var i, li, p, column_height = 0;
			for(i = 0; i < this.li_events.length; i++) {
				li = this.li_events[i];

				li = u.ae(current_ul_events, li.cloneNode(true));

				p = u.qs("p", li);
				u.bug(descriptions.indexOf(p.innerHTML));
				if(descriptions.indexOf(p.innerHTML) === -1) {
					descriptions.push(p.innerHTML);

					li.date = u.qs("dd.starting_at", li).innerHTML.split(" - ")[0]; 
					reference_lis.push(li);
				}
				else {
					p.innerHTML = "See description for the event on " + reference_lis[descriptions.indexOf(p.innerHTML)].date;
				}



				column_height += li.offsetHeight;

				if(column_height > 900) {

					if(!(current_ul_index%2)) {
						u.ae(this.div_columns, "hr");
					}
					current_ul_events = u.ae(this.div_columns, "ul", {"class":"events i"+(current_ul_index++%2)});

					li = u.ae(current_ul_events, li);
					column_height = li.offsetHeight;

				}

				
			}


			page.cN.scene = this;


			u.showScene(this);


			page.resized();

		}
		
		scene.ready();
	}
}