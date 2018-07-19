Util.Objects["memberships"] = new function() {
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

			this.div_memberships = u.qs("div.memberships", this);
			var place_holder = u.qs("div.articlebody .placeholder.memberships", this);

			if(this.div_memberships && place_holder) {
				place_holder.parentNode.replaceChild(this.div_memberships, place_holder);
			}


			// build benefits grid
			if(this.div_memberships) {
				this.membership_nodes = u.qsa("li.membership", this.div_memberships);

				// index benefits, to find total stack
				var total_benefits = 0;
				var total_benefits_node;
				var i, node, benefit, j, li, table;
				for(i = 0; node = this.membership_nodes[i]; i++) {
					node.benefits = u.qsa(".description li", node);
					if(node.benefits.length > total_benefits) {
						total_benefits = node.benefits.length;
						total_benefits_node = node;
					}

					u.wc(u.qs("h3", node), "span", {"class":"cell"});
					u.wc(u.qs("h3", node), "span", {"class":"table"});

				}



			}

			// create benefits overlay
			if(total_benefits_node) {

				this.ul_memberships = u.qs("ul.memberships", this.div_memberships);
				// insert new li in the beginning of membershiplist
				var benefits_node = u.ie(this.ul_memberships, "li", {"class":"benefits"})


				// u.ae(benefits_node, "h3", {"html":" - "});
				// u.ae(benefits_node, "p", {"html":" - "});
				// create list for benefits
				var ul = u.ae(benefits_node, "ul");

				// insert the total set of benefits into a table like structure, for vertical alignment
				for(j = 0; benefit = total_benefits_node.benefits[j]; j++) {
					li = u.ae(ul, "li");
					table = u.ae(li, "span", {"class":"table"});
					u.ae(table, "span", {"class":"cell", "html":benefit.innerHTML});
				}
				
				// query this as the sum of benefits
				this.benefits = u.qsa("li", ul);
				
			}


			// loop through memberships
			for(i = 0; node = this.membership_nodes[i]; i++) {

				// adjust benefits list to match total stack
				var j, benefit, not_included;
				// loop through total stack
				for(j = 0; j < total_benefits_node.benefits.length; j++) {
					// get benefit ii membership has it
					benefit = node.benefits[j];

					// this membership does not have more benefits, inject "not included" empty benefit node
					if(!benefit) {
						u.ae(node.benefits[0].parentNode, "li", {"class":"no"});
					}
					// if membership doesn't match total stack, inject "not included" empty benefit node 
					// this is to support unordered benefits 
					else if(u.text(benefit) != u.text(total_benefits_node.benefits[j])) {
						not_included = u.ae(benefit.parentNode, "li", {"class":"no"});
						benefit.parentNode.insertBefore(not_included, benefit);
						node.benefits = u.qsa(".description li", node);
					}
					// benefit is included
					else if(benefit) {

						// inject checkmark
						benefit.checkmark = u.svg({
							"name":"checkmark",
							"node":benefit,
							"class":"checkmark",
							"width":17,
							"height":17,
							"shapes":[
								{
									"type": "line",
									"x1": 2,
									"y1": 8,
									"x2": 7,
									"y2": 15
								},
								{
									"type": "line",
									"x1": 6,
									"y1": 15,
									"x2": 12,
									"y2": 2
								}
							]
						});
						
					}

				}
			}


			u.showScene(this);


			page.resized();
		}


		// scene is ready
		scene.ready();

	}

}
