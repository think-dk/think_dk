u.site_name = "think.dk";


// global function to add checkmark
u.addCheckmark = function(node) {

	node.checkmark = u.svg({
		"name":"checkmark",
		"node":node,
		"class":"checkmark",
		"title":node.readstate ? ("Læst "+u.date("Y-m-d", node.readstate)) : false,
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

// global function to remove checkmark
u.removeCheckmark = function(node) {
	if(node.checkmark) {
		node.checkmark.parentNode.removeChild(node.checkmark);
		node.checkmark = false;
	}
}


// global function to add checkmark
u.addExpandArrow = function(node) {

	if(node.collapsearrow) {
		node.collapsearrow.parentNode.removeChild(node.collapsearrow);
		node.collapsearrow = false;
	}

	node.expandarrow = u.svg({
		"name":"expandarrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 2,
				"x2": 7,
				"y2": 9
			},
			{
				"type": "line",
				"x1": 6,
				"y1": 9,
				"x2": 11,
				"y2": 2
			}
		]
	});
}

u.addCollapseArrow = function(node) {

	if(node.expandarrow) {
		node.expandarrow.parentNode.removeChild(node.expandarrow);
		node.expandarrow = false;
	}

	node.collapsearrow = u.svg({
		"name":"collapsearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 9,
				"x2": 7,
				"y2": 2
			},
			{
				"type": "line",
				"x1": 6,
				"y1": 2,
				"x2": 11,
				"y2": 9
			}
		]
	});
}