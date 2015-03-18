Util.Objects["topic"] = new function() {
	this.init = function(node) {


		// add content
		node.problem = u.qs("div.problem", node);

		node.solution = u.qs("div.solution", node);

		// default hide details 
		node.details = u.qs("div.details", node.solution);

		if(node.details) {

			node.details_header = u.qs("h3", node.details);
			node.details_description = u.qs("div.description", node.details);

			node.details_header.node = node;
			u.addExpandArrow(node.details_header);

			u.ce(node.details_header);
			node.details_header.clicked = function() {

				if(u.hc(this.node.details, "open")) {
					u.addExpandArrow(this);
					u.rc(this.node.details, "open");
				}
				else {
					u.addCollapseArrow(this);
					u.ac(this.node.details, "open");
				}
			}
		}

	}
}