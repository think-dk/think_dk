Util.Objects["articleMiniList"] = new function() {
	this.init = function(list) {
//		u.bug("articleMiniList");

		list.articles = u.qsa("li.article", list);

		var i, node;
		for(i = 0; node = list.articles[i]; i++) {

			var header = u.qs("h2,h3", node);
			header.current_readstate = node.getAttribute("data-readstate");

			if(header.current_readstate) {
				u.addCheckmark(header);
			}

		}

	}
}