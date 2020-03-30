/*
asset-builder @ 2020-03-30 08:05:10
*/

/*seg_tablet_include.js*/

/*seg_tablet.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.3";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
	u.txt = function(index) {return index;}
}
function fun(v) {return (typeof(v) === "function")}
function obj(v) {return (typeof(v) === "object")}
function str(v) {return (typeof(v) === "string")}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	console.log("Util.nodeId IS DEPRECATED. Use commas in u.bug in stead.");
	console.log(arguments.callee.caller);
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	console.error(_exception);
	u.bug("Invoked with arguments:");
	console.log(_arguments);
}
Util.bug = function() {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var i, message;
			if(obj(console)) {
				for(i = 0; i < arguments.length; i++) {
					if(arguments[i] || typeof(arguments[i]) == "undefined") {
						console.log(arguments[i]);
					}
				}
			}
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			var corner = u.bug_corner ? u.bug_corner : 0;
			var color = u.bug_color ? u.bug_color : "black";
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.fontSize = "11px";
				d_target.style.lineHeight = "11px";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "2px 3px";
			}
			for(i = 0; i < arguments.length; i++) {
				if(arguments[i] === undefined) {
					message = "undefined";
				}
				else if(!str(arguments[i]) && fun(arguments[i].toString)) {
					message = arguments[i].toString();
				}
				else {
					message = arguments[i];
				}
				var debug_div = document.getElementById("debug_id_"+corner);
				message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
				u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
			}
		}
		else if(typeof(console) !== "undefined" && obj(console)) {
			var i;
			for(i = 0; i < arguments.length; i++) {
				console.log(arguments[i]);
			}
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && obj(object[x]) && !str(object[x].nodeName)) {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && obj(object[x]) && str(object[x].nodeName)) {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && fun(object[x])) {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
	 			else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(fun(callback)) {
								var key = u.randomString(4);
								node[key] = callback;
								node[key](event);
								delete node[key];
								callback = null;
							}
							else if(fun(this[callback])) {
								this[callback](event);
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		if(event.target == this) {
			u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
			u.a.transition(event.target, "none");
			if(fun(this.transitioned)) {
				this.transitioned_before = this.transitioned;
				this.transitioned(event);
				if(this.transitioned === this.transitioned_before) {
					delete this.transitioned;
				}
			}
		}
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					if(fun(animation.node[animation.callback])) {
						animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
					}
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		if(fun(animation.node[animation.callback])) {
			animation.node[animation.callback](1);
		}
		if(fun(animation.node.transitioned)) {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	var force = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
				case "force"	: force		= _options[_argument]; break;
			}
		}
	}
	if(!force && obj(window.localStorage) && obj(window.sessionStorage)) {
		if(expires === true) {
			window.sessionStorage.setItem(name, value);
		}
		else {
			window.localStorage.setItem(name, value);
		}
		return;
	}
	if(expires === false) {
		expires = ";expires=Mon, 04-Apr-2020 05:00:00 GMT";
	}
	else if(str(expires)) {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires;
}
Util.getCookie = function(name) {
	var matches;
	if(obj(window.sessionStorage) && window.sessionStorage.getItem(name)) {
		return window.sessionStorage.getItem(name)
	}
	else if(obj(window.localStorage) && window.localStorage.getItem(name)) {
		return window.localStorage.getItem(name)
	}
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(obj(window.sessionStorage)) {
		window.sessionStorage.removeItem(name);
	}
	if(obj(window.localStorage)) {
		window.localStorage.removeItem(name);
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/\b[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+\b/g, "").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(new Date(timestamp.replace(/ /, "T"))) {
			date = new Date(timestamp.replace(/ /, "T"));
		}
		else {
			if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
				if(timestamp.match(/ \+[0-9]{4}/)) {
					date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
				}
			}
		}
		if(isNaN(date.getTime())) {
			date = new Date();
		}
	}
	var tokens = /d|j|m|n|F|Y|G|H|i|s/g;
	var chars = new Object();
	chars.j = date.getDate();
	chars.d = (chars.j > 9 ? "" : "0") + chars.j;
	chars.n = date.getMonth()+1;
	chars.m = (chars.n > 9 ? "" : "0") + chars.n;
	chars.F = months ? months[date.getMonth()] : "";
	chars.Y = date.getFullYear();
	chars.G = date.getHours();
	chars.H = (chars.G > 9 ? "" : "0") + chars.G;
	var i = date.getMinutes();
	chars.i = (i > 9 ? "" : "0") + i;
	var s = date.getSeconds();
	chars.s = (s > 9 ? "" : "0") + s;
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, nodes, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, nodes, i, regexp;
	var return_nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return_nodes.push(node);
		}
	}
	return return_nodes.length ? return_nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; i < node.childNodes.length; i++) {
		child = node.childNodes[i]
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.insertBefore(node, _parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ie", arguments, exception);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(obj(u.e) && fun(u.e.click)) {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(fun(node.preClicked)) {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey || (this._a && this._a.target))) {
					window.open(this.url);
				}
				else {
					if(obj(u.h) && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp("(\^| )" + var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		var match = node.className.match(regexp);
		if(match) {
			return match[0].replace(var_name + ":", "").trim();
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname, dom_update) {
	var old_class;
	if(node instanceof SVGElement) {
		old_class = node.className.baseVal;
		node.setAttribute("class", classname);
	}
	else {
		old_class = node.className;
		node.className = classname;
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return old_class;
}
Util.hasClass = u.hc = function(node, classname) {
	if(node.classList.contains(classname)) {
		return true;
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
		if(node instanceof SVGElement) {
			if(regexp.test(node.className.baseVal)) {
				return true;
			}
		}
		else {
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	var classnames = classname.split(" ");
	while(classnames.length) {
		node.classList.add(classnames.shift());
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	if(node.classList.contains(classname)) {
		node.classList.remove(classname);
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(?=[\\s]|$)", "g");
		if(node instanceof SVGElement) {
			node.setAttribute("class", node.className.baseVal.replace(regexp, " ").trim().replace(/[\s]{2}/g, " "));
		}
		else {
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	if(u.hc(node, classname)) {
		u.rc(node, classname, dom_update);
		if(_classname) {
			u.ac(node, _classname, dom_update);
		}
	}
	else {
		u.ac(node, classname);
		if(_classname) {
			u.rc(node, _classname, dom_update);
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			if(obj(u.a) && style == "transition") {
				u.a.transition(node, styles[style]);
			}
			else {
				node.style[u.vendorProperty(style)] = styles[style];
			}
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.getComputedStyle = u.gcs = function(node, property) {
	var dom_update = node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	return window.getComputedStyle(node, null).getPropertyValue(property);
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
u.contains = function(scope, node) {
	if(scope != node) {
		if(scope.contains(node)) {
			return true
		}
	}
	return false;
}
u.containsOrIs = function(scope, node) {
	if(scope == node || u.contains(scope, node)) {
		return true
	}
	return false;
}
u.elementMatches = u.em = function(node, selector) {
	return node.matches(selector);
}
Util.insertAfter = u.ia = function(after_node, insert_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(next_node, insert_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; i < list.length; i++) {
		list_node = list[i]
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
u.easings = new function() {
	this["ease-in"] = function(progress) {
		return Math.pow((progress), 3);
	}
	this["linear"] = function(progress) {
		return progress;
	}
	this["ease-out"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 3);
	}
	this["linear"] = function(progress) {
		return (progress);
	}
	this["ease-in-out-veryslow"] = function(progress) {
		if(progress > 0.5) {
			return 4*Math.pow((progress-1),3)+1;
		}
		return 4*Math.pow(progress,3);  
	}
	this["ease-in-out"] = function(progress) {
		if(progress > 0.5) {
			return 1 - Math.pow(1 - ((progress)), 2);
		}
		return Math.pow((progress), 2);
	}
	this["ease-out-slow"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 2);
	}
	this["ease-in-slow"] = function(progress) {
		return Math.pow((progress), 2);
	}
	this["ease-in-veryslow"] = function(progress) {
		return Math.pow((progress), 1.5);
	}
	this["ease-in-fast"] = function(progress) {
		return Math.pow((progress), 4);
	}
	this["easeOutQuad"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		return -c * t*(t-2) + b;
	};
	this["easeOutCubic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	this["easeOutQuint"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	};
	this["easeInOutSine"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	};
	this["easeInOutElastic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}
	this["easeOutBounce"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
	}
	this["easeInBack"] = function (progress) {
		var s = 1.70158;
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			return c*(t/=d)*t*((s+1)*t - s) + b;
	}
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if (navigator.userAgent.match(/Windows/i) && ((obj(document.ontouchmove) && obj(document.onmousemove)) || (fun(document.ontouchmove) && fun(document.onmousemove)))) {
		this.event_support = "multi";
	}
	else if (obj(document.ontouchmove) || fun(document.ontouchmove)) {
		this.event_support = "touch";
	}
	else {
		this.event_support = "mouse";
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.addEvent", arguments, exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.removeEvent", arguments, exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mouseup", this._rightclicked);
		this.removeEvent(node, "touchend", this._rightclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(fun(this.resetDragEvents)) {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this.swiped = false;
		if(!event.button) {
			if(this.e_click || this.e_dblclick || this.e_hold) {
				if(event.type.match(/mouse/)) {
					var node = this;
					while(node) {
						if(node.e_drag || node.e_swipe) {
							u.e.addMoveEvent(this, u.e._cancelClick);
							break;
						}
						else {
							node = node.parentNode;
						}
					}
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._dblclicked);
				if(this.e_hold) {
					this.t_held = u.t.setTimer(this, u.e._held, 750);
				}
			}
			if(this.e_drag || this.e_swipe) {
				u.e.addMoveEvent(this, u.e._pick);
				u.e.addEndEvent(this, u.e._cancelPick);
			}
			if(this.e_scroll) {
				u.e.addMoveEvent(this, u.e._scrollStart);
				u.e.addEndEvent(this, u.e._scrollEnd);
			}
		}
		else if(event.button === 2) {
			if(this.e_rightclick) {
				if(event.type.match(/mouse/)) {
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._rightclicked);
			}
		}
		if(fun(this.inputStarted)) {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(fun(this.clickCancelled)) {
				this.clickCancelled(event);
			}
		}
	}
	this._move = function(event) {
		if(fun(this.moved)) {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = event;
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(fun(this.held)) {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = event;
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.clicked)) {
			this.clicked(event);
		}
	}
	this.rightclick = function(node, _options) {
		node.e_rightclick_options = _options ? _options : {};
		node.e_rightclick_options.eventAction = u.stringOr(node.e_rightclick_options.eventAction, "RightClicked");
		node.e_rightclick = true;
		u.e.addStartEvent(node, this._inputStart);
		u.e.addEvent(node, "contextmenu", function(event){u.e.kill(event);});
	}
	this._rightclicked = function(event) {
		u.bug("_rightclicked:", this);
		if(this.e_rightclick_options) {
			this.e_rightclick_options.event = event;
			u.stats.event(this, this.e_rightclick_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.rightclicked)) {
			this.rightclicked(event);
		}
	}
	this.dblclick = this.doubleclick = this.doubletap = this.dbltap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = event;
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(fun(this.dblclicked)) {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._hover_over_delay = 0;
		node._callback_out = "out";
		node._callback_over = "over";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay_over"		: node._hover_over_delay	= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this._hover_over_delay) {
			u.e.__over.call(this, event);
		}
		else if(!u.t.valid(this.t_over)) {
			this.t_over = u.t.setTimer(this, u.e.__over, this._hover_over_delay, event);
		}
	}
	this.__over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this.is_hovered) {
			this.is_hovered = true;
			u.e.removeOverEvent(this, u.e._over);
			u.e.addOverEvent(this, u.e.__over);
			if(fun(this[this._callback_over])) {
				this[this._callback_over](event);
			}
		}
	}
	this._out = function(event) {
		u.t.resetTimer(this.t_over);
		u.t.resetTimer(this.t_out);
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		u.e.removeOverEvent(this, u.e.__over);
		u.e.addOverEvent(this, u.e._over);
		if(fun(this[this._callback_out])) {
			this[this._callback_out](event);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+' = '+action+'; window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {if(fun(window["_OnWindowEvent_node_'+ id + '"]["'+action+'"])) {window["_OnWindowEvent_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, type, window["_OnWindowEvent_callback_" + id]);
	return id;
}
u.e.removeWindowEvent = function(node, type, id) {
	u.e.removeEvent(window, type, window["_OnWindowEvent_callback_"+id]);
	delete window["_OnWindowEvent_node_"+id];
	delete window["_OnWindowEvent_callback_"+id];
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_Onstart_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+' = '+action+'; window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {if(fun(window["_Onstart_node_'+ id + '"]["'+action+'"])) {window["_Onstart_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addStartEvent(window, window["_Onstart_callback_" + id]);
	return id;
}
u.e.removeWindowStartEvent = function(node, id) {
	u.e.removeStartEvent(window, window["_Onstart_callback_"+id]);
	delete window["_Onstart_node_"+id]["_Onstart_callback_"+id];
	delete window["_Onstart_node_"+id];
	delete window["_Onstart_callback_"+id];
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_Onmove_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+' = '+action+'; window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {if(fun(window["_Onmove_node_'+ id + '"]["'+action+'"])) {window["_Onmove_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addMoveEvent(window, window["_Onmove_callback_" + id]);
	return id;
}
u.e.removeWindowMoveEvent = function(node, id) {
	u.e.removeMoveEvent(window, window["_Onmove_callback_" + id]);
	delete window["_Onmove_node_"+ id]["_Onmove_callback_"+id];
	delete window["_Onmove_node_"+ id];
	delete window["_Onmove_callback_"+ id];
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_Onend_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onend_callback_' + id + '"] = function(event) {window["_Onend_node_'+ id + '"]._Onend_callback_'+id+' = '+action+'; window["_Onend_node_'+ id + '"]._Onend_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onend_callback_' + id + '"] = function(event) {if(fun(window["_Onend_node_'+ id + '"]["'+action+'"])) {window["_Onend_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEndEvent(window, window["_Onend_callback_" + id]);
	return id;
}
u.e.removeWindowEndEvent = function(node, id) {
	u.e.removeEndEvent(window, window["_Onend_callback_" + id]);
	delete window["_Onend_node_"+ id]["_Onend_callback_"+id];
	delete window["_Onend_node_"+ id];
	delete window["_Onend_callback_"+ id];
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customDataFormat = {};
	this.customHintPosition = {};
	this.customLabelStyle = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_input;
		_form._bulk_operation = true;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._validation = true;
		_form._debug = false;
		_form._label_style = u.cv(_form, "labelstyle");
		_form._callback_ready = "ready";
		_form._callback_submitted = "submitted";
		_form._callback_pre_submitted = "preSubmitted";
		_form._callback_resat = "resat";
		_form._callback_updated = "updated";
		_form._callback_changed = "changed";
		_form._callback_blurred = "blurred";
		_form._callback_focused = "focused";
		_form._callback_validation_failed = "validationFailed";
		_form._callback_validation_passed = "validationPassed";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"               : _form._validation                = _options[_argument]; break;
					case "debug"                    : _form._debug                     = _options[_argument]; break;
					case "focus_z"                  : _form._focus_z_index             = _options[_argument]; break;
					case "label_style"              : _form._label_style               = _options[_argument]; break;
					case "callback_ready"           : _form._callback_ready            = _options[_argument]; break;
					case "callback_submitted"       : _form._callback_submitted        = _options[_argument]; break;
					case "callback_pre_submitted"   : _form._callback_pre_submitted    = _options[_argument]; break;
					case "callback_resat"           : _form._callback_resat            = _options[_argument]; break;
					case "callback_updated"         : _form._callback_updated          = _options[_argument]; break;
					case "callback_changed"         : _form._callback_changed          = _options[_argument]; break;
					case "callback_blurred"         : _form._callback_blurred          = _options[_argument]; break;
					case "callback_focused"         : _form._callback_focused          = _options[_argument]; break;
					case "callback_validation_failed"         : _form._callback_validation_failed          = _options[_argument]; break;
					case "callback_validation_passed"         : _form._callback_validation_passed          = _options[_argument]; break;
				}
			}
		}
		_form._hover_z_index = _form._focus_z_index - 1;
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.getData = function(_options) {
			return u.f.getFormData(this, _options);
		}
		_form.inputs = {};
		_form.actions = {};
		_form._error_inputs = {};
		var fields = u.qsa(".field", _form);
		for(i = 0; i < fields.length; i++) {
			field = fields[i];
			u.f.initField(_form, field);
		}
		var hidden_inputs = u.qsa("input[type=hidden]", _form);
		for(i = 0; i < hidden_inputs.length; i++) {
			hidden_input = hidden_inputs[i];
			if(!_form.inputs[hidden_input.name]) {
				_form.inputs[hidden_input.name] = hidden_input;
				hidden_input._form = _form;
				hidden_input.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; i < actions.length; i++) {
			action = actions[i];
			this.initButton(_form, action);
		}
		u.t.setTimer(_form, function() {
			var validate_inputs = [];
			for(input in this.inputs) {
				if(this.inputs[input].field) {
					validate_inputs.push(this.inputs[input]);
				}
			}
			u.f.bulkValidate(validate_inputs);
			if(_form._debug) {
				u.bug(_form, "inputs:", _form.inputs, "actions:", _form.actions);
			}
			if(fun(this[this._callback_ready])) {
				this[this._callback_ready]();
			}
		}, 100);
	}
	this.initField = function(_form, field) {
		field._form = _form;
		field._base_z_index = u.gcs(field, "z-index");
		field.help = u.qs(".help", field);
		field.hint = u.qs(".hint", field);
		field.error = u.qs(".error", field);
		field.label = u.qs("label", field);
		field.indicator = u.ae(field, "div", {"class":"indicator"});
		if(fun(u.f.fixFieldHTML)) {
			u.f.fixFieldHTML(field);
		}
		field._custom_initialized = false;
		var custom_init;
		for(custom_init in this.customInit) {
			if(u.hc(field, custom_init)) {
				this.customInit[custom_init](field);
				field._custom_initialized = true;
				break;
			}
		}
		if(!field._custom_initialized) {
			if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
				field.type = field.className.match(/(?:^|\b)(string|email|tel|number|integer|password|date|datetime)(?:\b|$)/)[0];
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "text")) {
				field.type = "text";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "select")) {
				field.type = "select";
				field.input = u.qs("select", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_select;
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "checkbox|boolean")) {
				field.type = field.className.match(/(?:^|\b)(checkbox|boolean)(?:\b|$)/)[0];
				field.input = u.qs("input[type=checkbox]", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_checkbox;
				u.f._update_checkbox_field.bind(field.input)();
				u.e.addEvent(field.input, "change", this._changed);
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._update_checkbox_field);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "radiobuttons")) {
				field.type = "radiobuttons";
				field.inputs = u.qsa("input", field);
				field.input = field.inputs[0];
				for(j = 0; j < field.inputs.length; j++) {
					input = field.inputs[j];
					input._form = _form;
					input.label = u.qs("label[for='"+input.id+"']", field);
					input.field = field;
					input.val = this._value_radiobutton;
					u.e.addEvent(input, "change", this._changed);
					u.e.addEvent(input, "change", this._updated);
					this.inputOnEnter(input);
					this.activateInput(input);
				}
			}
			else if(u.hc(field, "files")) {
				field.type = "files";
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_file;
				field.filelist = u.qs("ul.filelist", field);
				if(!field.filelist) {
					field.filelist = u.ae(field, "ul", {"class":"filelist"});
					field.insertBefore(field.help, field.filelist);
				}
				field.filelist.field = field;
				field.uploaded_files = u.qsa("li.uploaded", field.filelist);
				this._update_filelist.bind(field.input)();
				u.e.addEvent(field.input, "change", this._update_filelist);
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				if(u.e.event_support != "touch") {
					u.e.addEvent(field.input, "dragenter", this._focus);
					u.e.addEvent(field.input, "dragleave", this._blur);
					u.e.addEvent(field.input, "drop", this._blur);
				}
				this.activateInput(field.input);
			}
			else {
				u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:", field);
			}
		}
		if(field.input) {
			_form.inputs[field.input.name] = field.input;
			if(!_form._bulk_operation) {
				this.validate(field.input);
			}
		}
	}
	this.initButton = function(_form, action) {
		action._form = _form;
		this.buttonOnEnter(action);
		this.activateButton(action);
	}
	this._reset = function(event, iN) {
		for (name in this.inputs) {
			if (this.inputs[name] && this.inputs[name].field && this.inputs[name].type != "hidden" && !this.inputs[name].getAttribute("readonly")) {
				this.inputs[name]._used = false;
				this.inputs[name].val("");
				if(fun(u.f.updateDefaultState)) {
					u.f.updateDefaultState(this.inputs[name]);
				}
			}
		}
		if(fun(this[this._callback_resat])) {
			this[this._callback_resat](iN);
		}
	}
	this._submit = function(event, iN) {
		var validate_inputs = [];
		for(name in this.inputs) {
			if(this.inputs[name] && this.inputs[name].field && fun(this.inputs[name].val)) {
				this.inputs[name]._used = true;
				validate_inputs.push(this.inputs[name]);
			}
		}
		u.f.bulkValidate(validate_inputs);
		if(!Object.keys(this._error_inputs).length) {
			if(fun(this[this._callback_pre_submitted])) {
				this[this._callback_pre_submitted](iN);
			}
			if(fun(this[this._callback_submitted])) {
				this[this._callback_submitted](iN);
			}
			else {
				for(name in this.inputs) {
					if(this.inputs[name] && this.inputs[name].default_value && this.inputs[name].nodeName.match(/^(input|textarea)$/i)) {
						if(fun(this.inputs[name].val) && !this.inputs[name].val()) {
							this.inputs[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; i < this.field.inputs.length; i++) {
				option = this.field.inputs[i];
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		for(i = 0; i < this.field.inputs.length; i++) {
			option = this.field.inputs[i];
			if(option.checked) {
				return option.value;
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
			}
			else {
				this.checked = false;
			}
			u.f._update_checkbox_field.bind(this)();
			u.f.validate(this);
		}
		if(this.checked) {
			return this.value;
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; i < this.options.length; i++) {
				option = this.options[i];
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return this.options[this.selectedIndex].value;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return "";
			}
		}
		return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			if(value === "") {
				this.value = null;
			}
			else {
				u.bug('ADDING VALUES MANUALLY TO INPUT type="file" IS NOT SUPPORTED IN JAVASCRIPT');
			}
			u.f._update_filelist.bind(this)();
			u.f.validate(this);
		}
		if(this.files && this.files.length) {
			var i, file, files = [];
			for(i = 0; i < this.files.length; i++) {
				file = this.files[i];
				files.push(file);
			}
			return files;
		}
		else if(!this.files && this.value) {
			return this.value;
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length){
			return true;
		}
		return "";
	}
	this._changed = function(event) {
		if(fun(this[this._form._callback_changed])) {
			this[this._form._callback_changed](this);
		}
		else if(fun(this.field.input[this._form._callback_changed])) {
			this.field.input[this._form._callback_changed](this);
		}
		if(fun(this._form[this._form._callback_changed])) {
			this._form[this._form._callback_changed](this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			u.f.validate(this);
			if(fun(this[this._form._callback_updated])) {
				this[this._form._callback_updated](this);
			}
			else if(fun(this.field.input[this._form._callback_updated])) {
				this.field.input[this._form._callback_updated](this);
			}
			if(fun(this._form[this._form._callback_updated])) {
				this._form[this._form._callback_updated](this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._update_filelist = function(event) {
		var i;
		var files = this.val();
		this.field.filelist.innerHTML = "";
		u.ae(this.field.filelist, "li", {html:this.field.hint ? u.text(this.field.hint) : u.text(this.label), class:"label"})
		if(files && files.length) {
			u.ac(this.field, "has_new_files");
			var i;
			for(i = 0; i < files.length; i++) {
				u.ae(this.field.filelist, "li", {html:files[i].name, class:"new"})
			}
			if(this.multiple) {
				for(i = 0; i < this.field.uploaded_files.length; i++) {
					u.ae(this.field.filelist, this.field.uploaded_files[i]);
				}
			}
			else {
				this.field.uploaded_files = [];
			}
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length) {
			u.rc(this.field, "has_new_files");
			var i;
			for(i = 0; i < this.field.uploaded_files.length; i++) {
				u.ae(this.field.filelist, this.field.uploaded_files[i]);
			}
		}
		else {
			u.rc(this.field, "has_new_files");
		}
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		else if(fun(this.field.input[this._form._callback_focused])) {
			this.field.input[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this._used = true;
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		else if(fun(this.field.input[this._form._callback_blurred])) {
			this.field.input[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && fun(this.clicked)) {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_support != "touch") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form._label_style && fun(this.customLabelStyle[iN._form._label_style])) {
			this.customLabelStyle[iN._form._label_style](iN);
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if(this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else if(this.url) {
						if(event && (event.metaKey || event.ctrlKey)) {
							window.open(this.url);
						}
						else {
							if(obj(u.h) && u.h.is_listening) {
								u.h.navigate(this.url, this);
							}
							else {
								location.href = this.url;
							}
						}
					}
				}
			}
		}
		var action_name = action.name ? action.name : (action.parentNode.className ? u.superNormalize(action.parentNode.className) : (action.value ? u.superNormalize(action.value) : u.superNormalize(u.text(action))));
		if(action_name && !action._form.actions[action_name]) {
			action._form.actions[action_name] = action;
		}
		if(obj(u.k) && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.positionHint = function(field) {
		if(field.help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field);
					return;
				}
			}
			var input_middle = field.input.offsetTop + (field.input.offsetHeight / 2);
			var help_top = input_middle - field.help.offsetHeight / 2;
			u.ass(field.help, {
				"top": help_top + "px"
			});
		}
	}
	this.updateFilelistStatus = function(form, response) {
		if(form && form.inputs && response && response.cms_status == "success" && response.cms_object && response.cms_object.mediae) {
			var mediae = JSON.parse(JSON.stringify(response.cms_object.mediae));
			var filelists = u.qsa("div.field.files ul.filelist", form);
			var i, j, k, filelist, old_files, old_file, new_files, new_files;
			for(i = 0; i < filelists.length; i++) {
				filelist = filelists[i];
				new_files = u.qsa("li.new", filelist);
				if(new_files.length) {
					old_files = u.qsa("li.uploaded", filelist);
					if(old_files.length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^" + filelist.field.input.name.replace(/\[\]$/, "") + "(\-|$)")) {
								for(k = 0; k < old_files.length; k++) {
									old_file = old_files[k];
									if(u.cv(old_file, "media_id") == media.id) {
										delete mediae[j];
									}
								}
							}
						}
					}
					if(Object.keys(mediae).length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^"+filelist.field.input.name.replace(/\[\]$/, "")+"(\-|$)")) {
								for(k = 0; k < new_files.length; k++) {
									new_file = new_files[k];
									if(u.text(new_file) == media.name || u.text(new_file)+".zip" == media.name) {
										new_file.innerHTML = media.name;
										u.rc(new_file, "new");
										u.ac(new_file, "uploaded media_id:"+media.id+" variant:"+media.variant+" format:"+media.format+" width:"+media.width+" height:"+media.height);
										delete mediae[j];
									}
								}
							}
						}
					}
				}
				filelist.field.uploaded_files = u.qsa("li.uploaded", filelist);
			}
		}
	}
	this.inputHasError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		delete iN.is_correct;
		if(iN.val() !== "") {
			if(!iN.has_error && (iN._used || iN._form._bulk_operation)) {
				iN._form._error_inputs[iN.name] = true;
				u.ac(iN, "error");
				u.ac(iN.field, "error");
				iN.has_error = true;
				this.updateInputValidationState(iN);
			 }
		}
		else if(!iN.has_error && iN._used) {
			iN._form._error_inputs[iN.name] = true;
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			iN.has_error = true;
			this.updateInputValidationState(iN);
		}
		else if(!iN._used) {
			delete iN._form._error_inputs[iN.name];
			u.rc(iN, "error");
			u.rc(iN.field, "error");
			delete iN.has_error;
		}
		this.positionHint(iN.field);
	}
	this.inputIsCorrect = function(iN) {
		u.rc(iN, "error");
		u.rc(iN.field, "error");
		delete iN.has_error;
		delete iN._form._error_inputs[iN.name];
		if(iN.val() !== "") {
			if(!iN.is_correct) {
				iN._used = true;
				u.ac(iN, "correct");
				u.ac(iN.field, "correct");
				iN.is_correct = true;
				this.updateInputValidationState(iN);
			}
		}
		else if(iN.is_correct || iN.has_error) {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			delete iN.is_correct;
			this.updateInputValidationState(iN);
		}
	}
	this.updateInputValidationState = function(iN) {
		if(iN.has_error && fun(iN[iN._form._callback_validation_failed])) {
			iN[iN._form._callback_validation_failed]();
		}
		else if(iN.is_correct && fun(iN[iN._form._callback_validation_passed])) {
			iN[iN._form._callback_validation_passed]();
		}
		this.updateFormValidationState(iN._form);
	}
	this.updateFormValidationState = function(_form) {
		if(!_form._bulk_operation) {
			if(Object.keys(_form._error_inputs).length) {
				_form._validation_state = "error";
				if(_form._error_inputs !== _form._reference_error_inputs) {
					if(fun(_form[_form._callback_validation_failed])) {
						_form[_form._callback_validation_failed](_form._error_inputs);
					}
				}
			}
			else if(u.qsa(".field.required", _form).length === u.qsa(".field.required.correct", _form).length) {
				if(fun(_form[_form._callback_validation_passed]) && _form._validation_state !== "correct") {
					_form[_form._callback_validation_passed]();
				}
				_form._validation_state = "correct";
			}
			else {
				_form._validation_state = "void";
			}
			_form._reference_error_inputs = JSON.parse(JSON.stringify(_form._error_inputs));
		}
	}
	this.bulkValidate = function(inputs) {
		if(inputs && inputs.length) {
			var _form = inputs[0]._form;
			_form._bulk_operation = true;
			var i;
			for(i = 0; i < inputs.length; i++) {
				u.f.validate(inputs[i]);
			}
			_form._bulk_operation = false;
			this.updateFormValidationState(_form);
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation || !iN.field) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		var compare_to = iN.getAttribute("data-compare-to");
		if(!u.hc(iN.field, "required") && iN.val() === "" && (!compare_to || iN._form.inputs[compare_to].val() === "")) {
			this.inputIsCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.inputHasError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$")) &&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "email")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/))
						||
						(pattern && iN.val().match(pattern))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("accept");
				var i, value = iN.val(), files = [];
				if(iN.field.uploaded_files && iN.field.uploaded_files.length) {
					for(i = 0; i < iN.field.uploaded_files.length; i++) {
						files.push("." + u.cv(iN.field.uploaded_files[i], "format").toLowerCase());
					}
				}
				if(value && value.length) {
					for(i = 0; i < value.length; i++) {
						files.push(value[i].name.substring(value[i].name.lastIndexOf(".")).toLowerCase());
					}
				}
				if(
					(files.length >= min && files.length <= max)
					&&
					(!pattern || files.every(function(v) {return pattern.split(",").indexOf(v) !== -1}))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getFormData = this.getParams = function(_form, _options) {
		var format = "formdata";
		var ignore_inputs = "ignoreinput";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
					case "format"           : format            = _options[_argument]; break;
				}
			}
		}
		var i, input, select, textarea, param, params;
		if(format == "formdata") {
			params = new FormData();
		}
		else {
			params = new Object();
			params.append = function(name, value, filename) {
				this[name] = filename || value;
			}
		}
		if(_form._submit_button && _form._submit_button.name) {
			params.append(_form._submit_button.name, _form._submit_button.value);
		}
		var inputs = u.qsa("input", _form);
		var selects = u.qsa("select", _form)
		var textareas = u.qsa("textarea", _form)
		for(i = 0; i < inputs.length; i++) {
			input = inputs[i];
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
				else if(input.type == "file") {
					var f, file, files;
					if(fun(input.val)) {
						files = input.val();
					}
					else if(input.files) {
						files = input.files;
					}
					if(files && files.length) {
						for(f = 0; f < files.length; f++) {
							file = files[f];
							params.append(input.name, file, file.name);
						}
					}
					else {
						params.append(input.name, (input.value || ""));
					}
				}
				else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
			}
		}
		for(i = 0; i < selects.length; i++) {
			select = selects[i];
			if(!u.hc(select, ignore_inputs)) {
				if(fun(select.val)) {
					params.append(select.name, select.val());
				}
				else {
					params.append(select.name, select.options[select.selectedIndex] ? select.options[select.selectedIndex].value : "");
				}
			}
		}
		for(i = 0; i < textareas.length; i++) {
			textarea = textareas[i];
			if(!u.hc(textarea, ignore_inputs)) {
				if(fun(textarea.val)) {
					params.append(textarea.name, textarea.val());
				}
				else {
					params.append(textarea.name, textarea.value);
				}
			}
		}
		if(format && fun(this.customDataFormat[format])) {
			return this.customDataFormat[format](params, _form);
		}
		else if(format == "formdata") {
			return params;
		}
		else if(format == "object") {
			delete params.append;
			return params;
		}
		else {
			var string = "";
			for(param in params) {
				if(!fun(params[param])) {
					string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
				}
			}
			return string;
		}
	}
}
Util.Form.customLabelStyle["inject"] = function(iN) {
	if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
		iN.default_value = u.text(iN.label);
		u.e.addEvent(iN, "focus", u.f._changed_state);
		u.e.addEvent(iN, "blur", u.f._changed_state);
		if(iN.type.match(/number|integer|password|datetime|date/)) {
			iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
			iN.pseudolabel.iN = iN;
			u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
			u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
			u.ce(iN.pseudolabel)
			iN.pseudolabel.inputStarted = function(event) {
				u.e.kill(event);
				this.iN.focus();
			}
		}
		u.f.updateDefaultState(iN);
	}
}
u.f._changed_state = function() {
	u.f.updateDefaultState(this);
}
u.f.updateDefaultState = function(iN) {
	if(iN.is_focused || iN.val() !== "") {
		u.rc(iN, "default");
		if(iN.val() === "") {
			iN.val("");
		}
	}
	else {
		if(iN.val() === "") {
			u.ac(iN, "default");
			iN.val(iN.default_value);
		}
	}
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Modules = u.m = new Object();
Util.init = function(scope) {
	var i, node, nodes, module;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		while((module = u.cv(node, "i"))) {
			u.rc(node, "i:"+module);
			if(module && obj(u.m[module])) {
				u.m[module].init(node);
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
u.objectValues = function(obj) {
	var key, values = [];
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}
	return values;
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_support == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 2;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; i < files.length; i++) {
			file = files[i];
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(fun(node[new_queue._callback_waiting])) {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(fun(next._queue._node[next._queue._callback_loading])) {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				if(next._file.match(/png|jpg|gif|svg/)) {
					next.loaded = function(event) {
						this.image = event.target;
						this._image = this.image;
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					u.loadImage(next, next._file);
				}
				else if(next._file.match(/mp3|aac|wav|ogg/)) {
					next.loaded = function(event) {
						console.log(event);
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					if(fun(u.audioPlayer)) {
						next.audioPlayer = u.audioPlayer();
						next.load(next._file);
					}
					else {
						u.bug("You need u.audioPlayer to preload MP3s");
					}
				}
				else {
				}
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(fun(this.node.loaded)) {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(fun(this.node.loaded) && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(fun(this.node.failed)) {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(fun(this.node.progress)) {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].request_credentials = false;
	node[request_id].response_type = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	node[request_id].request_timeout = false;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method			= _options[argument]; break;
				case "params"				: node[request_id].request_data				= _options[argument]; break;
				case "data"					: node[request_id].request_data				= _options[argument]; break;
				case "async"				: node[request_id].request_async			= _options[argument]; break;
				case "headers"				: node[request_id].request_headers			= _options[argument]; break;
				case "credentials"			: node[request_id].request_credentials		= _options[argument]; break;
				case "responseType"			: node[request_id].response_type			= _options[argument]; break;
				case "callback"				: node[request_id].callback_response		= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error			= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback			= _options[argument]; break;
				case "timeout"				: node[request_id].request_timeout			= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(fun(node[request_id].HTTPRequest.addEventListener)) {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"])) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH|DELETE/i)) {
				var params;
				if(obj(node[request_id].request_data) && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(!params.constructor.toString().match(/FormData/i) && (typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"]))) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		if(node[request_id].request_timeout) {
			node[request_id].timedOut = function(requestee) {
				this.status = 0;
				delete this.timedOut;
				delete this.t_timeout;
				Util.validateResponse({node: requestee.node, request_id: requestee.request_id, status:this.status});
			}
			node[request_id].t_timeout = u.t.setTimer(node[request_id], "timedOut", node[request_id].request_timeout, {node: node, request_id: request_id});
		}
		var key = u.randomString();
		document[key] = new Object();
		document[key].key = key;
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.t.resetTimer(this.node[this.request_id].t_timeout);
			delete this.node[this.request_id].timedOut;
			delete this.node[this.request_id].t_timeout;
			u.qs("head").removeChild(this.node[this.request_id].script_tag);
			delete this.node[this.request_id].script_tag;
			delete document[this.key];
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		node[request_id].script_tag = u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(obj(json)) {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(obj(responseText)) {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(HTTPRequest){
	var object = false;
	if(HTTPRequest) {
		var node = HTTPRequest.node;
		var request_id = HTTPRequest.request_id;
		var request = node[request_id];
		request.response_url = HTTPRequest.responseURL || request.request_url;
		delete request.HTTPRequest;
		if(request.finished) {
			return;
		}
		request.finished = true;
		try {
			request.status = HTTPRequest.status;
			if(HTTPRequest.status && !HTTPRequest.status.toString().match(/[45][\d]{2}/)) {
				if(HTTPRequest.responseType && HTTPRequest.response) {
					object = HTTPRequest.response;
				}
				else if(HTTPRequest.responseText) {
					object = u.evaluateResponseText(HTTPRequest.responseText);
				}
			}
			else if(HTTPRequest.responseText && typeof(HTTPRequest.status) == "undefined") {
				object = u.evaluateResponseText(HTTPRequest.responseText);
			}
		}
		catch(exception) {
			request.exception = exception;
		}
	}
	else {
		console.log("Lost track of this request. There is no way of routing it back to requestee.")
		return;
	}
	if(object !== false) {
		if(fun(request.callback_response)) {
			request.callback_response(object, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response](object, request_id);
		}
	}
	else {
		if(fun(request.callback_error)) {
			request.callback_error({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_error])) {
			node[request.callback_error]({error:true,status:request.status}, request_id);
		}
		else if(fun(request.callback_response)) {
			request.callback_response({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response]({error:true,status:request.status}, request_id);
		}
	}
}
u.scrollTo = function(node, _options) {
	node._callback_scroll_to = "scrolledTo";
	node._callback_scroll_cancelled = "scrollToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	node._force_scroll_to = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node._callback_scroll_to            = _options[_argument]; break;
				case "callback_cancelled"   : node._callback_scroll_cancelled     = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"                 : to_node                            = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
				case "force"                : node._force_scroll_to              = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if (Util.support("scrollBehavior")) {
		var test = node.scrollTo({top:node._to_y, left:node._to_x, behavior: 'smooth'});
	}
	else {
		if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
			node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
		}
		if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
			node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
		}
		node._to_x = node._to_x < 0 ? 0 : node._to_x;
		node._to_y = node._to_y < 0 ? 0 : node._to_y;
		node._x_scroll_direction = node._to_x - u.scrollX();
		node._y_scroll_direction = node._to_y - u.scrollY();
		node._scroll_to_x = u.scrollX();
		node._scroll_to_y = u.scrollY();
		node._ignoreWheel = function(event) {
			u.e.kill(event);
		}
		if(node._force_scroll_to) {
			u.e.addEvent(node, "wheel", node._ignoreWheel);
		}
		node._scrollToHandler = function(event) {
			u.t.resetTimer(this.t_scroll);
			this.t_scroll = u.t.setTimer(this, this._scrollTo, 25);
		}
		node._cancelScrollTo = function() {
			if(!this._force_scroll_to) {
				u.t.resetTimer(this.t_scroll);
				this._scrollTo = null;
			}
		}
		node._scrollToFinished = function() {
			u.t.resetTimer(this.t_scroll);
			u.e.removeEvent(this, "wheel", this._ignoreWheel);
			this._scrollTo = null;
		}
		node._ZoomScrollFix = function(s_x, s_y) {
			if(Math.abs(this._scroll_to_y - s_y) <= 2 && Math.abs(this._scroll_to_x - s_x) <= 2) {
				return true;
			}
			return false;
		}
		node._scrollTo = function(start) {
			var s_x = u.scrollX();
			var s_y = u.scrollY();
			if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this._force_scroll_to || this._ZoomScrollFix(s_x, s_y)) {
				if(this._x_scroll_direction > 0 && this._to_x > s_x) {
					this._scroll_to_x = Math.ceil(this._scroll_to_x + (this._to_x - this._scroll_to_x)/6);
				}
				else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
					this._scroll_to_x = Math.floor(this._scroll_to_x - (this._scroll_to_x - this._to_x)/6);
				}
				else {
					this._scroll_to_x = this._to_x;
				}
				if(this._y_scroll_direction > 0 && this._to_y > s_y) {
					this._scroll_to_y = Math.ceil(this._scroll_to_y + (this._to_y - this._scroll_to_y)/6);
				}
				else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
					this._scroll_to_y = Math.floor(this._scroll_to_y - (this._scroll_to_y - this._to_y)/6);
				}
				else {
					this._scroll_to_y = this._to_y;
				}
				if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
					this._scrollToFinished();
					this.scrollTo(this._to_x, this._to_y);
					if(fun(this[this._callback_scroll_to])) {
						this[this._callback_scroll_to]();
					}
					return;
				}
				this.scrollTo(this._scroll_to_x, this._scroll_to_y);
				this._scrollToHandler();
			}
			else {
				this._cancelScrollTo();
				if(fun(this[this._callback_scroll_cancelled])) {
					this[this._callback_scroll_cancelled]();
				}
			}	
		}
		node._scrollTo();
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; i < matches.length; i++){
			match = matches[i];
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	var table = {
		'À':'A',  'à':'a',
		'Á':'A',  'á':'a',
		'Â':'A',  'â':'a',
		'Ã':'A',  'ã':'a',
		'Ä':'A',  'ä':'a',
		'Å':'Aa', 'å':'aa',
		'Æ':'Ae', 'æ':'ae',
		'Ç':'C',  'ç':'c',
		'Č':'C',  'ć':'c',
		'Ć':'C',  'č':'c',
		'Đ':'D',  'đ':'d',  'ð':'d',
		'È':'E',  'è':'e',
		'É':'E',  'é':'e',
		'Ê':'E',  'ê':'e',
		'Ë':'E',  'ë':'e',
		'Ģ':'G',  'ģ':'g',
		'Ğ':'G',  'ğ':'g',
		'Ì':'I',  'ì':'i',
		'Í':'I',  'í':'i',
		'Î':'I',  'î':'i',
		'Ï':'I',  'ï':'i',
		'Ī':'I',  'ī':'i',
		'Ķ':'K',  'ķ':'k',
		'Ļ':'L',  'ļ':'l',
		'Ñ':'N',  'ñ':'n',
		'Ņ':'N',  'ņ':'n',
		'Ò':'O',  'ò':'o',
		'Ó':'O',  'ó':'o',
		'Ô':'O',  'ô':'o',
		'Õ':'O',  'õ':'o',
		'Ö':'O',  'ö':'o',
		'Ō':'O',  'ō':'o',
		'Ø':'Oe', 'ø':'oe',
		'Ŕ':'R',  'ŕ':'r',
		'Š':'S',  'š':'s',
		'Ş':'S',  'ş':'s',
		'Ṩ':'S',  'ṩ':'s',
		'Ù':'U',  'ù':'u',
		'Ú':'U',  'ú':'u',
		'Û':'U',  'û':'u',
		'Ü':'U',  'ü':'u',
		'Ū':'U',  'ū':'u',
		'Ų':'U',  'ų':'u',
		'Ŭ':'U',  'ŭ':'u',
		'Ý':'Y',  'ý':'y',
		'Ÿ':'Y',  'ÿ':'y',
		'Ž':'Z',  'ž':'z',
		'Þ':'B',  'þ':'b',
		'ß':'Ss',
		'@':' at ',
		'&':'and',
		'%':' percent',
		'\\$':'USD',
		'¥':'JPY',
		'€':'EUR',
		'£':'GBP',
		'™':'trademark',
		'©':'copyright',
		'§':'s',
		'\\*':'x',
		'×':'x'
	}
	var char, regex;
	for(char in table) {
		regex = new RegExp(char, "g");
		string = string.replace(regex, table[char]);
	}
	return string;
}
Util.superNormalize = function(string) {
	string = u.normalize(string);
	string = string.toLowerCase();
	string = u.stripTags(string);
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.stripTags = function(string) {
	var node = document.createElement("div");
	node.innerHTML = string;
	return u.text(node);
}
Util.pluralize = function(count, singular, plural) {
	if(count != 1) {
		return count + " " + plural;
	}
	return count + " " + singular;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(obj(test)) {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {
			console.log(exception)
		}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.svg = function(svg_object) {
	var svg, shape, svg_shape;
	if(svg_object.name && u._svg_cache && u._svg_cache[svg_object.name]) {
		svg = u._svg_cache[svg_object.name].cloneNode(true);
	}
	if(!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for(shape in svg_object.shapes) {
			Util.svgShape(svg, svg_object.shapes[shape]);
		}
		if(svg_object.name) {
			if(!u._svg_cache) {
				u._svg_cache = {};
			}
			u._svg_cache[svg_object.name] = svg.cloneNode(true);
		}
	}
	if(svg_object.title) {
		svg.setAttributeNS(null, "title", svg_object.title);
	}
	if(svg_object["class"]) {
		svg.setAttributeNS(null, "class", svg_object["class"]);
	}
	if(svg_object.width) {
		svg.setAttributeNS(null, "width", svg_object.width);
	}
	if(svg_object.height) {
		svg.setAttributeNS(null, "height", svg_object.height);
	}
	if(svg_object.id) {
		svg.setAttributeNS(null, "id", svg_object.id);
	}
	if(svg_object.node) {
		svg.node = svg_object.node;
	}
	if(svg_object.node) {
		svg_object.node.appendChild(svg);
	}
	return svg;
}
Util.svgShape = function(svg, svg_object) {
	svg_shape = document.createElementNS("http://www.w3.org/2000/svg", svg_object["type"]);
	svg_object["type"] = null;
	delete svg_object["type"];
	for(detail in svg_object) {
		svg_shape.setAttributeNS(null, detail, svg_object[detail]);
	}
	return svg.appendChild(svg_shape);
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		u.bug(navigator.userAgent);
		if(!window.chrome && navigator.userAgent.match(/WebKit[^$]+Version\/(\d+)(.\d)/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; i < scripts.length; i++) {
			script = scripts[i];
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && fun(window.getComputedStyle)) {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; i < styles.length; i++) {
					style = styles[i];
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(fun(timer._a)) {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(fun(node[timer._a])) {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		if(fun(this._timers[id]._a)) {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(fun(node[this._timers[id]._a])) {
			node[this._timers[id]._a](this._timers[id]._p);
		}
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.History = u.h = new function() {
	this.popstate = ("onpopstate" in window);
	this.callbacks = [];
	this.is_listening = false;
	this.navigate = function(url, node, silent) {
		silent = silent || false;
		if((!url.match(/^http[s]?\:\/\//) || url.match(document.domain)) && (!node || !node._a || !node._a.target)) {
			if(this.popstate) {
				history.pushState({}, url, url);
				if(!silent) {
					this.callback(url);
				}
			}
			else {
				if(silent) {
					this.next_hash_is_silent = true;
				}
				location.hash = u.h.getCleanUrl(url);
			}
		}
		else {
			if(!node || !node._a || !node._a.target) {
				location.href = url;
			}
			else {
				window.open(this.url);
			}
		}
	}
	this.callback = function(url) {
		var i, recipient;
		for(i = 0; i < this.callbacks.length; i++) {
			recipient = this.callbacks[i];
			if(fun(recipient.node[recipient.callback])) {
				recipient.node[recipient.callback](url);
			}
		}
	}
	this.removeEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(recipient.node == node && recipient.callback == callback_urlchange) {
				this.callbacks.splice(i, 1);
				break;
			}
		}
	}
	this.addEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		if(!this.is_listening) {
			this.is_listening = true;
			if(this.popstate) {
				u.e.addEvent(window, "popstate", this._urlChanged);
			}
			else if("onhashchange" in window && !u.browser("explorer", "<=7")) {
				u.e.addEvent(window, "hashchange", this._hashChanged);
			}
			else {
				u.h._current_hash = window.location.hash;
				window.onhashchange = this._hashChanged;
				setInterval(
					function() {
						if(window.location.hash !== u.h._current_hash) {
							u.h._current_hash = window.location.hash;
							window.onhashchange();
						}
					}, 200
				);
			}
		}
		this.callbacks.push({"node":node, "callback":callback_urlchange});
	}
	this._urlChanged = function(event) {
		var url = u.h.getCleanUrl(location.href);
		if(event.state || (!event.state && event.path)) {
			u.h.callback(url);
		}
		else {
			history.replaceState({}, url, url);
		}
	}
	this._hashChanged = function(event) {
		if(!location.hash || !location.hash.match(/^#\//)) {
			location.hash = "#/"
			return;
		}
		var url = u.h.getCleanHash(location.hash);
		if(u.h.next_hash_is_silent) {
			delete u.h.next_hash_is_silent;
		}
		else {
			u.h.callback(url);
		}
	}
	this.trail = [];
	this.addToTrail = function(url, node) {
		this.trail.push({"url":url, "node":node});
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "") ? string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0] : "/";
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var path = string.split("/");
			levels = levels > path.length-1 ? path.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + path[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.resolveCurrentUrl = function() {
		return !location.hash ? this.getCleanUrl(location.href) : this.getCleanHash(location.hash);
	}
}
u.navigation = function(_options) {
	var navigation_node = page;
	var callback_navigate = "_navigate";
	var initialization_scope = page.cN;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "callback"       : callback_navigate           = _options[argument]; break;
				case "node"           : navigation_node             = _options[argument]; break;
				case "scope"          : initialization_scope        = _options[argument]; break;
			}
		}
	}
	window._man_nav_path = window._man_nav_path ? window._man_nav_path : u.h.getCleanUrl(location.href, 1);
	navigation_node._navigate = function(url) {
		var clean_url = u.h.getCleanUrl(url);
		u.stats.pageView(url);
		if(
			!window._man_nav_path || 
			(!u.h.popstate && window._man_nav_path != u.h.getCleanHash(location.hash, 1)) || 
			(u.h.popstate && window._man_nav_path != u.h.getCleanUrl(location.href, 1))
		) {
			if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && fun(this.cN.scene.navigate)) {
				this.cN.scene.navigate(clean_url, url);
			}
			else if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		if(!u.h.popstate) {
			window._man_nav_path = u.h.getCleanHash(location.hash, 1);
		}
		else {
			window._man_nav_path = u.h.getCleanUrl(location.href, 1);
		}
	}
	if(location.hash.length && location.hash.match(/^#!/)) {
		location.hash = location.hash.replace(/!/, "");
	}
	var callback_after_init = false;
	if(!this.is_initialized) {
		this.is_initialized = true;
		if(!u.h.popstate) {
			if(location.hash.length < 2) {
				window._man_nav_path = u.h.getCleanUrl(location.href);
				u.h.navigate(window._man_nav_path);
				u.init(initialization_scope);
			}
			else if(location.hash.match(/^#\//) && u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				callback_after_init = u.h.getCleanHash(location.hash);
			}
			else {
				u.init(initialization_scope);
			}
		}
		else {
			if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href) && location.hash.match(/^#\//)) {
				window._man_nav_path = u.h.getCleanHash(location.hash);
				u.h.navigate(window._man_nav_path);
				callback_after_init = window._man_nav_path;
			}
			else {
				u.init(initialization_scope);
			}
		}
		var random_string = u.randomString(8);
		if(callback_after_init) {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});u.h.callback("'+callback_after_init+'");}');
		}
		else {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});}');
		}
		u.t.setTimer(navigation_node, "_initNavigation_"+random_string, 100);
	}
	else {
		u.h.callbacks.push({"node":navigation_node, "callback":callback_navigate});
	}
}
u.txt = function(index) {
	if(!u.translations) {
	}
	if(index == "assign") {
		u.bug("USING RESERVED INDEX: assign");
		return "";
	}
	if(u.txt[index]) {
		return u.txt[index];
	}
	u.bug("MISSING TEXT: "+index);
	return "";
}
u.txt["assign"] = function(obj) {
	for(x in obj) {
		u.txt[x] = obj[x];
	}
}
u.showScene = function(scene) {
	var i, node;
	var nodes = u.cn(scene);
	if(nodes.length) {
		var article = u.qs("div.article", scene);
		if(nodes[0] == article) {
			var article_nodes = u.cn(article);
			nodes.shift();
			for(x in nodes) {
				article_nodes.push(nodes[x]);
			}
			nodes = article_nodes;
		}
		var headline = u.qs("h1,h2", scene);
		for(i = 0; node = nodes[i]; i++) {
			u.ass(node, {
				"opacity":0,
			});
		}
		u.ass(scene, {
			"opacity":1,
		});
		u._stepA1.call(headline);
		for(i = 0; node = nodes[i]; i++) {
			u.a.transition(node, "all 0.2s ease-in "+((i*100)+200)+"ms");
			u.ass(node, {
				"opacity":1,
				"transform":"translate(0, 0)"
			});
		}
	}
	else {
		u.ass(scene, {
			"opacity":1,
		});
	}
}
u._stepA1 = function() {
	var svg_icon = u.qs("svg", this);
	if(svg_icon) {
		this.removeChild(svg_icon);
	}
	this.innerHTML = this.innerHTML.replace(/[ ]?<br[ \/]?>[ ]?/, " <br /> ");
	this.innerHTML = '<span class="word">'+this.innerHTML.split(" ").join('</span> <span class="word">')+'</span>'; 
	var word_spans = u.qsa("span.word", this);
	var i, span, letters, spanned_word;
	for(i = 0; span = word_spans[i]; i++) {
		if(span.innerHTML.match(/<br[ \/]?>/)) {
			span.parentNode.replaceChild(document.createElement("br"), span);
		}
		else {
			if(span.innerHTML.match(/&[a-zA-Z0-9#]+;/)) {
				letters = span.innerHTML.split("");
				span.innerHTML = "";
				for(j = 0; j < letters.length; j++) {
					if(letters[j] === "&") {
						spanned_word = letters[j];
						while(letters[++j] !== ";") {
							spanned_word += letters[j];
						}
						spanned_word += letters[j];
						span.innerHTML += "<span>" + spanned_word + "</span>";
					}
					else {
						span.innerHTML += "<span>" + letters[j] + "</span>";
					}
				}
			}
			else {
				span.innerHTML = "<span>"+span.innerHTML.split("").join("</span><span>")+"</span>";
			}
		}
	}
	this.spans = u.qsa("span:not(.word)", this);
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
			u.ass(span, {
				"transformOrigin": "0 100% 0",
				"transform":"translate(0, 40px)",
				"opacity":0
			});
		}
		u.ass(this, {
			"opacity":1
		});
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, 0)",
				"opacity":1
			});
			span.transitioned = function(event) {
				u.ass(this, {
					"transform":"none"
				});
			}
		}
	}
	if(svg_icon) {
		this.appendChild(svg_icon);
	}
}
u._stepA2 = function() {
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, -40px)",
				"opacity":0
			});
		}
	}
}
u.txt["share"] = "Share this page";
u.txt["share-info-headline"] = "(How do I share?)";
u.txt["share-info-txt"] = "We have not included social media plugins on this site, because they are frequently abused to collect data about you. Also we don't want to promote some channels over others. Instead, just copy the link and share it wherever you find relevant.";
u.txt["share-info-ok"] = "OK";
u.txt["readmore"] = "Read more ...";
u.txt["readstate-not_read"] = "Click to mark as read";
u.txt["readstate-read"] = "Read";
u.txt["add_comment"] = "Add comment";
u.txt["comment"] = "Comment";
u.txt["add_question"] = "Send question";
u.txt["question"] = "Ask a question. Try to be precise :-)";
u.txt["cancel"] = "Cancel";
u.txt["login_to_comment"] = '<a href="/login">Login</a> or <a href="/signup">Sign up</a> to add comments.';
u.txt["relogin"] = "Your session timed out - please login to continue.";
u.txt["terms-headline"] = "We love <br />cookies and privacy";
u.txt["terms-accept"] = "Accept";
u.txt["terms-details"] = "Details";
u.txt["smartphone-switch-headline"] = "Hello curious";
u.txt["smartphone-switch-text"] = [
	"If you are looking for a mobile version of this site, using an actual mobile phone is a better starting point.",
	"We care about our endusers and <em>one-size fits one device</em>, the parentNode way, provides an optimized user experience with a smaller footprint, because it doesn't come with all sizes included.",
	"But, since it is our mission to accommodate users, feel free to switch to the Smartphone segment and see if it serves your purpose better for the moment. We'll make sure to leave you with an option to return back to the Desktop segment.",
];
u.txt["smartphone-switch-bn-hide"] = "Hide";
u.txt["smartphone-switch-bn-switch"] = "Go to Smartphone version";
u.fontsReady = function(node, fonts, _options) {
	var callback_loaded = "fontsLoaded";
	var callback_timeout = "fontsNotLoaded";
	var max_time = 3000;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"					: callback_loaded		= _options[_argument]; break;
				case "timeout"					: callback_timeout		= _options[_argument]; break;
				case "max"						: max_time				= _options[_argument]; break;
			}
		}
	}
	window["_man_fonts_"] = window["_man_fonts_"] || {};
	window["_man_fonts_"].fontApi = document.fonts && fun(document.fonts.check) ? true : false;
	window["_man_fonts_"].fonts = window["_man_fonts_"].fonts || {};
	var font, node, i;
	if(typeof(fonts.length) == "undefined") {
		font = fonts;
		fonts = new Array();
		fonts.push(font);
	}
	var loadkey = u.randomString(8);
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey] = {};
	}
	else {
		window["_man_fonts_"+loadkey] = u.ae(document.body, "div");
		window["_man_fonts_"+loadkey].basenodes = {};
	}
	window["_man_fonts_"+loadkey].nodes = [];
	window["_man_fonts_"+loadkey].t_timeout = u.t.setTimer(window["_man_fonts_"+loadkey], "fontCheckTimeout", max_time);
	window["_man_fonts_"+loadkey].loadkey = loadkey;
	window["_man_fonts_"+loadkey].callback_node = node;
	window["_man_fonts_"+loadkey].callback_loaded = callback_loaded;
	window["_man_fonts_"+loadkey].callback_timeout = callback_timeout;
	for(i = 0; i < fonts.length; i++) {
		font = fonts[i];
		font.style = font.style || "normal";
		font.weight = font.weight || "400";
		font.size = font.size || "16px";
		font.status = "waiting";
		font.id = u.superNormalize(font.family+font.style+font.weight);
		if(!window["_man_fonts_"].fonts[font.id]) {
			window["_man_fonts_"].fonts[font.id] = font;
		}
		if(window["_man_fonts_"].fontApi) {
			node = {};
		}
		else {
			if(!window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)]) {
				window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)] = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
			}
			node = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: '"+font.family+"', Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
		}
		node.font_size = font.size;
		node.font_family = font.family;
		node.font_weight = font.weight;
		node.font_style = font.style;
		node.font_id = font.id;
		node.loadkey = loadkey;
		window["_man_fonts_"+loadkey].nodes.push(node);
	}
	window["_man_fonts_"+loadkey].checkFontsAPI = function() {
		var i, node, font_string;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id] && window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				font_string = node.font_style + " " + node.font_weight + " " + node.font_size + " " + node.font_family;
				document.fonts.load(font_string).then(function(fontFaceSetEvent) {
					if(fontFaceSetEvent && fontFaceSetEvent.length && fontFaceSetEvent[0].status == "loaded") {
						window["_man_fonts_"].fonts[this.font_id].status = "loaded";
					}
					else {
						window["_man_fonts_"].fonts[this.font_id].status = "failed";
					}
					if(window["_man_fonts_"+this.loadkey] && fun(window["_man_fonts_"+this.loadkey].checkFontsStatus)) {
						window["_man_fonts_"+this.loadkey].checkFontsStatus();
					}
				}.bind(node));
			}
		}
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].checkFontsFallback = function() {
		var basenode, i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			basenode = this.basenodes[u.superNormalize(node.font_style+node.font_weight)];
			if(node.offsetWidth != basenode.offsetWidth || node.offsetHeight != basenode.offsetHeight) {
				window["_man_fonts_"].fonts[node.font_id].status = "loaded";
			}
		}
		this.t_fallback = u.t.setTimer(this, "checkFontsFallback", 30);
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].fontCheckTimeout = function(event) {
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_timeout])) {
			this.callback_node[this.callback_timeout](this.nodes);
		}
		else if(fun(this.callback_node[this.callback_loaded])) {
			this.callback_node[this.callback_loaded](this.nodes);
		}
	}
	window["_man_fonts_"+loadkey].checkFontsStatus = function(event) {
		var i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				return;
			}
		}
		u.t.resetTimer(this.t_timeout);
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_loaded])) {
			if(this.fontApi) {
				this.callback_node[this.callback_loaded](this.nodes);
			}
			else {
				setTimeout(function() {
					this.callback_node[this.callback_loaded](this.nodes); 
				}.bind(this), 250);
			}
		}
	}
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey].checkFontsAPI();
	}
	else {
		window["_man_fonts_"+loadkey].checkFontsFallback();
	}
}
u.notifier = function(node) {
	var notifications = u.qs("div.notifications", node);
	if(!notifications) {
		node.notifications = u.ae(node, "div", {"id":"notifications"});
	}
	node.notifications.hide_delay = 4500;
	node.notifications.hide = function(node) {
		u.a.transition(this, "all 0.5s ease-in-out");
		u.a.translate(this, 0, -this.offsetHeight);
	}
	node.notify = function(response, _options) {
		var class_name = "message";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "class"	: class_name	= _options[argument]; break;
				}
			}
		}
		var output = [];
		if(obj(response) && response.isJSON) {
			var message = response.cms_message;
			var cms_status = typeof(response.cms_status) != "undefined" ? response.cms_status : "";
			if(obj(message)) {
				for(type in message) {
					if(str(message[type])) {
						output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":message[type]}));
					}
					else if(obj(message[type]) && message[type].length) {
						var node, i;
						for(i = 0; i < message[type].length; i++) {
							_message = message[type][i];
							output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":_message}));
						}
					}
				}
			}
			else if(str(message)) {
				output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status, "html":message}));
			}
			if(fun(this.notifications.show)) {
				this.notifications.show();
			}
		}
		else if(obj(response) && response.isHTML) {
			var login = u.qs(".scene.login form", response);
			var messages = u.qsa(".scene div.messages p", response);
			if(login && !u.qs("#login_overlay")) {
				this.autosave_disabled = true;
				if(page.t_autosave) {
					u.t.resetTimer(page.t_autosave);
				}
				var overlay = u.ae(document.body, "div", {"id":"login_overlay"});
				overlay.node = this;
				u.ae(overlay, login);
				u.as(document.body, "overflow", "hidden");
				var relogin = u.ie(login, "h1", {"class":"relogin", "html":(u.txt["relogin"] ? u.txt["relogin"] : "Your session expired")});
				login.overlay = overlay;
				u.ae(login, "input", {"type":"hidden", "name":"ajaxlogin", "value":"true"})
				u.f.init(login);
				login.inputs["username"].focus();
				login.submitted = function() {
					this.response = function(response) {
						if(response.isJSON && response.cms_status == "success") {
							var csrf_token = response.cms_object["csrf-token"];
							var data_vars = u.qsa("[data-csrf-token]", page);
							var input_vars = u.qsa("[name=csrf-token]", page);
							var dom_vars = u.qsa("*", page);
							var i, node;
							for(i = 0; i < data_vars.length; i++) {
								node = data_vars[i];
								node.setAttribute("data-csrf-token", csrf_token);
							}
							for(i = 0; i < input_vars.length; i++) {
								node = input_vars[i];
								node.value = csrf_token;
							}
							for(i = 0; i < dom_vars.length; i++) {
								node = dom_vars[i];
								if(node.csrf_token) {
									node.csrf_token = csrf_token;
								}
							}
							this.overlay.parentNode.removeChild(this.overlay);
							var multiple_overlays = u.qsa("#login_overlay");
							if(multiple_overlays) {
								for(i = 0; i < multiple_overlays.length; i++) {
									overlay = multiple_overlays[i];
									overlay.parentNode.removeChild(overlay);
								}
							}
							u.as(document.body, "overflow", "auto");
							this.overlay.node.autosave_disabled = false;
							if(this.overlay.node._autosave_node && this.overlay.node._autosave_interval) {
								u.t.setTimer(this.overlay.node._autosave_node, "autosave", this.overlay.node._autosave_interval);
							}
						}
						else {
							this.inputs["username"].focus();
							this.inputs["password"].val("");
							var error_message = u.qs(".errormessage", response);
							if(error_message) {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":error_message.innerHTML});
							}
							else {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":"An error occured"});
							}
						}
					}
					u.request(this, this.action, {"method":this.method, "data":this.getData()});
				}
			}
			else if(messages) {
				for(i = 0; i < messages.length; i++) {
					message = messages[i];
					output.push(u.ae(this.notifications, "div", {"class":message.className, "html":message.innerHTML}));
				}
			}
		}
		this.t_notifier = u.t.setTimer(this.notifications, this.notifications.hide, this.notifications.hide_delay, output);
	}
}
u.smartphoneSwitch = new function() {
	this.state = 0;
	this.init = function(node) {
		this.callback_node = node;
		this.event_id = u.e.addWindowEvent(this, "resize", this.resized);
		this.resized();
	}
	this.resized = function() {
		if(u.browserW() < 520 && !this.state) {
			this.switchOn();
		}
		else if(u.browserW() > 520 && this.state) {
			this.switchOff();
		}
	}
	this.switchOn = function() {
		if(!this.panel) {
			this.state = true;
			this.panel = u.ae(document.body, "div", {"id":"smartphone_switch"});
			u.ass(this.panel, {
				opacity: 0
			});
			u.ae(this.panel, "h1", {html:u.stringOr(u.txt("smartphone-switch-headline"), "Hello curious")});
			if(u.txt("smartphone-switch-text").length) {
				for(i = 0; i < u.txt("smartphone-switch-text").length; i++) {
					u.ae(this.panel, "p", {html:u.txt("smartphone-switch-text")[i]});
				}
			}
			var ul_actions = u.ae(this.panel, "ul", {class:"actions"});
			var li; 
			li = u.ae(ul_actions, "li", {class:"hide"});
			var bn_hide = u.ae(li, "a", {class:"hide button", html:u.txt("smartphone-switch-bn-hide")});
			li = u.ae(ul_actions, "li", {class:"switch"});
			var bn_switch = u.ae(li, "a", {class:"switch button primary", html:u.txt("smartphone-switch-bn-switch")});
			u.e.click(bn_switch);
			bn_switch.clicked = function() {
				u.saveCookie("smartphoneSwitch", "on");
				location.href = location.href.replace(/[&]segment\=desktop|segment\=desktop[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=smartphone";
			}
			u.e.click(bn_hide);
			bn_hide.clicked = function() {
				u.e.removeWindowEvent(u.smartphoneSwitch, "resize", u.smartphoneSwitch.event_id);
				u.smartphoneSwitch.switchOff();
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 1
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOn) == "function") {
				this.callback_node.smartphoneSwitchedOn();
			}
		}
	}
	this.switchOff = function() {
		if(this.panel) {
			this.state = false;
			this.panel.transitioned = function() {
				this.parentNode.removeChild(this);
				delete u.smartphoneSwitch.panel;
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 0
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOff) == "function") {
				this.callback_node.smartphoneSwitchedOff();
			}
		}
	}
}
Util.Modules["page"] = new function() {
	this.init = function(page) {
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		if(document.domain !== "parentnode.dk") {
			u.bug("Visit https://parentnode.dk for more information");
		}
		u.bug_force = false;
		page.style_tag = document.createElement("style");
		page.style_tag.setAttribute("media", "all");
		page.style_tag.setAttribute("type", "text/css");
		page.style_tag = u.ae(document.head, page.style_tag);
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);
		page.resized = function(event) {
			page.browser_h = u.browserH();
			page.browser_w = u.browserW();
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;
			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}
			if(page.browser_w > 1080) {
				u.ac(page, "fixed");
			}
			else {
				u.rc(page, "fixed");
			}
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized(event);
			}
			page.offsetHeight;
		}
		page.scrolled = function(event) {
			this.scrolled_y = u.scrollY();
			if(fun(u.logoScroller)) {
				u.logoScroller();
			}
			else {
				if(this.scrolled_y < this.logo.top_offset) {
					this.logo.is_reduced = false;
					var reduce_font = (1-(this.logo.top_offset-this.scrolled_y)/this.logo.top_offset) * this.logo.font_size_gap;
					this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-reduce_font)+"px", "important");
				}
				else if(!this.logo.is_reduced) {
					this.logo.is_reduced = true;
					this.logo.css_rule.style.setProperty("font-size", (this.logo.font_size-this.logo.font_size_gap)+"px", "important");
				}
			}
			if(this.nN.top_offset && this.scrolled_y < this.nN.top_offset) {
				this.nN.is_reduced = false;
				var factor = (1-(this.nN.top_offset-this.scrolled_y)/this.nN.top_offset);
				var reduce_font = factor * this.nN.font_size_gap;
				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-reduce_font)+"px", "important");
				var reduce_top = factor * this.nN.top_offset_gap;
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-reduce_top)+"px", "important");
			}
			else if(this.nN.top_offset && !this.nN.is_reduced) {
				this.nN.is_reduced = true;
				this.nN.list.css_rule.style.setProperty("font-size", (this.nN.font_size-this.nN.font_size_gap)+"px", "important");
				this.nN.css_rule.style.setProperty("top", (this.nN.top_offset-this.nN.top_offset_gap)+"px", "important");
			}
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled(event);
			}
		}
		page.preload = function() {
			if(fun(u.pagePreloader)) {
				u.pagePreloader();
			}
			else {
				u.fontsReady(this, [
					{"family":"OpenSans", "weight":"normal", "style":"normal"},
					{"family":"OpenSans", "weight":"bold", "style":"normal"},
					{"family":"OpenSans", "weight":"normal", "style":"italic"},
					{"family":"PT Serif", "weight":"normal", "style":"normal"}
				], {"callback": "ready"});
			}
		}
		page.ready = function() {
			if(!this.is_ready) {
				this.is_ready = true;
				u.e.addWindowEvent(this, "resize", this.resized);
				u.e.addWindowEvent(this, "scroll", this.scrolled);
				if(fun(u.notifier)) {
					u.notifier(this);
				}
				if(obj(u.smartphoneSwitch)) {
					u.smartphoneSwitch.init(this);
				}
				if(fun(u.navigation)) {
					u.navigation();
				}
				this.initHeader();
				this.initNavigation();
				this.initFooter();
				this.resized();
				this.scrolled();
				if(!fun(this.cN.scene.revealPage)) {
					this.revealPage();
				}
				this.cN.scene.ready();
			}
		}
		page.cN.navigate = function(url, raw_url) {
			if(raw_url) {
				location.reload(true);
			}
			else {
				location.href = url;
			}
		}
		page.acceptCookies = function() {
			if(u.terms_version && !u.getCookie(u.terms_version)) {
				var terms_link = u.qs("li.terms a");
				if(terms_link && terms_link.href) {
					var terms = u.ie(document.body, "div", {"class":"terms_notification"});
					u.ae(terms, "h3", {"html":u.stringOr(u.txt["terms-headline"], "We love <br />cookies and privacy")});
					var bn_accept = u.ae(terms, "a", {"class":"accept", "html":u.stringOr(u.txt["terms-accept"], "Accept")});
					bn_accept.terms = terms;
					u.ce(bn_accept);
					bn_accept.clicked = function() {
						this.terms.parentNode.removeChild(this.terms);
						u.saveCookie(u.terms_version, true, {"path":"/", "expires":false});
					}
					if(!location.href.match(terms_link.href)) {
						var bn_details = u.ae(terms, "a", {"class":"details", "html":u.stringOr(u.txt["terms-details"], "Details"), "href":terms_link.href});
						u.ce(bn_details, {"type":"link"});
					}
					u.a.transition(terms, "all 0.5s ease-in");
					u.ass(terms, {
						"opacity": 1
					});
				}
			}
		}
		page.initHeader = function() {
			page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
			page.logo.url = '/';
			page.logo.font_size = parseInt(u.gcs(page.logo, "font-size"));
			page.logo.font_size_gap = page.logo.font_size-14;
			page.logo.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
			page.style_tag.sheet.insertRule("#header a.logo {}", 0);
			page.logo.css_rule = page.style_tag.sheet.cssRules[0];
		}
		page.initNavigation = function() {
			var i, node, nodes;
			page.nN.list = u.qs("ul", page.nN);
			if(page.nN.list) {
				page.nN.list.nodes = u.qsa("li", page.nN.list);
				if(page.nN.list.nodes.length > 1) {
					page.nN.font_size = parseInt(u.gcs(page.nN.list.nodes[1], "font-size"));
					page.nN.font_size_gap = page.nN.font_size-14;
					page.nN.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
					page.nN.top_offset_gap = page.nN.top_offset-10;
					page.style_tag.sheet.insertRule("#navigation {}", 0);
					page.nN.css_rule = page.style_tag.sheet.cssRules[0];
					page.style_tag.sheet.insertRule("#navigation ul li {}", 0);
					page.nN.list.css_rule = page.style_tag.sheet.cssRules[0];
				}
			}
			nodes = u.qsa("#navigation li,a.logo", page.hN);
			for(i = 0; node = nodes[i]; i++) {
				u.ce(node, {"type":"link"});
				u.e.hover(node);
				node.over = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							this.transitioned = function() {
								u.a.transition(this, "none");
							}
							u.a.transition(this, "all 0.1s ease-in-out");
							u.a.scale(this, 1.2);
						}
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}
					if(this._scale != 1.22) {
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.22);
					}
					else {
						this.transitioned();
					}
				}
				node.out = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							u.a.transition(this, "none");
						}
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 1);
					}
					if(this._scale != 0.8) {
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 0.8);
					}
					else {
						this.transitioned();
					}
				}
			}
			if(page.hN.service) {
				var nav_anchor = u.qs("li.navigation", page.hN.service);
				if(nav_anchor) {
					page.hN.service.removeChild(nav_anchor);
				}
			}
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ie(page.hN.service, node);
				}
				page.fN.removeChild(page.fN.service);
			}
			if(u.github_fork) {
				var github = u.ae(page.hN.service, "li", {"html":'<a href="'+u.github_fork.url+'">'+u.github_fork.text+'</a>', "class":"github"});
				u.ce(github, {"type":"link"});
			}
			if(fun(u.logoInjected)) {
				u.logoInjected();
			}
		}
		page.initFooter = function() {}
		page.revealPage = function() {
			u.a.transition(page.hN, "all 0.3s ease-in");
			u.ass(page.hN, {
				"opacity":1
			});
			u.a.transition(page.nN, "all 0.3s ease-in");
			u.ass(page.nN, {
				"opacity":1
			});
			u.a.transition(page.fN, "all 0.3s ease-in");
			u.ass(page.fN, {
				"opacity":1
			});
			this.acceptCookies();
		}
		page.preload();
	}
}
u.e.addDOMReadyEvent(u.init);
Util.Modules["login"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this._form = u.qs("form", this);
			u.f.init(this._form);
			this._form.inputs["username"].focus();
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["scene"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["article"] = new function() {
	this.init = function(article) {
		article.csrf_token = article.getAttribute("data-csrf-token");
		article.header = u.qs("h1,h2,h3", article);
		article.header.article = article;
		var i, image;
		article._images = u.qsa("div.image,div.media", article);
		for(i = 0; image = article._images[i]; i++) {
			image.node = article;
			image.caption = u.qs("p a", image);
			if(image.caption) {
				image.caption.removeAttribute("href");
			}
			image._id = u.cv(image, "item_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");
			if(image._id && image._format) {
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
				u.ass(image, {
					"opacity": 0
				});
				image.loaded = function(queue) {
					u.ac(this, "loaded");
					this._image = u.ie(this, "img");
					this._image.image = this;
					this._image.src = queue[0].image.src;
					if(this.node.article_list) {
						this.node.article_list.correctScroll(this);
					}
					u.ce(this._image);
					this._image.clicked = function() {
						if(u.hc(this.image, "fullsize")) {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.rc(this.image, "fullsize");
							u.ass(this, {
								width: "540px"
							});
							this.src = this.image._image_src;
						}
						else {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.ac(this.image, "fullsize");
							u.ass(this, {
								width: (page.browser_w < 1080 ? page.browser_w : 1080) + "px"
							});
							if(this._fullsize_src) {
								u.bug("this._fullsize_src:", this._fullsize_src);
								this.src = this._fullsize_src;
							}
							else {
								this._fullsize_width = 1080;
								this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
								this.response = function() {
									this.src = this._fullsize_src;
								}
								this.responseError = function() {
									u.bug("error")
									this._fullsize_width = this._fullsize_width-200;
									this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									u.request(this, this._fullsize_src);
								}
								u.request(this, this._fullsize_src);
							}
						}
					}
					u.a.transition(this, "all 0.5s ease-in-out");
					u.ass(this, {
						"opacity": 1
					});
				}
				u.preloader(image, [image._image_src]);
			}
		}
		var video;
		article._videos = u.qsa("div.youtube, div.vimeo", article);
		for (i = 0; video = article._videos[i]; i++) {
			video._src = u.cv(video, "video_id");
			video._type = video._src.match(/youtube|youtu\.be/) ? "youtube" : "vimeo";
			if (video._type == "youtube") {
				video._id = video._src.match(/watch\?v\=/) ? video._src.split("?v=")[1] : video._src.split("/")[video._src.split("/").length-1];
				video.iframe = u.ae(video, "iframe", {
					src: 'https://www.youtube.com/embed/'+video._id+'?autoplay=false&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1',
					id: "ytplayer",
					type: "text/html",
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					allow: "autoplay",
					sandbox:"allow-same-origin allow-scripts",
					width: "100%",
					height: 540 / 1.7777,
				});
			}
			else {
				video._id = video._src.split("/")[video._src.split("/").length-1];
				video.iframe = u.ae(video, "iframe", {
					src: 'https://player.vimeo.com/video/'+video._id+'?autoplay=false&loop=0&byline=0&portrait=0',
					webkitallowfullscreen: true,
					mozallowfullscreen: true,
					allowfullscreen: true,
					frameborder: 0,
					sandbox:"allow-same-origin allow-scripts",
					width: "100%",
					height: 540 / 1.7777,
				});
			}
		}
		article.geolocation = u.qs("ul.geo", article);
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {
			u.injectGeolocation(article);
		}
		var hardlink = u.qs("li.main_entity.share", article);
		article.hardlink = hardlink ? (hardlink.hasAttribute("content") ? hardlink.getAttribute("content") : hardlink.innerHTML) : false;
		if(article.hardlink && typeof(u.injectSharing) == "function") {
			article.shareInjected = function() {
				if(this.article_list) {
					this.article_list.correctScroll(this, this.sharing);
				}
			}
			u.injectSharing(article);
		}
		article.header.current_readstate = article.getAttribute("data-readstate");
		article.add_readstate_url = article.getAttribute("data-readstate-add");
		article.delete_readstate_url = article.getAttribute("data-readstate-delete");
		if(article.header.current_readstate || (article.add_readstate_url && article.delete_readstate_url)) {
			u.addCheckmark(article.header);
			u.ce(article.header.checkmark);
			article.header.checkmark.clicked = function(event) {
				this.out(event);
				if(this.node.current_readstate) {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark not_read");
							this.node.current_readstate = false;
							this.node.article.setAttribute("data-readstate", "");
							this.hint_txt = u.txt["readstate-not_read"];
						}
					}
					u.request(this, this.node.article.delete_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token+"&item_id"});
				}
				else {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark read");
							this.node.current_readstate = new Date();
							this.node.article.setAttribute("data-readstate", this.node.current_readstate);
							this.hint_txt = u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", this.node.current_readstate);
						}
					}
					u.request(this, this.node.article.add_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token});
				}
			}
		}
	}
}
u.injectGeolocation = function(node) {
	if(!u.browser("IE", "<=9")) {
		node.geolocation.node = node;
		var li_longitude = u.qs("li.longitude", node.geolocation);
		var li_latitude = u.qs("li.latitude", node.geolocation);
		if(li_longitude && li_latitude) {
			node.geo_longitude = parseFloat(li_longitude.getAttribute("content"));
			node.geo_latitude = parseFloat(li_latitude.getAttribute("content"));
			node.showMap = function() {
				if(!this.geomap) {
					this.geomap = u.ae(this, "div", {"class":"geomap"});
					this.insertBefore(this.geomap, u.qs("ul.info", this));
					var maps_url = "https://maps.googleapis.com/maps/api/js" + (u.gapi_key ? "?key="+u.gapi_key : "");
					var html = '<html><head>';
					html += '<style type="text/css">body {margin: 0;}#map {height: 300px;}</style>';
					html += '<script type="text/javascript" src="'+maps_url+'"></script>';
					html += '<script type="text/javascript">';
					html += 'var map, marker;';
					html += 'var initialize = function() {';
					html += '	window._map_loaded = true;';
					html += '	var mapOptions = {center: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'),zoom: 12};';
					html += '	map = new google.maps.Map(document.getElementById("map"),mapOptions);';
					html += '	marker = new google.maps.Marker({position: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'), draggable:true});';
					html += '	marker.setMap(map);';
					html += '};';
					html += 'google.maps.event.addDomListener(window, "load", initialize);';
					html += '</script>';
					html += '</head><body><div id="map"></div></body></html>';
					this.mapsiframe = u.ae(this.geomap, "iframe");
					this.mapsiframe.doc = this.mapsiframe.contentDocument? this.mapsiframe.contentDocument: this.mapsiframe.contentWindow.document;
					this.mapsiframe.doc.open();
					this.mapsiframe.doc.write(html);
					this.mapsiframe.doc.close();
				}
			}
			node.geolocation.clicked = function() {
				this.node.showMap();
			}
			u.ce(node.geolocation);
			u.ac(node.geolocation, "active");
		}
	}
}
u.addCheckmark = function(node) {
	node.checkmark = u.svg({
		"name":"checkmark",
		"node":node,
		"class":"checkmark "+(node.current_readstate ? "read" : "not_read"),
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
	node.checkmark.hint_txt = (node.current_readstate ? (u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", node.current_readstate)) : u.txt["readstate-not_read"]),
	node.checkmark.node = node;
	u.e.hover(node.checkmark);
	node.checkmark.over = function(event) {
		this.hint = u.ae(document.body, "div", {"class":"hint", "html":this.hint_txt});
		u.ass(this.hint, {
			"top":(u.absY(this.parentNode)+parseInt(u.gcs(this, "top"))+(Number(this.getAttribute("height")))) + "px",
			"left":(u.absX(this.parentNode)+parseInt(u.gcs(this, "left"))+Number(this.getAttribute("width"))) + "px"
		});
	}
	node.checkmark.out = function(event) {
		if(this.hint) {
			this.hint.parentNode.removeChild(this.hint);
			delete this.hint;
		}
	}
}
u.removeCheckmark = function(node) {
	if(node.checkmark.hint) {
		node.checkmark.hint.parentNode.removeChild(node.checkmark.hint);
	}
	if(node.checkmark) {
		node.checkmark.parentNode.removeChild(node.checkmark);
		node.checkmark = false;
	}
}


/*u-settings.js*/
u.site_name = "think.dk";
u.terms_version = "terms_v1";
u.ga_account = 'UA-10756281-1';
u.ga_domain = 'think.dk';
u.gapi_key = "AIzaSyAVqnYpqFln-qAYsp5rkEGs84mrhmGQB_I";
u.txt["login_to_comment"] = '<a href="/login">Login</a> or <a href="/memberships">Join us</a> to add comments.';
u.txt["weekday-1"] = "Monday";
u.txt["weekday-2"] = "Tuesday";
u.txt["weekday-3"] = "Wednesday";
u.txt["weekday-4"] = "Thursday";
u.txt["weekday-5"] = "Friday";
u.txt["weekday-6"] = "Saturday";
u.txt["weekday-7"] = "Sunday";
u.txt["weekday-1-abbr"] = "Mon";
u.txt["weekday-2-abbr"] = "Tue";
u.txt["weekday-3-abbr"] = "Wed";
u.txt["weekday-4-abbr"] = "Thu";
u.txt["weekday-5-abbr"] = "Fri";
u.txt["weekday-6-abbr"] = "Sat";
u.txt["weekday-7-abbr"] = "Sun";
u.txt["month-1"] = "January";
u.txt["month-2"] = "February";
u.txt["month-3"] = "Marts";
u.txt["month-4"] = "April";
u.txt["month-5"] = "May";
u.txt["month-6"] = "June";
u.txt["month-7"] = "July";
u.txt["month-8"] = "August";
u.txt["month-9"] = "September";
u.txt["month-10"] = "October";
u.txt["month-11"] = "November";
u.txt["month-12"] = "December";


/*u-googleanalytics.js*/
if(u.ga_account) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.defer=true;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', u.ga_account, u.ga_domain);
    ga('send', 'pageview');
	u.stats = new function() {
		this.pageView = function(url) {
			ga('send', 'pageview', url);
		}
		this.event = function(node, _options) {
			var event = false;
			var eventCategory = "Uncategorized";
			var eventAction = null;
			var eventLabel = null;
			var eventValue = null;
			var nonInteraction = false;
			var hitCallback = null;
			if(obj(_options)) {
				var _argument;
				for(_argument in _options) {
					switch(_argument) {
						case "event"				: event					= _options[_argument]; break;
						case "eventCategory"		: eventCategory			= _options[_argument]; break;
						case "eventAction"			: eventAction			= _options[_argument]; break;
						case "eventLabel"			: eventLabel			= _options[_argument]; break;
						case "eventValue"			: eventValue			= _options[_argument]; break;
						case "nonInteraction"		: nonInteraction		= _options[_argument]; break;
						case "hitCallback"			: hitCallback			= _options[_argument]; break;
					}
				}
			}
			if(!eventAction && event && event.type) {
				eventAction = event.type;
			}
			else if(!eventAction) {
				eventAction = "Unknown";
			}
			if(!eventLabel && event && event.currentTarget && event.currentTarget.url) {
				eventLabel = event.currentTarget.url;
			}
			else if(!eventLabel) {
				eventLabel = this.nodeSnippet(node);
			}
			ga('send', 'event', {
				"eventCategory": eventCategory, 
				"eventAction": eventAction,
				"eventLabel": eventLabel,
				"eventValue": eventValue,
				"nonInteraction": nonInteraction,
				"hitCallback": hitCallback
			});
		}
		// 	
		// 	//       slot,		
		// 	//       name,		
		// 	//       value,	
		// 	//       scope		
		// 	
		this.nodeSnippet = function(node) {
			return u.cutString(u.text(node).trim(), 20) + "(<"+node.nodeName+">)";
		}
	}
}


/*u-media.js*/
Util.audioPlayer = function(_options) {
	_options = _options || {};
	_options.type = "audio";
	return u.mediaPlayer(_options);
}
Util.videoPlayer = function(_options) {
	_options = _options || {};
	_options.type = "video";
	return u.mediaPlayer(_options);
}
Util.mediaPlayer = function(_options) {
	var player = document.createElement("div");
	player.type = _options && _options.type || "video";
	u.ac(player, player.type+"player");
	player._autoplay = false;
	player._muted = false;
	player._loop = false;
	player._playsinline = false;
	player._crossorigin = "anonymous";
	player._controls = false;
	player._controls_playpause = false;
	player._controls_play = false;
	player._controls_pause = false;
	player._controls_stop = false;
	player._controls_zoom = false;
	player._controls_volume = false;
	player._controls_search = false;
	player._ff_skip = 2;
	player._rw_skip = 2;
	player.media = u.ae(player, player.type);
	if(player.media && fun(player.media.play)) {
		player.load = function(src, _options) {
			if(u.hc(this, "playing")) {
				this.stop();
			}
			u.setupMedia(this, _options);
			if(src) {
				this.media.src = u.correctMediaSource(this, src);
				this.media.load();
			}
		}
		player.play = function(position) {
			if(this.media.currentTime && position !== undefined) {
				this.media.currentTime = position;
			}
			if(this.media.src) {
				return this.media.play();
			}
		}
		player.loadAndPlay = function(src, _options) {
			var position = 0;
			if(obj(_options)) {
				var _argument;
				for(_argument in _options) {
					switch(_argument) {
						case "position"		: position		= _options[_argument]; break;
					}
				}
			}
			this.load(src, _options);
			return this.play(position);
		}
		player.pause = function() {
			this.media.pause();
		}
		player.stop = function() {
			this.media.pause();
			if(this.media.currentTime) {
				this.media.currentTime = 0;
			}
		}
		player.ff = function() {
			if(this.media.src && this.media.currentTime && this.mediaLoaded) {
				this.media.currentTime = (this.media.duration - this.media.currentTime >= this._ff_skip) ? (this.media.currentTime + this._ff_skip) : this.media.duration;
				this.media._timeupdate();
			}
		}
		player.rw = function() {
			if(this.media.src && this.media.currentTime && this.mediaLoaded) {
				this.media.currentTime = (this.media.currentTime >= this._rw_skip) ? (this.media.currentTime - this._rw_skip) : 0;
				this.media._timeupdate();
			}
		}
		player.togglePlay = function() {
			if(u.hc(this, "playing")) {
				this.pause();
			}
			else {
				this.play();
			}
		}
		player.volume = function(value) {
			this.media.volume = value;
			if(value === 0) {
				u.ac(this, "muted");
			}
			else {
				u.rc(this, "muted");
			}
		}
		player.toggleSound = function() {
			if(this.media.volume) {
				this.media.volume = 0;
				u.ac(this, "muted");
			}
			else {
				this.media.volume = 1;
				u.rc(this, "muted");
			}
		}
		player.mute = function() {
			this.media.muted = true;
		}
		player.unmute = function() {
			this.media.removeAttribute(muted);
		}
	}
	else {
		player.load = function() {}
		player.play = function() {}
		player.loadAndPlay = function() {}
		player.pause = function() {}
		player.stop = function() {}
		player.ff = function() {}
		player.rw = function() {}
		player.togglePlay = function() {}
	}
	u.setupMedia(player, _options);
	u.detectMediaAutoplay(player);
	return player;
}
u.setupMedia = function(player, _options) {
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "autoplay"     : player._autoplay               = _options[_argument]; break;
				case "muted"        : player._muted                  = _options[_argument]; break;
				case "loop"         : player._loop                   = _options[_argument]; break;
				case "playsinline"  : player._playsinline            = _options[_argument]; break;
				case "controls"     : player._controls               = _options[_argument]; break;
				case "ff_skip"      : player._ff_skip                = _options[_argument]; break;
				case "rw_skip"      : player._rw_skip                = _options[_argument]; break;
			}
		}
	}
	player.media.autoplay = player._autoplay;
	player.media.loop = player._loop;
	player.media.muted = player._muted;
	player.media.playsinline = player._playsinline;
	player.media.setAttribute("playsinline", player._playsinline);
	player.media.setAttribute("crossorigin", player._crossorigin);
	u.setupMediaControls(player, player._controls);
	player.currentTime = 0;
	player.duration = 0;
	player.mediaLoaded = false;
	player.metaLoaded = false;
	if(!player.media.player) {
		player.media.player = player;
		player.media._loadstart = function(event) {
			u.ac(this.player, "loading");
			if(fun(this.player.loading)) {
				this.player.loading(event);
			}
		}
		u.e.addEvent(player.media, "loadstart", player.media._loadstart);
		player.media._canplaythrough = function(event) {
			u.rc(this.player, "loading");
			if(fun(this.player.canplaythrough)) {
				this.player.canplaythrough(event);
			}
		}
		u.e.addEvent(player.media, "canplaythrough", player.media._canplaythrough);
		player.media._playing = function(event) {
			u.rc(this.player, "loading|paused");
			u.ac(this.player, "playing");
			if(fun(this.player.playing)) {
				this.player.playing(event);
			}
		}
		u.e.addEvent(player.media, "playing", player.media._playing);
		player.media._paused = function(event) {
			u.rc(this.player, "playing|loading");
			u.ac(this.player, "paused");
			if(fun(this.player.paused)) {
				this.player.paused(event);
			}
		}
		u.e.addEvent(player.media, "pause", player.media._paused);
		player.media._stalled = function(event) {
			u.rc(this.player, "playing|paused");
			u.ac(this.player, "loading");
			if(fun(this.player.stalled)) {
				this.player.stalled(event);
			}
		}
		u.e.addEvent(player.media, "stalled", player.media._paused);
		player.media._error = function(event) {
			if(fun(this.player.error)) {
				this.player.error(event);
			}
		}
		u.e.addEvent(player.media, "error", player.media._error);
		player.media._ended = function(event) {
			u.rc(this.player, "playing|paused");
			if(fun(this.player.ended)) {
				this.player.ended(event);
			}
		}
		u.e.addEvent(player.media, "ended", player.media._ended);
		player.media._loadedmetadata = function(event) {
			this.player.duration = this.duration;
			this.player.currentTime = this.currentTime;
			this.player.metaLoaded = true;
			if(fun(this.player.loadedmetadata)) {
				this.player.loadedmetadata(event);
			}
		}
		u.e.addEvent(player.media, "loadedmetadata", player.media._loadedmetadata);
		player.media._loadeddata = function(event) {
			this.player.mediaLoaded = true;
			if(fun(this.player.loadeddata)) {
				this.player.loadeddata(event);
			}
		}
		u.e.addEvent(player.media, "loadeddata", player.media._loadeddata);
		player.media._timeupdate = function(event) {
			this.player.currentTime = this.currentTime;
			if(fun(this.player.timeupdate)) {
				this.player.timeupdate(event);
			}
		}
		u.e.addEvent(player.media, "timeupdate", player.media._timeupdate);
	}
}
u.correctMediaSource = function(player, src) {
	var param = src.match(/\?[^$]+/) ? src.match(/(\?[^$]+)/)[1] : "";
	src = src.replace(/\?[^$]+/, "");
	if(player.type == "video") {
		src = src.replace(/(\.m4v|\.mp4|\.webm|\.ogv|\.3gp|\.mov)$/, "");
		if(player.flash) {
			return src+".mp4"+param;
		}
		else if(player.media.canPlayType("video/mp4")) {
			return src+".mp4"+param;
		}
		else if(player.media.canPlayType("video/ogg")) {
			return src+".ogv"+param;
		}
		else if(player.media.canPlayType("video/3gpp")) {
			return src+".3gp"+param;
		}
		else {
			return src+".mov"+param;
		}
	}
	else {
		src = src.replace(/(.mp3|.ogg|.wav)$/, "");
		if(player.flash) {
			return src+".mp3"+param;
		}
		if(player.media.canPlayType("audio/mpeg")) {
			return src+".mp3"+param;
		}
		else if(player.media.canPlayType("audio/ogg")) {
			return src+".ogg"+param;
		}
		else {
			return src+".wav"+param;
		}
	}
}
u.setupMediaControls = function(player, _options) {
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "playpause"    : player._controls_playpause     = _options[_argument]; break;
				case "play"         : player._controls_play          = _options[_argument]; break;
				case "stop"         : player._controls_stop          = _options[_argument]; break;
				case "pause"        : player._controls_pause         = _options[_argument]; break;
				case "volume"       : player._controls_volume        = _options[_argument]; break;
				case "search"       : player._controls_search        = _options[_argument]; break;
			}
		}
	}
	player._custom_controls = obj(_options) && (
		player._controls_playpause ||
		player._controls_play ||
		player._controls_stop ||
		player._controls_pause ||
		player._controls_volume ||
		player._controls_search
	) || false;
	if(player._custom_controls || !_options) {
		player.media.removeAttribute("controls");
	}
	else {
		player.media.controls = player._controls;
	}
	if(!player._custom_controls && player.controls) {
		player.removeChild(player.controls);
		delete player.controls;
	}
	else if(player._custom_controls) {
		if(!player.controls) {
			player.controls = u.ae(player, "div", {"class":"controls"});
			player.controls.player = player;
			player.controls.out = function() {
				u.a.transition(this, "all 0.3s ease-out");
				u.ass(this, {
					"opacity":0
				});
			}
			player.controls.over = function() {
				u.a.transition(this, "all 0.5s ease-out");
				u.ass(this, {
					"opacity":1
				});
			}
			u.e.hover(player.controls);
		}
		if(player._controls_playpause) {
			if(!player.controls.playpause) {
				player.controls.playpause = u.ae(player.controls, "a", {"class":"playpause"});
				player.controls.playpause.player = player;
				u.e.click(player.controls.playpause);
				player.controls.playpause.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.playpause) {
			player.controls.playpause.parentNode.removeChild(player.controls.playpause);
			delete player.controls.playpause;
		}
		if(player._controls_play) {
			if(!player.controls.play) {
				player.controls.play = u.ae(player.controls, "a", {"class":"play"});
				player.controls.play.player = player;
				u.e.click(player.controls.play);
				player.controls.play.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.play) {
			player.controls.play.parentNode.removeChild(player.controls.play);
			delete player.controls.play;
		}
		if(player._controls_pause) {
			if(!player.controls.pause) {
				player.controls.pause = u.ae(player.controls, "a", {"class":"pause"});
				player.controls.pause.player = player;
				u.e.click(player.controls.pause);
				player.controls.pause.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.pause) {
			player.controls.pause.parentNode.removeChild(player.controls.pause);
			delete player.controls.pause;
		}
		if(player._controls_stop) {
			if(!player.controls.stop) {
				player.controls.stop = u.ae(player.controls, "a", {"class":"stop" });
				player.controls.stop.player = player;
				u.e.click(player.controls.stop);
				player.controls.stop.clicked = function(event) {
					this.player.stop();
				}
			}
		}
		else if(player.controls.stop) {
			player.controls.stop.parentNode.removeChild(player.controls.stop);
			delete player.controls.stop;
		}
		if(player._controls_search) {
			if(!player.controls.search) {
				player.controls.search_ff = u.ae(player.controls, "a", {"class":"ff"});
				player.controls.search_ff._default_display = u.gcs(player.controls.search_ff, "display");
				player.controls.search_ff.player = player;
				player.controls.search_rw = u.ae(player.controls, "a", {"class":"rw"});
				player.controls.search_rw._default_display = u.gcs(player.controls.search_rw, "display");
				player.controls.search_rw.player = player;
				u.e.click(player.controls.search_ff);
				player.controls.search_ff.ffing = function() {
					this.t_ffing = u.t.setTimer(this, this.ffing, 100);
					this.player.ff();
				}
				player.controls.search_ff.inputStarted = function(event) {
					this.ffing();
				}
				player.controls.search_ff.clicked = function(event) {
					u.t.resetTimer(this.t_ffing);
				}
				u.e.click(player.controls.search_rw);
				player.controls.search_rw.rwing = function() {
					this.t_rwing = u.t.setTimer(this, this.rwing, 100);
					this.player.rw();
				}
				player.controls.search_rw.inputStarted = function(event) {
					this.rwing();
				}
				player.controls.search_rw.clicked = function(event) {
					u.t.resetTimer(this.t_rwing);
					this.player.rw();
				}
				player.controls.search = true;
			}
			else {
				u.as(player.controls.search_ff, "display", player.controls.search_ff._default_display);
				u.as(player.controls.search_rw, "display", player.controls.search_rw._default_display);
			}
		}
		else if(player.controls.search) {
			u.as(player.controls.search_ff, "display", "none");
			u.as(player.controls.search_rw, "display", "none");
		}
		if(player._controls_zoom && !player.controls.zoom) {}
		else if(player.controls.zoom) {}
		if(player._controls_volume && !player.controls.volume) {}
		else if(player.controls.volume) {}
		// 
	}
}
u.detectMediaAutoplay = function(player) {
	if(!u.media_autoplay_detection) {
		u.media_autoplay_detection = [player];
		u.test_autoplay = document.createElement("video");
		u.test_autoplay.check = function() {
			if(u.media_can_autoplay !== undefined && u.media_can_autoplay_muted !== undefined) {
				for(var i = 0, player; i < u.media_autoplay_detection.length; i++) {
					player = u.media_autoplay_detection[i];
					player.can_autoplay = u.media_can_autoplay;
					player.can_autoplay_muted = u.media_can_autoplay_muted;
					if(fun(player.ready)) {
						player.ready();
					}
				}
				u.media_autoplay_detection = true;
				u.test_autoplay.pause();
				delete u.test_autoplay;
			}
		}
		u.test_autoplay.playing = function(event) {
			u.media_can_autoplay = true;
			u.media_can_autoplay_muted = true;
			this.check();
		}
		u.test_autoplay.notplaying = function() {
			u.media_can_autoplay = false;
			u.test_autoplay.muted = true;
			var promise = u.test_autoplay.play();
			if(promise && fun(promise.then)) {
				promise.then(
					function(){
						if(u.test_autoplay) {
							u.t.resetTimer(window.u.test_autoplay.t_check);
							u.test_autoplay.playing_muted();
						}
					}
				).catch(
					function() {
						if(u.test_autoplay) {
							u.t.resetTimer(window.u.test_autoplay.t_check)
							u.test_autoplay.notplaying_muted();
						}
					}
				);
				u.test_autoplay.t_check = u.t.setTimer(u.test_autoplay, function(){
					u.test_autoplay.pause();
				}, 1000);
			}
		}
		u.test_autoplay.playing_muted = function() {
			u.media_can_autoplay_muted = true;
			this.check();
		}
		u.test_autoplay.notplaying_muted = function() {
			u.media_can_autoplay_muted = false;
			this.check();
		}
		u.test_autoplay.error = function(event) {
			u.media_can_autoplay = false;
			u.media_can_autoplay_muted = false;
			this.check();
		}
		u.e.addEvent(u.test_autoplay, "playing", u.test_autoplay.playing);
		u.e.addEvent(u.test_autoplay, "error", u.test_autoplay.error);
		if(u.test_autoplay.canPlayType("video/mp4")) {
			var data = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAxJtZGF0AAACoAYF//+c3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NyAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTggLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAABpliIQAM//+9uy+BTYUyFCXESoMDuxA1w9RcQAAAAlBmiJsQr/+RRgAAAAIAZ5BeQr/IeHeAgBMYXZjNTguMzUuMTAwAEIgCMEYOCEQBGCMHCEQBGCMHCEQBGCMHCEQBGCMHAAABXNtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAeAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAACb3RyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAMAAAADAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAHgAAAQAAAEAAAAAAedtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAADIAAAAGAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAGSbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABUnN0YmwAAACmc3RzZAAAAAAAAAABAAAAlmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAMAAwAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAwYXZjQwFkAAr/4QAXZ2QACqzZTewEQAAAAwBAAAAMg8SJZYABAAZo6+PLIsAAAAAQcGFzcAAAAAEAAAABAAAAGHN0dHMAAAAAAAAAAQAAAAMAAAIAAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAoY3R0cwAAAAAAAAADAAAAAQAABAAAAAABAAAGAAAAAAEAAAIAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAADAAAAAQAAACBzdHN6AAAAAAAAAAAAAAADAAACwgAAAA0AAAAMAAAAFHN0Y28AAAAAAAAAAQAAADAAAAIudHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAgAAAAAAAAB1AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAAdQAAAAAAAQAAAAABpm1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAArEQAABQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAVFtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAARVzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAAAEX4AAAymBYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAAFAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAABQAAAAEAAAAoc3RzegAAAAAAAAAAAAAABQAAABcAAAAGAAAABgAAAAYAAAAGAAAAFHN0Y28AAAAAAAAAAQAAAwsAAAAac2dwZAEAAAByb2xsAAAAAgAAAAH//wAAABxzYmdwAAAAAHJvbGwAAAABAAAABQAAAAEAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU4LjIwLjEwMA==";
			u.test_autoplay.volume = 0.01;
			u.test_autoplay.autoplay = true;
			u.test_autoplay.playsinline = true;
			u.test_autoplay.setAttribute("playsinline", true);
			u.test_autoplay.src = data;
			var promise = u.test_autoplay.play();
			if(promise && fun(promise.then)) {
				u.e.removeEvent(u.test_autoplay, "playing", u.test_autoplay.playing);
				u.e.removeEvent(u.test_autoplay, "error", u.test_autoplay.error);
				promise.then(
					u.test_autoplay.playing.bind(u.test_autoplay)
				).catch(
					u.test_autoplay.notplaying.bind(u.test_autoplay)
				);
			}
		}
		else {
			u.media_can_autoplay = true;
			u.media_can_autoplay_muted = true;
			u.t.setTimer(u.test_autoplay, function() {
				this.check();
			}, 20);
		}
	}
	else if(u.media_autoplay_detection !== true) {
		u.media_autoplay_detection.push(player);
	}
	else {
		u.t.setTimer(player, function() {
			this.can_autoplay = u.media_can_autoplay;
			this.can_autoplay_muted = u.media_can_autoplay_muted;
			if(fun(this.ready)){
				this.ready();
			}
		}, 20);
	}
}


/*u-textscaler.js*/
u.textscaler = function(node, _settings) {
	if(typeof(_settings) != "object") {
		_settings = {
			"*":{
				"unit":"rem",
				"min_size":1,
				"min_width":200,
				"min_height":200,
				"max_size":40,
				"max_width":3000,
				"max_height":2000
			}
		};
	}
	node.text_key = u.randomString(8);
	u.ac(node, node.text_key);
	node.text_settings = JSON.parse(JSON.stringify(_settings));
	node.scaleText = function() {
		var tag;
		for(tag in this.text_settings) {
			var settings = this.text_settings[tag];
			var width_wins = false;
			var height_wins = false;
			if(settings.width_factor && settings.height_factor) {
				if(window._man_text._height - settings.min_height < window._man_text._width - settings.min_width) {
					height_wins = true;
				}
				else {
					width_wins = true;
				}
			}
			if(settings.width_factor && !height_wins) {
				if(settings.min_width <= window._man_text._width && settings.max_width >= window._man_text._width) {
					var font_size = settings.min_size + (settings.size_factor * (window._man_text._width - settings.min_width) / settings.width_factor);
					settings.css_rule.style.setProperty("font-size", font_size + settings.unit, "important");
				}
				else if(settings.max_width < window._man_text._width) {
					settings.css_rule.style.setProperty("font-size", settings.max_size + settings.unit, "important");
				}
				else if(settings.min_width > window._man_text._width) {
					settings.css_rule.style.setProperty("font-size", settings.min_size + settings.unit, "important");
				}
			}
			else if(settings.height_factor) {
				if(settings.min_height <= window._man_text._height && settings.max_height >= window._man_text._height) {
					var font_size = settings.min_size + (settings.size_factor * (window._man_text._height - settings.min_height) / settings.height_factor);
					settings.css_rule.style.setProperty("font-size", font_size + settings.unit, "important");
				}
				else if(settings.max_height < window._man_text._height) {
					settings.css_rule.style.setProperty("font-size", settings.max_size + settings.unit, "important");
				}
				else if(settings.min_height > window._man_text._height) {
					settings.css_rule.style.setProperty("font-size", settings.min_size + settings.unit, "important");
				}
			}
		}
	}
	node.cancelTextScaling = function() {
		u.e.removeEvent(window, "resize", window._man_text.scale);
	}
	if(!window._man_text) {
		var man_text = {};
		man_text.nodes = [];
		var style_tag = document.createElement("style");
		style_tag.setAttribute("media", "all")
		style_tag.setAttribute("type", "text/css")
		man_text.style_tag = u.ae(document.head, style_tag);
		man_text.style_tag.appendChild(document.createTextNode(""))
		window._man_text = man_text;
		window._man_text._width = u.browserW();
		window._man_text._height = u.browserH();
		window._man_text.scale = function() {
			var _width = u.browserW();
			var _height = u.browserH();
			window._man_text._width = u.browserW();
			window._man_text._height = u.browserH();
			var i, node;
			for(i = 0; i < window._man_text.nodes.length; i++) {
				node = window._man_text.nodes[i];
				if(node.parentNode) { 
					node.scaleText();
				}
				else {
					window._man_text.nodes.splice(window._man_text.nodes.indexOf(node), 1);
					if(!window._man_text.nodes.length) {
						u.e.removeEvent(window, "resize", window._man_text.scale);
						window._man_text = false;
						break;
					}
				}
			}
		}
		u.e.addEvent(window, "resize", window._man_text.scale);
		window._man_text.precalculate = function() {
			var i, node, tag;
			for(i = 0; i < window._man_text.nodes.length; i++) {
				node = window._man_text.nodes[i];
				if(node.parentNode) { 
					var settings = node.text_settings;
					for(tag in settings) {
						if(settings[tag].max_width && settings[tag].min_width) {
							settings[tag].width_factor = settings[tag].max_width-settings[tag].min_width;
						}
						else if(node._man_text.max_width && node._man_text.min_width) {
							settings[tag].max_width = node._man_text.max_width;
							settings[tag].min_width = node._man_text.min_width;
							settings[tag].width_factor = node._man_text.max_width-node._man_text.min_width;
						}
						else {
							settings[tag].width_factor = false;
						}
						if(settings[tag].max_height && settings[tag].min_height) {
							settings[tag].height_factor = settings[tag].max_height-settings[tag].min_height;
						}
						else if(node._man_text.max_height && node._man_text.min_height) {
							settings[tag].max_height = node._man_text.max_height;
							settings[tag].min_height = node._man_text.min_height;
							settings[tag].height_factor = node._man_text.max_height-node._man_text.min_height;
						}
						else {
							settings[tag].height_factor = false;
						}
						settings[tag].size_factor = settings[tag].max_size-settings[tag].min_size;
						if(!settings[tag].unit) {
							settings[tag].unit = node._man_text.unit;
						}
					}
				}
			}
		}
	}
	var tag;
	node._man_text = {};
	for(tag in node.text_settings) {
		if(tag == "min_height" || tag == "max_height" || tag == "min_width" || tag == "max_width" || tag == "unit" || tag == "ref") {
			node._man_text[tag] = node.text_settings[tag];
			node.text_settings[tag] = null;
			delete node.text_settings[tag];
		}
		else {
			selector = "."+node.text_key + ' ' + tag + ' ';
			node.css_rules_index = window._man_text.style_tag.sheet.insertRule(selector+'{}', 0);
			node.text_settings[tag].css_rule = window._man_text.style_tag.sheet.cssRules[0];
		}
	}
	window._man_text.nodes.push(node);
	window._man_text.precalculate();
	node.scaleText();
}

/*u-form-builder.js*/
u.f.customBuild = {};
u.f.addForm = function(node, _options) {
	var form_name = "js_form";
	var form_action = "#";
	var form_method = "post";
	var form_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"			: form_name				= _options[_argument]; break;
				case "action"		: form_action			= _options[_argument]; break;
				case "method"		: form_method			= _options[_argument]; break;
				case "class"		: form_class			= _options[_argument]; break;
			}
		}
	}
	var form = u.ae(node, "form", {"class":form_class, "name": form_name, "action":form_action, "method":form_method});
	return form;
}
u.f.addFieldset = function(node, _options) {
	var fieldset_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "class"			: fieldset_class			= _options[_argument]; break;
			}
		}
	}
	return u.ae(node, "fieldset", {"class":fieldset_class});
}
u.f.addField = function(node, _options) {
	var field_name = "js_name";
	var field_label = "Label";
	var field_type = "string";
	var field_value = "";
	var field_options = [];
	var field_checked = false;
	var field_class = "";
	var field_id = "";
	var field_max = false;
	var field_min = false;
	var field_disabled = false;
	var field_readonly = false;
	var field_required = false;
	var field_pattern = false;
	var field_error_message = "There is an error in your input";
	var field_hint_message = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"					: field_name			= _options[_argument]; break;
				case "label"				: field_label			= _options[_argument]; break;
				case "type"					: field_type			= _options[_argument]; break;
				case "value"				: field_value			= _options[_argument]; break;
				case "options"				: field_options			= _options[_argument]; break;
				case "checked"				: field_checked			= _options[_argument]; break;
				case "class"				: field_class			= _options[_argument]; break;
				case "id"					: field_id				= _options[_argument]; break;
				case "max"					: field_max				= _options[_argument]; break;
				case "min"					: field_min				= _options[_argument]; break;
				case "disabled"				: field_disabled		= _options[_argument]; break;
				case "readonly"				: field_readonly		= _options[_argument]; break;
				case "required"				: field_required		= _options[_argument]; break;
				case "pattern"				: field_pattern			= _options[_argument]; break;
				case "error_message"		: field_error_message	= _options[_argument]; break;
				case "hint_message"			: field_hint_message	= _options[_argument]; break;
			}
		}
	}
	var custom_build;
	if(field_type in u.f.customBuild) {
		return u.f.customBuild[field_type](node, _options);
	}
	field_id = field_id ? field_id : "input_"+field_type+"_"+field_name;
	field_disabled = !field_disabled ? (field_class.match(/(^| )disabled( |$)/) ? "disabled" : false) : "disabled";
	field_readonly = !field_readonly ? (field_class.match(/(^| )readonly( |$)/) ? "readonly" : false) : "readonly";
	field_required = !field_required ? (field_class.match(/(^| )required( |$)/) ? true : false) : true;
	field_class += field_disabled ? (!field_class.match(/(^| )disabled( |$)/) ? " disabled" : "") : "";
	field_class += field_readonly ? (!field_class.match(/(^| )readonly( |$)/) ? " readonly" : "") : "";
	field_class += field_required ? (!field_class.match(/(^| )required( |$)/) ? " required" : "") : "";
	field_class += field_min ? (!field_class.match(/(^| )min:[0-9]+( |$)/) ? " min:"+field_min : "") : "";
	field_class += field_max ? (!field_class.match(/(^| )max:[0-9]+( |$)/) ? " max:"+field_max : "") : "";
	if (field_type == "hidden") {
		return u.ae(node, "input", {"type":"hidden", "name":field_name, "value":field_value, "id":field_id});
	}
	var field = u.ae(node, "div", {"class":"field "+field_type+" "+field_class});
	var attributes = {};
	if(field_type == "string") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":"text", 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "email" || field_type == "tel" || field_type == "password") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "number" || field_type == "integer" || field_type == "date" || field_type == "datetime") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"max":field_max, 
			"min":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "checkbox") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value ? field_value : "true", 
			"name":field_name, 
			"disabled":field_disabled,
			"checked":field_checked
		};
		u.ae(field, "input", {"name":field_name, "value":"false", "type":"hidden"});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
		u.ae(field, "label", {"for":field_id, "html":field_label});
	}
	else if(field_type == "text") {
		attributes = {
			"id":field_id, 
			"html":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "textarea", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "select") {
		attributes = {
			"id":field_id, 
			"name":field_name, 
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		var select = u.ae(field, "select", u.f.verifyAttributes(attributes));
		if(field_options) {
			var i, option;
			for(i = 0; i < field_options.length; i++) {
				option = field_options[i];
				if(option.value == field_value) {
					u.ae(select, "option", {"value":option.value, "html":option.text, "selected":"selected"});
				}
				else {
					u.ae(select, "option", {"value":option.value, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "radiobuttons") {
		u.ae(field, "label", {"html":field_label});
		if(field_options) {
			var i, option;
			for(i = 0; i < field_options.length; i++) {
				option = field_options[i];
				var div = u.ae(field, "div", {"class":"item"});
				if(option.value == field_value) {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name, "checked":"checked"});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
				else {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "files") {
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", {"id":field_id, "name":field_name, "type":"file"});
	}
	else {
		u.bug("input type not implemented")
	}
	if(field_hint_message || field_error_message) {
		var help = u.ae(field, "div", {"class":"help"});
		if (field_hint_message) {
			u.ae(help, "div", { "class": "hint", "html": field_hint_message });
		}
		if(field_error_message) {
			u.ae(help, "div", { "class": "error", "html": field_error_message });
		}
	}
	return field;
}
u.f.verifyAttributes = function(attributes) {
	for(attribute in attributes) {
		if(attributes[attribute] === undefined || attributes[attribute] === false || attributes[attribute] === null) {
			delete attributes[attribute];
		}
	}
	return attributes;
}
u.f.addAction = function(node, _options) {
	var action_type = "submit";
	var action_name = "js_name";
	var action_value = "";
	var action_class = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "type"			: action_type			= _options[_argument]; break;
				case "name"			: action_name			= _options[_argument]; break;
				case "value"		: action_value			= _options[_argument]; break;
				case "class"		: action_class			= _options[_argument]; break;
			}
		}
	}
	var p_ul = node.nodeName.toLowerCase() == "ul" ? node : u.pn(node, {"include":"ul.actions"});
	if(!p_ul || !u.hc(p_ul, "actions")) {
		if(node.nodeName.toLowerCase() == "form") {
			p_ul = u.qs("ul.actions", node);
		}
		p_ul = p_ul ? p_ul : u.ae(node, "ul", {"class":"actions"});
	}
	var p_li = node.nodeName.toLowerCase() == "li" ? node : u.pn(node, {"include":"li"});
	if(!p_li || p_ul != p_li.parentNode) {
		p_li = u.ae(p_ul, "li", {"class":action_name});
	}
	else {
		p_li = node;
	}
	var action = u.ae(p_li, "input", {"type":action_type, "class":action_class, "value":action_value, "name":action_name})
	return action;
}


/*u-googlemaps.js*/
u.googlemaps = new function() {
	this.api_loading = false;
	this.api_loaded = false;
	this.api_load_queue = [];
	this.map = function(map, center, _options) {
		map._maps_streetview = false;
		map._maps_zoom = 10;
		map._maps_scrollwheel = true;
		map._maps_zoom = 10;
		map._center_latitude = center[0];
		map._center_longitude = center[1];
		map._styles = false;
		map._disable_ui = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "zoom"           : map._maps_zoom               = _options[_argument]; break;
					case "scrollwheel"    : map._maps_scrollwheel        = _options[_argument]; break;
					case "streetview"     : map._maps_streetview         = _options[_argument]; break;
					case "styles"         : map._styles                  = _options[_argument]; break;
					case "disableUI"      : map._disable_ui              = _options[_argument]; break;
				}
			}
		}
		var map_key = u.randomString(8);
		window[map_key] = function() {
			u.googlemaps.api_loaded = true;
			var map;
			while(u.googlemaps.api_load_queue.length) {
				map = u.googlemaps.api_load_queue.shift();
				map.init();
			}
		}
		map.init = function() {
			var mapOptions = {center: new google.maps.LatLng(center[0], center[1]), zoom: this._maps_zoom, scrollwheel: this._maps_scrollwheel, streetViewControl: this._maps_streetview, zoomControlOptions: {position: google.maps.ControlPosition.LEFT_TOP}, styles: this._styles, disableDefaultUI: this._disable_ui};
			this.g_map = new google.maps.Map(this, mapOptions);
			this.g_map.m_map = this
			if(fun(this.APIloaded)) {
				this.APIloaded();
			}
			google.maps.event.addListener(this.g_map, 'tilesloaded', function() {
				if(fun(this.m_map.tilesloaded)) {
					this.m_map.tilesloaded();
				}
			});
			google.maps.event.addListenerOnce(this.g_map, 'tilesloaded', function() {
				if(fun(this.m_map.loaded)) {
					this.m_map.loaded();
				}
			});
		}
		if(!this.api_loaded && !this.api_loading) {
			u.ae(document.head, "script", {"src":"https://maps.googleapis.com/maps/api/js?callback="+map_key+(u.gapi_key ? "&key="+u.gapi_key : "")});
			this.api_loading = true;
			this.api_load_queue.push(map);
		}
		else if(this.api_loading) {
			this.api_load_queue.push(map);
		}
		else {
			map.init();
		}
	}
	this.addMarker = function(map, coords, _options) {
		var _icon;
		var _label = null;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "icon"           : _icon               = _options[_argument]; break;
					case "label"          : _label              = _options[_argument]; break;
				}
			}
		}
		var marker = new google.maps.Marker({position: new google.maps.LatLng(coords[0], coords[1]), animation:google.maps.Animation.DROP, icon: _icon, label: _label});
		marker.setMap(map.g_map);
		marker.g_map = map.g_map;
		google.maps.event.addListener(marker, 'click', function() {
			if(fun(this.clicked)) {
				this.clicked();
			}
		});
		google.maps.event.addListener(marker, 'mouseover', function() {
			if(fun(this.entered)) {
				this.entered();
			}
		});
		google.maps.event.addListener(marker, 'mouseout', function() {
			if(fun(this.exited)) {
				this.exited();
			}
		});
		return marker;
	}
	this.removeMarker = function(map, marker, _options) {
		marker._animation = true;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "animation"      : marker._animation            = _options[_argument]; break;
				}
			}
		}
		if(marker._animation) {
			var key = u.randomString(8);
			marker.pick_step = 0;
			marker.c_zoom = (1 << map.getZoom());
			marker.c_projection = map.getProjection();
			marker.c_exit = map.getBounds().getNorthEast().lat();
			marker._pickUp = function() {
				var new_position = this.c_projection.fromLatLngToPoint(this.getPosition());
				new_position.y -= (20*this.pick_step) / this.c_zoom; 
				new_position = this.c_projection.fromPointToLatLng(new_position);
				this.setPosition(new_position);
				if(this.c_exit < new_position.lat()) {
					this.setMap(null);
					if(fun(this.removed)) {
						this.removed();
					}
				}
				else{
					this.pick_step++;
					u.t.setTimer(this, this._pickUp, 20);
				}
			}
			marker._pickUp();
		}
		else {
			marker.setMap(null);
		}
	}
	this.infoWindow = function(map) {
		map.g_infowindow = new google.maps.InfoWindow({"maxWidth":250});
		google.maps.event.addListener(map.g_infowindow, 'closeclick', function() {
			if(this._marker && fun(this._marker.closed)) {
				this._marker.closed();
				this._marker = false;
			}
		});
	}
	this.showInfoWindow = function(map, marker, content) {
		map.g_infowindow.setContent(content);
		map.g_infowindow.open(map, marker);
		map.g_infowindow._marker = marker;
	}
	this.hideInfoWindow = function(map) {
		map.g_infowindow.close();
		if(map.g_infowindow._marker && fun(map.g_infowindow._marker.closed)) {
			map.g_infowindow._marker.closed();
			map.g_infowindow._marker = false;
		}
		map.g_infowindow._marker = false;
	}
	this.zoom = function() {
	}
	this.center = function() {
	}
}


/*u-events-movements.js*/
u.e.resetDragEvents = function(node) {
	node._moves_pick = 0;
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseup", this._cancelPick);
	this.removeEvent(node, "touchend", this._cancelPick);
	this.removeEvent(node, "mouseout", this._dropOut);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, _options) {
	node.e_drag_options = _options ? _options : {};
	node.e_drag = true;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.distance_to_pick = 2;
	node.drag_strict = true;
	node.drag_overflow = false;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	node.callback_ready = "ready";
	node.callback_picked = "picked";
	node.callback_moved = "moved";
	node.callback_dropped = "dropped";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "strict"			: node.drag_strict			= _options[_argument]; break;
				case "overflow"			: node.drag_overflow		= _options[_argument]; break;
				case "elastica"			: node.drag_elastica		= Number(_options[_argument]); break;
				case "dropout"			: node.drag_dropout			= _options[_argument]; break;
				case "show_bounds"		: node.show_bounds			= _options[_argument]; break; 
				case "vertical_lock"	: node.vertical_lock		= _options[_argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= _options[_argument]; break;
				case "callback_picked"	: node.callback_picked		= _options[_argument]; break;
				case "callback_moved"	: node.callback_moved		= _options[_argument]; break;
				case "callback_dropped"	: node.callback_dropped		= _options[_argument]; break;
			}
		}
	}
	u.e.setDragBoundaries(node, boundaries);
	u.e.addStartEvent(node, this._inputStart);
	if(fun(node[node.callback_ready])) {
		node[node.callback_ready]();
	}
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if(
		(init_speed_x > init_speed_y && this.only_horizontal) || 
		(init_speed_x < init_speed_y && this.only_vertical) ||
		(!this.only_vertical && !this.only_horizontal)) {
		if((init_speed_x > this.distance_to_pick || init_speed_y > this.distance_to_pick)) {
			u.e.resetNestedEvents(this);
			u.e.kill(event);
			if(u.hasFixedParent(this)) {
				this.has_fixed_parent = true;
			}
			else {
				this.has_fixed_parent = false;
			}
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this._x;
			this.move_last_y = this._y;
			if(u.hasFixedParent(this)) {
				this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
				this.start_input_y = u.eventY(event) - this._y - u.scrollY();
			}
			else {
				this.start_input_x = u.eventX(event) - this._x; 
				this.start_input_y = u.eventY(event) - this._y;
			}
			this.current_xps = 0;
			this.current_yps = 0;
			u.a.transition(this, "none");
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
			if(fun(this[this.callback_picked])) {
				this[this.callback_picked](event);
			}
			if(this.drag_dropout && event.type.match(/mouse/)) {
				// 	
				// 	
				// 	
				// 	
				// 	
				// 
				// 
				// 	
				this._dropOutDrag = u.e._drag;
				this._dropOutDrop = u.e._drop;
				u.e.addOutEvent(this, u.e._dropOut);
			}
		}
	}
}
u.e._drag = function(event) {
	if(this.has_fixed_parent) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.last_x_distance_travelled = (this.current_xps) ? this.current_x - this.move_last_x : this.last_x_distance_travelled;
	this.last_y_distance_travelled = (this.current_yps) ? this.current_y - this.move_last_y : this.last_y_distance_travelled;
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	if(this.e_swipe) {
		if(this.only_horizontal) {
			if(this.current_xps < 0 || this.current_xps === 0 && this.last_x_distance_travelled < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.only_vertical) {
			if(this.current_yps < 0 || this.current_yps === 0 && this.last_y_distance_travelled < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
		else {
			if(Math.abs(this.current_xps) > Math.abs(this.current_yps)) {
				if(this.current_xps < 0) {
					this.swiped = "left";
				}
				else {
					this.swiped = "right";
				}
			}
			else if(Math.abs(this.current_xps) < Math.abs(this.current_yps)) {
				if(this.current_yps < 0) {
					this.swiped = "up";
				}
				else {
					this.swiped = "down";
				}
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(fun(this[this.callback_moved])) {
		this[this.callback_moved](event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		this.e_swipe_options.eventAction = "Swiped "+ this.swiped;
		u.stats.event(this, this.e_swipe_options);
		if(this.swiped == "left" && fun(this.swipedLeft)) {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && fun(this.swipedRight)) {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && fun(this.swipedDown)) {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && fun(this.swipedUp)) {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = Math.round(this._x + (this.current_xps/2));
		this.current_y = Math.round(this._y + (this.current_yps/2));
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			if(fun(this.projected)) {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "none");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(this.e_drag && !this.e_swipe) {
		this.e_drag_options.eventAction = u.stringOr(this.e_drag_options.eventAction, "Dropped");
		u.stats.event(this, this.e_drag_options);
	}
	if(fun(this[this.callback_dropped])) {
		this[this.callback_dropped](event);
	}
}
u.e._dropOut = function(event) {
	this._drop_out_id = u.randomString();
	document["_DroppedOutNode" + this._drop_out_id] = this;
	eval('document["_DroppedOutMove' + this._drop_out_id + '"] = function(event) {document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrag(event);}');
	eval('document["_DroppedOutOver' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);}');
	eval('document["_DroppedOutEnd' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrop(event);}');
	u.e.addEvent(document, "mousemove", document["_DroppedOutMove" + this._drop_out_id]);
	u.e.addEvent(this, "mouseover", document["_DroppedOutOver" + this._drop_out_id]);
	u.e.addEvent(document, "mouseup", document["_DroppedOutEnd" + this._drop_out_id]);
}
u.e._cancelPick = function(event) {
	u.e.resetDragEvents(this);
	if(fun(this.pickCancelled)) {
		this.pickCancelled(event);
	}
}
u.e.setDragBoundaries = function(node, boundaries) {
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		if(node.drag_overflow == "scroll") {
			node.start_drag_x = node.offsetWidth > boundaries.offsetWidth ? boundaries.offsetWidth - node.offsetWidth : 0;
			node.start_drag_y = node.offsetHeight > boundaries.offsetHeight ? boundaries.offsetHeight - node.offsetHeight : 0;
			node.end_drag_x = node.offsetWidth > boundaries.offsetWidth ? node.offsetWidth : boundaries.offsetWidth;
			node.end_drag_y = node.offsetHeight > boundaries.offsetHeight ? node.offsetHeight : boundaries.offsetHeight;
		}
		else {
			node.start_drag_x = u.absX(boundaries) - u.absX(node);
			node.start_drag_y = u.absY(boundaries) - u.absY(node);
			node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
			node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
		}
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: ", node, " in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	if(node.drag_overflow == "scroll" && (boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.locked = ((node.end_drag_x - node.start_drag_x <= boundaries.offsetWidth) && (node.end_drag_y - node.start_drag_y <= boundaries.offsetHeight));
		node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x <= boundaries.offsetWidth));
		node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y <= boundaries.offsetHeight));
	}
	else {
		node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
		node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
		node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	}
}
u.e.setDragPosition = function(node, x, y) {
	node.current_xps = 0;
	node.current_yps = 0;
	node._x = x;
	node._y = y;
	u.a.translate(node, node._x, node._y);
	if(fun(node[node.callback_moved])) {
		node[node.callback_moved](event);
	}
}
u.e.swipe = function(node, boundaries, _options) {
	node.e_swipe_options = _options ? _options : {};
	node.e_swipe = true;
	u.e.drag(node, boundaries, _options);
}


/*beta-u-columns.js*/
u.columns = function(node, _columns, insert) {
	var current_node = node;
	insert = insert || false;
	if(!node._tree) {
		if(insert) {
			node._tree = u.ie(node, "div", {
				"class":"c"
			})
		}
		else {
			node._tree = u.ae(node, "div", {
				"class":"c"
			})
		}
		node._tree.node = node;
		current_node = node._tree;
	}
	var _column, div_column, column, i, key, value, j;
	for(j = 0; j < _columns.length; j++) {
		_column = _columns[j];
		if(typeof(_column) === "object") {
			key = Object.keys(_column)[0];
			value = _column[key];
			div_column = u.ae(current_node, "div", {
				"class":key
			});
			div_column._tree = node._tree;
			u.columns(div_column, value);
		}
		else {
			var target = u.qs(_column, node._tree.node);
			if(target) {
				div_column = u.ae(current_node, target);
				div_column._tree = node._tree;
			}
		}
	}
}


/*beta-u-paymentcards.js*/
u.paymentCards = new function() {
	this.payment_cards = [
		{
			"type": 'maestro',
			"patterns": [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
			"format": /(\d{1,4})/g,
			"card_length": [12,13,14,15,16,17,18,19],
			"cvc_length": [3],
			"luhn": true
		},
		{
			"type": 'forbrugsforeningen',
			"patterns": [600],
			"format": /(\d{1,4})/g,
			"card_length": [16],
			"cvc_length": [3],
			"luhn": true,
		},
		{
			"type": 'dankort',
			"patterns": [5019],
			"format": /(\d{1,4})/g,
			"card_length": [16],
			"cvc_length": [3],
			"luhn": true
		},
		{
			"type": 'visa',
			"patterns": [4],
			"format": /([\d]{1,4})([\d]{1,4})?([\d]{1,4})?([\d]{1,4})?/,
			"card_length": [13, 16],
			"cvc_length": [3],
			"luhn": true
		},
		{
			"type": 'mastercard',
			"patterns": [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
			"format": /(\d{1,4})/g,
			"card_length": [16],
			"cvc_length": [3],
			"luhn": true
		},
		{
			"type": 'amex',
			"patterns": [34, 37],
			"format": /(\d{1,4})([\d]{0,6})?(\d{1,5})?/,
			"card_length": [15],
			"cvc_length": [3,4],
			"luhn": true
		}
	];
	this.validateCardNumber = function(card_number) {
		var card = this.getCardTypeFromNumber(card_number);
		if(card && parseInt(card_number) == card_number) {
			var i, allowed_length;
			for(i = 0; i < card.card_length.length; i++) {
				allowed_length = card.card_length[i];
				if(card_number.length == allowed_length) {
					if(card.luhn) {
						return this.luhnCheck(card_number);
					}
					else {
						return true;
					}
				}
			}
		}
		return false;
	}
	this.validateExpDate = function(month, year) {
		if(
			this.validateExpMonth(month) && 
			this.validateExpYear(year) && 
			new Date(year, month-1) >= new Date(new Date().getFullYear(), new Date().getMonth())
		) {
			return true;
		}
		return false;
	}
	this.validateExpMonth = function(month) {
		if(month && parseInt(month) == month && month >= 1 && month <= 12) {
			return true;
		}
		return false;
	}
	this.validateExpYear = function(year) {
		if(year && parseInt(year) == year && new Date(year, 0) >= new Date(new Date().getFullYear(), 0)) {
			return true;
		}
		return false;
	}
	this.validateCVC = function(cvc, card_number) {
		var cvc_length = [3,4];
		if(card_number && parseInt(card_number) == card_number) {
			var card = this.getCardTypeFromNumber(card_number);
			if(card) {
				cvc_length = card.cvc_length;
			}
		}
		if(cvc && parseInt(cvc) == cvc) {
			var i, allowed_length;
			for(i = 0; i < cvc_length.length; i++) {
				allowed_length = cvc_length[i];
				if(cvc.toString().length == allowed_length) {
					return true;
				}
			}
		}
		return false;
	}
	this.getCardTypeFromNumber = function(card_number) {
		var i, j, card, pattern, regex;
		for(i = 0; card = this.payment_cards[i]; i++) {
			for(j = 0; j < card.patterns.length; j++) {
				pattern = card.patterns[j];
				if(card_number.match('^' + pattern)) {
					return card;
				}
			}
		}
		return false;
	}
	this.formatCardNumber = function(card_number) {
		var card = this.getCardTypeFromNumber(card_number);
		if(card) {
			var matches = card_number.match(card.format);
			if(matches) {
				if(matches.length > 1 && matches[0] == card_number) {
					matches.shift();
					card_number = matches.join(" ").trim();
				}
				else {
					card_number = matches.join(" ");
				}
			}
		}
		return card_number;
	}
	this.luhnCheck = function(card_number) {
		var ca, sum = 0, mul = 1;
		var len = card_number.length;
		while (len--) {
			ca = parseInt(card_number.charAt(len),10) * mul;
			sum += ca - (ca>9)*9;
			mul ^= 3;
		};
		return (sum%10 === 0) && (sum > 0);
	};
}


/*beta-u-form-onebuttonform.js*/
Util.Modules["oneButtonForm"] = new function() {
	this.init = function(node) {
		if(!node.childNodes.length) {
			var csrf_token = node.getAttribute("data-csrf-token");
			if(csrf_token) {
				if(node.nodeName.toLowerCase() === "form") {
					node._ob_form = node;
				}
				else {
					var form_action = node.getAttribute("data-form-action");
					var form_target = node.getAttribute("data-form-target");
					if(form_action) {
						var form_options = {"action":form_action, "class":"confirm_action_form"};
						if(form_target) {
							form_options["target"] = form_target;
						}
						node._ob_form = u.f.addForm(node, form_options);
					}
					else {
						u.bug("oneButtonForm missin information");
						return;
					}
				}
				u.ae(node._ob_form, "input", {"type":"hidden","name":"csrf-token", "value":csrf_token});
				var inputs = node.getAttribute("data-inputs");
				if(inputs) {
					inputs = JSON.parse(inputs);
					for(input_name in inputs) {
						u.ae(node._ob_form, "input", {"type":"hidden","name":input_name, "value":inputs[input_name]});
					}
				}
				var button_value = node.getAttribute("data-button-value");
				var button_name = node.getAttribute("data-button-name");
				var button_class = node.getAttribute("data-button-class");
				u.f.addAction(node._ob_form, {"value":button_value, "class":"button" + (button_class ? " "+button_class : ""), "name":u.stringOr(button_name, "save")});
			}
		}
		else {
			if(node.nodeName.toLowerCase() === "form") {
				node._ob_form = node;
			}
			else {
				node._ob_form = u.qs("form", node);
			}
		}
		if(node._ob_form) {
			u.f.init(node._ob_form);
			node._ob_form._ob_node = node;
			node._ob_form._ob_submit_button = u.qs("input[type=submit]", node._ob_form);
			if(u.objectValues(node._ob_form.actions).indexOf(node._ob_form._ob_submit_button) === -1) {
				u.f.initButton(node._ob_form, node._ob_form._ob_submit_button);
			}
			node._ob_form._ob_submit_button.org_value = node._ob_form._ob_submit_button.value;
			node._ob_form._ob_submit_button.confirm_value = node.getAttribute("data-confirm-value");
			node._ob_form._ob_submit_button.wait_value = node.getAttribute("data-wait-value");
			node._ob_form._ob_success_function = node.getAttribute("data-success-function");
			node._ob_form._ob_success_location = node.getAttribute("data-success-location");
			node._ob_form._ob_error_function = node.getAttribute("data-error-function");
			node._ob_form._ob_dom_submit = node.getAttribute("data-dom-submit");
			node._ob_form._ob_download = node.getAttribute("data-download");
			node._ob_form.restore = function(event) {
				u.t.resetTimer(this.t_confirm);
				u.rc(this._ob_submit_button, "confirm");
				delete this._ob_submit_button._ob_wait_for_confirm;
				this._ob_submit_button.value = this._ob_submit_button.org_value;
			}
			node._ob_form.submitted = function(action) {
				if(!this._ob_submit_button._ob_wait_for_confirm && this._ob_submit_button.confirm_value) {
					u.ac(this._ob_submit_button, "confirm");
					this._ob_submit_button._ob_wait_for_confirm = true;
					this._ob_submit_button.value = this._ob_submit_button.confirm_value;
					this.t_confirm = u.t.setTimer(this, this.restore, 3000);
				}
				else {
					u.t.resetTimer(this.t_confirm);
					this.response = function(response) {
						u.rc(this, "submitting");
						u.rc(this._ob_submit_button, "disabled");
						if(fun(page.notify)) {
							page.notify(response);
						}
						this.restore();
						if(!response.cms_status || response.cms_status == "success") {
							if(response.cms_object && response.cms_object.constraint_error) {
								this._ob_submit_button.value = this._ob_submit_button.org_value;
								u.ac(this, "disabled");
							}
							else {
								if(this._ob_success_location) {
									u.ass(this._ob_submit_button, {
										"display": "none"
									});
									location.href = this._ob_success_location;
								}
								else if(this._ob_success_function) {
									if(fun(this._ob_node[this._ob_success_function])) {
										this._ob_node[this._ob_success_function](response);
									}
								}
								else if(fun(this._ob_node.confirmed)) {
									this._ob_node.confirmed(response);
								}
								else {
									u.bug("default return handling" + this._ob_success_location)
								}
							}
						}
						else {
							if(this._ob_error_function) {
								u.bug("error function:" + this._ob_error_function);
								if(fun(this._ob_node[this._ob_error_function])) {
									this._ob_node[this._ob_error_function](response);
								}
							}
							else if(fun(this._ob_node.confirmedError)) {
								u.bug("confirmedError");
								this._ob_node.confirmedError(response);
							}
						}
					}
					u.ac(this._ob_submit_button, "disabled");
					u.ac(this, "submitting");
					this._ob_submit_button.value = u.stringOr(this._ob_submit_button.wait_value, "Wait");
					if(this._ob_dom_submit) {
						u.bug("should submit:" + this._ob_download);
						if(this._ob_download) {
							this.response({"cms_status":"success"});
							u.bug("wait for download");
						}
						this.DOMsubmit();
					}
					else {
						u.request(this, this.action, {"method":"post", "data":this.getData()});
					}
				}
			}
		}
	}
}

/*beta-u-animation-to.js*/
	u.a.parseSVGPolygon = function(value) {
		var pairs = value.trim().split(" ");
		var sets = [];
		var part;
		for(x in pairs) {
			parts = pairs[x].trim().split(",");
			for(part in parts) {
				parts[part] = Number(parts[part]);
			}
			sets[x] = parts;
		}
		return sets;
	}
	u.a.parseSVGPath = function(value) {
		var pairs = {"m":2, "l":2, "a":7, "c":6, "s":4, "q":4, "z":0};
		var x, sets;
		value = value.replace(/-/g, " -");
		value = value.replace(/,/g, " ");
		value = value.replace(/(m|l|a|c|s|q|M|L|A|C|S|Q)/g, " $1 ");
		value = value.replace(/  /g, " ");
		sets = value.match(/(m|l|a|c|s|q|M|L|A|C|S|Q)([0-9 \-\.]+)/g);
		for(x in sets) {
			parts = sets[x].trim().split(" ");
			sets[x] = parts;
			if(parts && pairs[parts[0].toLowerCase()] == parts.length-1) {
			}
			else {
			}
		}
		return sets;
	}
	u.a.getInitialValue = function(node, attribute) {
		var value = (node.getAttribute(attribute) ? node.getAttribute(attribute) : u.gcs(node, attribute)).replace(node._unit[attribute], "")
		if(attribute.match(/^(d|points)$/)) {
			return value;
		}
		else {
			return Number(value.replace(/auto/, 0));
		}
	}
	u.a.to = function(node, transition, attributes) {
		var transition_parts = transition.split(" ");
		if(transition_parts.length >= 3) {
			node._target = transition_parts[0];
			node.duration = transition_parts[1].match("ms") ? parseFloat(transition_parts[1]) : (parseFloat(transition_parts[1]) * 1000);
			node._ease = transition_parts[2];
			if(transition_parts.length == 4) {
				node.delay = transition_parts[3].match("ms") ? parseFloat(transition_parts[3]) : (parseFloat(transition_parts[3]) * 1000);
			}
		}
		var value, d;
		node._start = {};
		node._end = {};
		node._unit = {};
		for(attribute in attributes) {
			if(attribute.match(/^(d)$/)) {
				node._start[attribute] = this.parseSVGPath(this.getInitialValue(node, attribute));
				node._end[attribute] = this.parseSVGPath(attributes[attribute]);
			}
			else if(attribute.match(/^(points)$/)) {
				node._start[attribute] = this.parseSVGPolygon(this.getInitialValue(node, attribute));
				node._end[attribute] = this.parseSVGPolygon(attributes[attribute]);
			}
			else {
				node._unit[attribute] = attributes[attribute].toString().match(/\%|px/);
				node._start[attribute] = this.getInitialValue(node, attribute);
				node._end[attribute] = attributes[attribute].toString().replace(node._unit[attribute], "");
			}
		}
		node.easing = u.easings[node._ease];
		node.transitionTo = function(progress) {
			var easing = node.easing(progress);
			for(attribute in attributes) {
				if(attribute.match(/^(translate|rotate|scale)$/)) {
					if(attribute == "translate") {
						u.a.translate(this, Math.round((this._end_x - this._start_x) * easing), Math.round((this._end_y - this._start_y) * easing))
					}
					else if(attribute == "rotate") {
					}
				}
				else if(attribute.match(/^(x1|y1|x2|y2|r|cx|cy|stroke-width)$/)) {
					var new_value = (this._start[attribute] + ((this._end[attribute] - this._start[attribute]) * easing)) +  this._unit[attribute]
					this.setAttribute(attribute, new_value);
				}
				else if(attribute.match(/^(d)$/)) {
					var new_value = "";
					for(x in this._start[attribute]) {
						for(y in this._start[attribute][x]) {
							if(parseFloat(this._start[attribute][x][y]) == this._start[attribute][x][y]) {
								new_value += (Number(this._start[attribute][x][y]) + ((Number(this._end[attribute][x][y]) - Number(this._start[attribute][x][y])) * easing)) + " ";
							}
							else {
								new_value += this._end[attribute][x][y] + " ";
							}
						}
					}
					this.setAttribute(attribute, new_value);
				}
				else if(attribute.match(/^(points)$/)) {
					var new_value = "";
					for(x in this._start[attribute]) {
						new_value += (this._start[attribute][x][0] + ((this._end[attribute][x][0] - this._start[attribute][x][0]) * easing)) + ",";
						new_value += (this._start[attribute][x][1] + ((this._end[attribute][x][1] - this._start[attribute][x][1]) * easing)) + " ";
					}
					this.setAttribute(attribute, new_value);
				}
				else {
					var new_value = (this._start[attribute] + ((this._end[attribute] - this._start[attribute]) * easing)) +  this._unit[attribute]
					u.as(node, attribute, new_value, false);
				}
			}
		}
		u.a.requestAnimationFrame(node, "transitionTo", node.duration);
	}


/*beta-u-fontsready.js*/
u.fontsReady = function(node, fonts, _options) {
	var callback_loaded = "fontsLoaded";
	var callback_timeout = "fontsNotLoaded";
	var max_time = 3000;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"					: callback_loaded		= _options[_argument]; break;
				case "timeout"					: callback_timeout		= _options[_argument]; break;
				case "max"						: max_time				= _options[_argument]; break;
			}
		}
	}
	window["_man_fonts_"] = window["_man_fonts_"] || {};
	window["_man_fonts_"].fontApi = document.fonts && fun(document.fonts.check) ? true : false;
	window["_man_fonts_"].fonts = window["_man_fonts_"].fonts || {};
	var font, node, i;
	if(typeof(fonts.length) == "undefined") {
		font = fonts;
		fonts = new Array();
		fonts.push(font);
	}
	var loadkey = u.randomString(8);
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey] = {};
	}
	else {
		window["_man_fonts_"+loadkey] = u.ae(document.body, "div");
		window["_man_fonts_"+loadkey].basenodes = {};
	}
	window["_man_fonts_"+loadkey].nodes = [];
	window["_man_fonts_"+loadkey].t_timeout = u.t.setTimer(window["_man_fonts_"+loadkey], "fontCheckTimeout", max_time);
	window["_man_fonts_"+loadkey].loadkey = loadkey;
	window["_man_fonts_"+loadkey].callback_node = node;
	window["_man_fonts_"+loadkey].callback_loaded = callback_loaded;
	window["_man_fonts_"+loadkey].callback_timeout = callback_timeout;
	for(i = 0; i < fonts.length; i++) {
		font = fonts[i];
		font.style = font.style || "normal";
		font.weight = font.weight || "400";
		font.size = font.size || "16px";
		font.status = "waiting";
		font.id = u.superNormalize(font.family+font.style+font.weight);
		if(!window["_man_fonts_"].fonts[font.id]) {
			window["_man_fonts_"].fonts[font.id] = font;
		}
		if(window["_man_fonts_"].fontApi) {
			node = {};
		}
		else {
			if(!window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)]) {
				window["_man_fonts_"+loadkey].basenodes[u.superNormalize(font.style+font.weight)] = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
			}
			node = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: '"+font.family+"', Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
		}
		node.font_size = font.size;
		node.font_family = font.family;
		node.font_weight = font.weight;
		node.font_style = font.style;
		node.font_id = font.id;
		node.loadkey = loadkey;
		window["_man_fonts_"+loadkey].nodes.push(node);
	}
	window["_man_fonts_"+loadkey].checkFontsAPI = function() {
		var i, node, font_string;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id] && window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				font_string = node.font_style + " " + node.font_weight + " " + node.font_size + " " + node.font_family;
				document.fonts.load(font_string).then(function(fontFaceSetEvent) {
					if(fontFaceSetEvent && fontFaceSetEvent.length && fontFaceSetEvent[0].status == "loaded") {
						window["_man_fonts_"].fonts[this.font_id].status = "loaded";
					}
					else {
						window["_man_fonts_"].fonts[this.font_id].status = "failed";
					}
					if(window["_man_fonts_"+this.loadkey] && fun(window["_man_fonts_"+this.loadkey].checkFontsStatus)) {
						window["_man_fonts_"+this.loadkey].checkFontsStatus();
					}
				}.bind(node));
			}
		}
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].checkFontsFallback = function() {
		var basenode, i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			basenode = this.basenodes[u.superNormalize(node.font_style+node.font_weight)];
			if(node.offsetWidth != basenode.offsetWidth || node.offsetHeight != basenode.offsetHeight) {
				window["_man_fonts_"].fonts[node.font_id].status = "loaded";
			}
		}
		this.t_fallback = u.t.setTimer(this, "checkFontsFallback", 30);
		if(fun(this.checkFontsStatus)) {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].fontCheckTimeout = function(event) {
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_timeout])) {
			this.callback_node[this.callback_timeout](this.nodes);
		}
		else if(fun(this.callback_node[this.callback_loaded])) {
			this.callback_node[this.callback_loaded](this.nodes);
		}
	}
	window["_man_fonts_"+loadkey].checkFontsStatus = function(event) {
		var i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			if(window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				return;
			}
		}
		u.t.resetTimer(this.t_timeout);
		u.t.resetTimer(this.t_fallback);
		delete window["_man_fonts_"+this.loadkey];
		if(this.parentNode) {
			this.parentNode.removeChild(this);
		}
		if(fun(this.callback_node[this.callback_loaded])) {
			if(this.fontApi) {
				this.callback_node[this.callback_loaded](this.nodes);
			}
			else {
				setTimeout(function() {
					this.callback_node[this.callback_loaded](this.nodes); 
				}.bind(this), 250);
			}
		}
	}
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey].checkFontsAPI();
	}
	else {
		window["_man_fonts_"+loadkey].checkFontsFallback();
	}
}

/*beta-u-slideshow.js*/
u.slideshow = function(list, _options) {
	var i, node;
	var slideshow = u.wrapElement(list, "div", {"class":"slideshow"});
	slideshow._selector = "";
	slideshow._layout = "horizontal";
	slideshow._navigation = true;
	slideshow._index = false;
	slideshow._transition = "ease-out";
	slideshow._duration = 0.6; 
	slideshow._loading = "incremental";
	slideshow._callback_picked = "picked";
	slideshow._callback_moved = "moved";
	slideshow._callback_dropped = "dropped";
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "selector"			: slideshow._selector			= _options[argument]; break;
				case "layout"			: slideshow._layout				= _options[argument]; break;
				case "navigation"		: slideshow._navigation			= _options[argument]; break;
				case "index"			: slideshow._index				= _options[argument]; break;
				case "transition"		: slideshow._transition			= _options[argument]; break;
				case "duration"			: slideshow._duration			= _options[argument]; break;
				case "callback_picked"	: slideshow._callback_picked	= settings[argument]; break;
				case "callback_moved"	: slideshow._callback_moved		= settings[argument]; break;
				case "callback_dropped"	: slideshow._callback_dropped	= settings[argument]; break;
			}
		}
	}
	slideshow.list = list;
	slideshow._width = slideshow.offsetWidth;
	slideshow._height = slideshow.offsetHeight;
	slideshow.nodes = u.qsa("li"+slideshow._selector, slideshow.list);
	if(slideshow._navigation) {
		slideshow.bn_next = u.ae(slideshow, "div", {"class":"next"});
		slideshow.bn_next.slideshow = slideshow;
		u.e.click(slideshow.bn_next);
		slideshow.bn_next.clicked = function(event) {
			this.slideshow.selectNode(this.slideshow.selected_node._i+1);
		}
		slideshow.bn_prev = u.ae(slideshow, "div", {"class":"prev"});
		slideshow.bn_prev.slideshow = slideshow;
		u.e.click(slideshow.bn_prev);
		slideshow.bn_prev.clicked = function(event) {
			this.slideshow.selectNode(this.slideshow.selected_node._i-1);
		}
	}
	if(slideshow._index) {
		slideshow.index = u.ae(slideshow, "ul", {class:"index"});
		for(i = 0; i < slideshow.nodes.length; i++) {
			node = u.ae(slideshow.index, "li", {class: slideshow.nodes[i].className});
			node.slide = slideshow.nodes[i];
			node.slideshow = slideshow;
			slideshow.nodes[i].index = node;
			u.ce(node);
			node.clicked = function() {
				this.slideshow.selectNode(this.slide._i);
			}
		}
	}
	slideshow.showLoading = function() {
		u.ac(this, "loading");
	}
	slideshow.loading = function() {
		if(!u.t.valid(this.t_loading)) {
			this.t_loading = u.t.setTimer(this, this.showLoading, 1000);
		}
	}
	slideshow._loaded = function() {
		u.t.resetTimer(this.t_loading);
		u.rc(this, "loading");
		if(fun(this.loaded)) {
			this.loaded();
		}
	}
	slideshow.resized = function() {
		u.bug("slideshow resized");
		this._width = this.offsetWidth;
		this._height = this.offsetHeight;
	}
	slideshow.prepare = function() {
		if(this.nodes.length > 1) {
			if(this._layout == "vertical") {
				u.e.swipe(this, this, {"vertical_lock":true, "callback_picked":"slideshow_picked", "callback_moved":"slideshow_moved", "callback_dropped":"slideshow_dropped"});
				this.swipedLeft = this.swipedRight = function(event) {
					this.swiped = false;
				}
				this.swipedUp = function(event) {
					if(this.selected_node._y < 0) {
						this.selectNode(this.selected_node._i+1);
					}
					else {
						this.swiped = false;
					}
				}
				this.swipedDown = function(event) {
					if(this.selected_node._y > 0) {
						this.selectNode(this.selected_node._i-1);
					}
					else {
						this.swiped = false;
					}
				}
			}
			else {
				u.e.swipe(this, this, {"horizontal_lock":true, "callback_picked":"slideshow_picked", "callback_moved":"slideshow_moved", "callback_dropped":"slideshow_dropped"});
				this.swipedDown = this.swipedUp = function(event) {
					this.swiped = false;
				}
				this.swipedLeft = function(event) {
					if(this.selected_node._x < 0) {
						this.selectNode(this.selected_node._i+1);
					}
					else {
						this.swiped = false;
					}
				}
				this.swipedRight = function(event) {
					if(this.selected_node._x > 0) {
						this.selectNode(this.selected_node._i-1);
					}
					else {
						this.swiped = false;
					}
				}
			}
			this.slideshow_picked = function(event) {
				this.prev_node = this.selected_node._i-1 < 0 ? this.nodes[this.nodes.length-1] : this.nodes[this.selected_node._i-1];
				this.next_node = this.selected_node._i+1 >= this.nodes.length ? this.nodes[0] : this.nodes[this.selected_node._i+1];
				this._unclearNode(this.prev_node, "picked prev");
				this._unclearNode(this.next_node, "picked next");
				u.a.transition(this.prev_node, "none");
				u.a.transition(this.selected_node, "none");
				u.a.transition(this.next_node, "none");
				if(this._layout == "vertical") {
					u.a.translate(this.prev_node, 0, -(this._height));
					u.a.translate(this.next_node, 0, (this._height));
				}
				else {
					u.a.translate(this.prev_node, -(this._width), 0);
					u.a.translate(this.next_node, (this._width), 0);
				}
				if(fun(this[this._callback_picked])) {
					this[this._callback_picked](event);
				}
			}
			this.slideshow_moved = function(event) {
				if(this._layout == "vertical") {
					if(this.current_y > 0) {
						u.a.translate(this.prev_node, 0, (this.current_y-this._height));
					}
					else if(this.prev_node._y > -(this._height) && this._prev_node != this._next_node) {
						u.a.translate(this.prev_node, 0, -(this._height));
						this.slideshow._clearNode(this.prev_node, "moved out prev vertical");
					}
					u.a.translate(this.selected_node, 0, this.current_y);
					if(this.current_y < 0) {
						u.a.translate(this.next_node, 0, (this.current_y+this._height));
					}
					else if(this.next_node._y < (this._height) && this._prev_node != this._next_node) {
						u.a.translate(this.next_node, 0, (this._height));
						this.slideshow._clearNode(this.next_node, "moved out next vertical");
					}
				}
				else {
					if(this.current_x > 0) {
						u.a.translate(this.prev_node, (this.current_x-this._width), 0);
					}
					else if(this.prev_node._x > -(this._width) && this._prev_node != this._next_node) {
						u.a.translate(this.prev_node, -(this._width), 0);
						this.slideshow._clearNode(this.next_node, "moved out prev horizontal");
					}
					u.a.translate(this.selected_node, this.current_x, 0);
					if(this.current_x < 0) {
						u.a.translate(this.next_node, (this.current_x+this._width), 0);
					}
					else if(this.next_node._x < (this._width) && this._prev_node != this._next_node) {
						u.a.translate(this.next_node, (this._width), 0);
						this.slideshow._clearNode(this.next_node, "moved out next horizontal");
					}
				}
				if(fun(this[this._callback_moved])) {
					this[this._callback_moved](event);
				}
			}
			this.slideshow_dropped = function(event) {
				if(this._layout == "vertical") {
					if(!this.swiped && this.selected_node._y != 0) {
						var duration = this._duration / (this._height / this.current_y);
						this.selected_node.transitioned = function() {
							u.bug("no swipe cleared (vertical)")
							u.a.transition(this, "none");
							this.slideshow._clearNode(this.slideshow.prev_node, "dropped vert retured prev");
							this.slideshow._clearNode(this.slideshow.next_node, "dropped vert retured next");
						}
						u.a.transition(this.prev_node, "all " + duration + "s " + this._transition);
						u.a.transition(this.selected_node, "all " + duration + "s " + this._transition);
						u.a.transition(this.next_node, "all " + duration + "s " + this._transition);
						u.a.translate(this.prev_node, 0, -(this._height));
						u.a.translate(this.selected_node, 0, 0);
						u.a.translate(this.next_node, 0, (this._height));
					}
				}
				else {
					if(!this.swiped && this.selected_node._x != 0) {
						this.selected_node.transitioned = function() {
							u.bug("no swipe cleared (horizontal)")
							u.a.transition(this, "none");
							this.slideshow._clearNode(this.slideshow.prev_node, "dropped hor retured prev");
							this.slideshow._clearNode(this.slideshow.next_node, "dropped hor retured next");
						}
						var duration = this._duration / (this._width / this.current_x);
						u.a.transition(this.prev_node, "all " + duration + "s " + this._transition);
						u.a.transition(this.selected_node, "all " + duration + "s " + this._transition);
						u.a.transition(this.next_node, "all " + duration + "s " + this._transition);
						u.a.translate(this.prev_node, -(this._width), 0);
						u.a.translate(this.selected_node, 0, 0);
						u.a.translate(this.next_node, (this._width), 0);
					}
				}
				if(fun(this[this._callback_dropped])) {
					this[this._callback_dropped](event);
				}
			}
		}
		if(fun(this.prepared)) {
			this.prepared();
		}
		else {
			this.build();
		}
	}
	slideshow.preload = function(start_with) {
		this.loading();
		if(!this.selected_node) {
			if(start_with) {
				start_with = start_with ? start_with : 0;
				if(this.nodes.length > start_with) {
					this._load_base = this.nodes[start_with];
				}
				else {
					this._load_base = this.nodes[0];
				}
			}
			else if(!this._load_base) {
				this._load_base = this.nodes[0];
			}
		}
		else {
			this._load_base = this.selected_node;
		}
		if(!this._load_base.is_ready) {
			if(fun(this.loadNode)) {
				this.loadNode(this._load_base);
			}
			else {
				this._loadNode(this._load_base);
			}
			return;
		}
		var next_1 = this.nodes.length > this._load_base._i+1 ? this.nodes[this._load_base._i+1] : this.nodes[0];
		if(next_1 && !next_1.is_ready) {
			if(fun(this.loadNode)) {
				this.loadNode(next_1);
			}
			else {
				this._loadNode(next_1);
			}
			return;
		}
		var prev_1 = this._load_base._i > 0 ? this.nodes[this._load_base._i-1] : this.nodes[this.nodes.length-1];
		if(prev_1 && !prev_1.is_ready) {
			if(fun(this.loadNode)) {
				this.loadNode(prev_1);
			}
			else {
				this._loadNode(prev_1);
			}
			return;
		}
		if(next_1) {
			var next_2 = this.nodes.length > next_1._i+1 ? this.nodes[next_1._i+1] : this.nodes[0];
			if(next_2 && !next_2.is_ready) {
				if(fun(this.loadNode)) {
					this.loadNode(next_2);
				}
				else {
					this._loadNode(next_2);
				}
				return;
			}
		}
		if(prev_1) {
			var prev_2 = prev_1._i > 0 ? this.nodes[prev_1._i-1] : this.nodes[this.nodes.length-1];
			if(prev_2 && !prev_2.is_ready) {
				if(fun(this.loadNode)) {
					this.loadNode(prev_2);
				}
				else {
					this._loadNode(prev_2);
				}
				return;
			}
		}
		this._loaded();
		if(fun(this.preloaded)) {
			this.preloaded();
		}
	}
	slideshow.build = function() {
		var i, node;
		for(i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i];
			node.slideshow = this;
			node._i = i;
			u.a.transition(node, "none");
			u.ass(node, {
				transform: "translate3d(0, "+(-this._height)+"px, 0)"
			});
			if(fun(this.buildNode)) {
				this.buildNode(node);
			}
			else {
				this._buildNode(node);
			}
			this._clearNode(node, "initial");
		}
		if(fun(this.built)) {
			this.built();
		}
		else {
			this.preload();
		}
	}
	slideshow._buildNode = function(node) {
	}
	slideshow._loadNode = function(node) {
		if(!node.is_ready) {
			node.is_ready = true;
			var item_id = u.cv(node, "item_id");
			var image_src = false;
			if(item_id) {
				var variant = u.cv(node, "variant");
				var format = u.cv(node, "format");
				image_src = "/images/"+item_id+"/"+variant+"/"+this._width+"x."+format;
			}
			else {
				image_src = node.getAttribute("data-image-src");
			}
			if(image_src) {
				node.loaded = function(queue) {
					u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");
					// 	
					u.ac(this, "ready");
					this.slideshow.preload();
				}
				u.preloader(node, [image_src]);
			}
			else {
				// 	
				u.ac(node, "ready");
				this.preload();
			}
		}
		else {
			this.preload();
		}
	}
	slideshow._clearNode = function(node, comment) {
		node._hidden = true;
		u.ass(node, {
			display: "none"
		});
		u.a.transition(node, "none");
	}
	slideshow._unclearNode = function(node, comment) {
		node._hidden = false;
		u.ass(node, {
			display: "block"
		});
	}
	slideshow.selectNode = function(index, static_update) {
		if(!this.selected_node) {
			this.selected_node = this.nodes[index];
			this._unclearNode(this.selected_node, "hard start show");
			u.a.transition(this.selected_node, "none");
			u.ass(this.selected_node, {
				opacity: 0,
				transform: "translate3d(0, 0, 0)"
			});
			this.selected_node.transitioned = function() {
				if(fun(this.slideshow.nodeEntered)) {
					this.slideshow.nodeEntered(this);
				}
			}
			u.a.transition(this.selected_node, "opacity 0.5s ease-in-out");
			u.ass(this.selected_node, {
				opacity: 1
			})
		}
		else if(this.nodes[index] != this.selected_node) {
			var org_node = this.selected_node;
			this.direction = (index - org_node._i) > 0 ? 1 : -1;
			if(index < 0) {
				index = this.nodes.length-1;
			}
			else if(index >= this.nodes.length) {
				index = 0;
			}
			this.selected_node = this.nodes[index];
			this._unclearNode(this.selected_node, "new selected node");
			if(static_update) {
				u.a.transition(org_node, "none");
				u.a.transition(this.selected_node, "none");
			}
			else if(this.swiped) {
				var duration;
				if(this._layout == "vertical") {
					if(this.current_yps) {
						duration = ((this._height / Math.abs(this.current_yps)) * this._duration);
						duration = duration > this._duration ? this._duration : duration;
					}
					else {
						duration = this._duration / (1 - Math.abs(this.current_y / this._height));
					}
				}
				else {
					if(this.current_xps) {
						duration = ((this._width / Math.abs(this.current_xps)) * this._duration);
						duration = duration > this._duration ? this._duration : duration;
					}
					else {
						duration = this._duration / (1 - Math.abs(this.current_x / this._width));
					}
				}
				duration = (duration > 1.5) ? 1.5 : ((duration < 0.2) ? 0.2 : duration);
				u.a.transition(org_node, "all " + duration + "s " + this._transition);
				u.a.transition(this.selected_node, "all " + duration + "s " + this._transition);
			}
			else {
				if(this._layout == "vertical") {
					u.a.transition(this.selected_node, "none");
					u.a.translate(this.selected_node, 0, this._height*this.direction);
				}
				else {
					u.a.transition(this.selected_node, "none");
					u.a.translate(this.selected_node, this._width*this.direction, 0);
				}
				u.a.transition(org_node, "all " + this._duration + "s " + this._transition);
				u.a.transition(this.selected_node, "all " + this._duration + "s " + this._transition);
			}
			if(!static_update) {
				this.selected_node.transitioned = function() {
					u.a.transition(this, "none");
					if(fun(this.slideshow.nodeEntered)) {
						this.slideshow.nodeEntered(this);
					}
				}
			}
			if(org_node != this.selected_node) {
				org_node.transitioned = function() {
					if(this.slideshow.prev_node && this.slideshow.prev_node != this.slideshow.selected_node) {
						this.slideshow._clearNode(slideshow.prev_node, "prev node cleared on regular transistion");
					}
					if(this.slideshow.next_node && this.slideshow.next_node != this.slideshow.selected_node) {
						this.slideshow._clearNode(slideshow.next_node, "prev node cleared on regular transistion");
					}
					this.slideshow._clearNode(this, "org node cleared");
					if(fun(this.slideshow.nodeCleared)) {
						this.slideshow.nodeCleared(this);
					}
				}
			}
			if(this._layout == "vertical") {
				u.a.translate(org_node, 0, -(this._height*this.direction));
				u.a.translate(this.selected_node, 0, 0);
			}
			else {
				u.a.translate(org_node, -(this._width*this.direction), 0);
				u.a.translate(this.selected_node, 0, 0);
			}
			if(static_update && org_node != this.selected_node) {
				org_node.transitioned();
			}
		}
		if(this.selected_node.index) {
			u.ac(this.selected_node.index, "selected");
		}
		if(org_node && org_node.index) {
			u.rc(org_node.index, "selected");
		}
		this.preload();
		if(fun(this.nodeSelected)) {
			this.nodeSelected(this.selected_node);
		}
	}
	return slideshow;
}


/*u-sharing.js*/
u.injectSharing = function(node) {
	node.sharing = u.ae(node, "div", {"class":"sharing"});
	node.sharing.node = node;
	var ref_point = u.qs("div.comments", node);
	if(ref_point) {
		node.sharing = node.insertBefore(node.sharing, ref_point);
	}
	node.h3_share = u.ae(node.sharing, "h3", {"html":u.txt["share"]});
	if(!u.getCookie("share-info")) {
		node.share_info = u.ae(node.h3_share, "span", {"html":u.txt["share-info-headline"]});
		node.share_info.node = node;
		u.e.hover(node.share_info, {"delay":500});
		node.share_info.over = function() {
			if(!this.hint) {
				this.hint = u.ae(document.body, "div", {"class":"hint"});
				this.hint.share_info = this;
				u.ae(this.hint, "p", {"html":u.txt["share-info-txt"]});
				this.bn_ok = u.ae(this.hint, "a", {"html":u.txt["share-info-ok"]});
				this.bn_ok.share_info = this;
				u.ce(this.bn_ok);
				this.bn_ok.clicked = function(event) {
					u.saveCookie("share-info", 1, {"expires":false, "path":"/"});
					this.share_info.out();
					this.share_info.parentNode.removeChild(this.share_info);
					this.share_info.node.sharing.clicked();
				}
				this.hint.over = function() {
					var share_info_event = new MouseEvent("mouseover", {
						bubbles: true,
						cancelable: true,
						view: window
					});
					this.share_info.dispatchEvent(share_info_event);
					this.share_info.node.sharing.button.dispatchEvent(share_info_event);
				}
				u.e.addEvent(this.hint, "mouseover", this.hint.over);
				this.hint.out = function() {
					var share_info_event = new MouseEvent("mouseout", {
						bubbles: true,
						cancelable: true,
						view: window
					});
					this.share_info.dispatchEvent(share_info_event);
					this.share_info.node.sharing.dispatchEvent(share_info_event);
				}
				u.e.addEvent(this.hint, "mouseout", this.hint.out);
				u.ass(this.hint, {
					"top":(u.absY(this) + this.offsetHeight + 5) + "px",
					"left":(u.absX(this)) + "px"
				});
			}
		}
		node.share_info.out = function() {
			if(this.hint) {
				this.hint.parentNode.removeChild(this.hint);
				delete this.hint;
			}
		}
	}
	node.p_share = u.ae(node.sharing, "p", {"html":node.hardlink});
	u.e.click(node.sharing);
	node.sharing.clicked = function() {
		u.selectText(this.node.p_share);
	}
	node.sharing.svg = u.svg({
		"node":node.sharing,
		"class":"sharing",
		"width":500,
		"height":300,
		"shapes":[
			{
				"type": "line",
				"class": "primary",
				"x1": 6,
				"y1": 150,
				"x2": 22,
				"y2": 150
			},
			{
				"type": "circle",
				"class": "primary",
				"cx": 6,
				"cy": 150,
				"r": 5
			},
			{
				"type": "circle",
				"class": "primary",
				"cx": 22,
				"cy": 150,
				"r": 3
			}
		]
	});
	node.sharing.svg.drawings = 0;
	node.sharing.drawCircle = function(svg, cx, cy) {
		var circle = u.svgShape(svg, {
			"type": "circle",
			"cx": cx,
			"cy": cy,
			"r":  1,
		});
		circle.svg = svg;
		var new_radius = u.random(2, 5);
		circle.transitioned = svg._circle_transitioned;
		u.a.to(circle, "all 100ms linear", {"r":new_radius});
		return circle;
	}
	node.sharing.drawLine = function(svg, x1, y1, x2, y2) {
		x2 = x2 ? x2 : (x1 + u.random(30, 50));
		if(!y2) {
			if(y1 < 150) {
				y2 = y1 + u.random(-50, 30);
			}
			else {
				y2 = y1 + u.random(-30, 50);
			}
		}
		if(x2 < 490 && y2 > 10 && y2 < 290 && (x2 < 70 || x2 > 450 || (y2 < 130 && y1 < 130) || (y2 > 180 && y1 > 180))) {
			var line = u.svgShape(svg, {
				"type": "line",
				"x1": x1,
				"y1": y1,
				"x2": x1,
				"y2": y1
			});
			u.ie(svg, line);
			line.svg = svg;
			line.transitioned = svg._line_transitioned;
			u.a.to(line, "all 150ms linear", {"x2": x2, "y2": y2});
			return line;
		}
		return false;
	}
	node.sharing.svg._line_transitioned = function() {
		this.transitioned = null;
		if(!this.svg.hide) {
			var key = u.randomString(4);
			var cx = Number(this.getAttribute("x2"));
			var cy = Number(this.getAttribute("y2"));
			var circle = this.svg.node.drawCircle(this.svg, cx, cy);
			circle.id = key;
		}
	}
	node.sharing.svg._circle_transitioned = function() {
		this.transitioned = null;
		if(!this.svg.hide) {
			this.svg.drawings++;
			if(this.svg.drawings < 50) {
				var x1 = Number(this.getAttribute("cx"));
				var y1 = Number(this.getAttribute("cy"));
				var r = Number(this.getAttribute("r"));
				var line, i;
				if(r >= 5 && this.svg.drawings < 6) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, -60));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(50, 60), y1 + u.random(-20, 20));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(40, 60));
				}
				else if(r >= 4) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(-15, -40));
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(20, 70), y1 + u.random(15, 40));
				}
				else if(r >= 3 || this.svg.drawings%2 == 1) {
					line = this.svg.node.drawLine(this.svg, x1, y1, x1 + u.random(30, 60), y1 + u.random(-40, 40));
				}
				else {}
			}
		}
	}
	node.sharing.button = u.svgShape(node.sharing.svg, {
		"type": "rect",
		"class": "share",
		"x": 0,
		"y": 130,
		"width": 40,
		"height": 40,
		"fill": "transparent"
	});
	node.sharing.button._x1 = 22;
	node.sharing.button._y1 = 150;
	node.sharing.button.sharing = node.sharing;
	node.sharing.button.over = function() {
		u.t.resetTimer(this.t_hide);
		u.ac(this.sharing, "hover");
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(-55, -40));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(-20, -15));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(70, 120), this._y1 + u.random(15, 20));
		this.sharing.drawLine(node.sharing.svg, this._x1, this._y1, u.random(this._x1, 70), this._y1 + u.random(40, 55));
	}
	node.sharing.button.out = function() {
		var circles = u.qsa("circle:not(.primary)", this.sharing.svg);
		var lines = u.qsa("line:not(.primary)", this.sharing.svg);
		var line, circle, i;
		u.rc(this.sharing, "hover");
		this.sharing.svg.hide = true;
		this.sharing.svg.drawings = 0;
		for(i = 0; circle = circles[i]; i++) {
			circle.transitioned = function() {
				this.transitioned = null;
				this.svg.removeChild(this);
			}
			u.a.to(circle, "all 0.15s linear", {"r":0});
		}
		for(i = 0; line = lines[i]; i++) {
			x1 = Number(line.getAttribute("x1"));
			y1 = Number(line.getAttribute("y1"));
			x2 = Number(line.getAttribute("x2"));
			y2 = Number(line.getAttribute("y2"));
			new_x = x2 - ((x2-x1)/2);
			if(y1 < y2) {
				new_y = y2 - ((y2-y1)/2);
			}
			else {
				new_y = y1 - ((y1-y2)/2);
			}
			line.transitioned = function() {
				this.transitioned = null;
				this.svg.removeChild(this);
			}
			u.a.to(line, "all 0.25s linear", {"x1":new_x, "y1":new_y, "x2":new_x, "y2":new_y});
		}
		u.t.setTimer(this.sharing.svg, function() {this.hide = false;}, 250);
	}
	node.sharing.button.toggle = function(event) {
		if(u.hc(this.sharing, "hover")) {
			this.out(event);
		}
		else {
			this.over(event);
		}
	}
	node.sharing.autohide = function() {
		u.t.resetTimer(this.button.t_hide);
		this.button.t_hide = u.t.setTimer(this.button, this.button.out, 500);
	}
	if(u.e.event_support == "mouse") {
		u.e.addEvent(node.sharing.button, "mouseover", node.sharing.button.over);
		u.e.addEvent(node.sharing, "mouseleave", node.sharing.autohide);
	}
	else {
		u.e.addStartEvent(node.sharing.button, node.sharing.button.toggle);
	}
	if(typeof(node.sharingInjected) == "function") {
		node.sharingInjected();
	}
}


/*u-expandarrow.js*/
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
u.addPreviousArrow = function(node) {
	node.arrow = u.svg({
		"name":"prevearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 9,
				"y1": 2,
				"x2": 2,
				"y2": 7
			},
			{
				"type": "line",
				"x1": 2,
				"y1": 6,
				"x2": 9,
				"y2": 11
			}
		]
	});
}
u.addNextArrow = function(node) {
	node.arrow = u.svg({
		"name":"nextearrow",
		"node":node,
		"class":"arrow",
		"width":17,
		"height":17,
		"shapes":[
			{
				"type": "line",
				"x1": 2,
				"y1": 2,
				"x2": 9,
				"y2": 7
			},
			{
				"type": "line",
				"x1": 9,
				"y1": 6,
				"x2": 2,
				"y2": 11
			}
		]
	});
}


/*m-comments.js*/
Util.Modules["comments"] = new function() {
	this.init = function(div) {
		div.item_id = u.cv(div, "item_id");
		div.list = u.qs("ul.comments", div);
		div.comments = u.qsa("li.comment", div.list);
		div.header = u.qs("h2", div);
		div.header.div = div;
		u.addExpandArrow(div.header);
		u.ce(div.header);
		div.header.clicked = function() {
			if(u.hc(this.div, "open")) {
				u.rc(this.div, "open");
				u.addExpandArrow(this);
				u.saveCookie("comments_open_state", 0, {"path":"/"});
			}
			else {
				u.ac(this.div, "open");
				u.addCollapseArrow(this);
				u.saveCookie("comments_open_state", 1, {"path":"/"});
			}
		}
		div.comments_open_state = u.getCookie("comments_open_state", {"path":"/"});
		if(div.comments_open_state == 1) {
			div.header.clicked();
		}
		div.initComment = function(node) {
			node.div = this;
		}
		div.csrf_token = div.getAttribute("data-csrf-token");
		div.add_comment_url = div.getAttribute("data-comment-add");
		if(div.add_comment_url && div.csrf_token) {
			div.actions = u.ae(div, "ul", {"class":"actions"});
			div.bn_comment = u.ae(u.ae(div.actions, "li", {"class":"add"}), "a", {"html":u.txt["add_comment"], "class":"button primary comment"});
			div.bn_comment.div = div;
			u.ce(div.bn_comment);
			div.bn_comment.clicked = function() {
				var actions, bn_add, bn_cancel;
				u.as(this.div.actions, "display", "none");
				this.div.form = u.f.addForm(this.div, {"action":this.div.add_comment_url+"/"+this.div.item_id, "class":"add labelstyle:inject"});
				this.div.form.div = div;
				u.ae(this.div.form, "input", {"type":"hidden","name":"csrf-token", "value":this.div.csrf_token});
				u.f.addField(this.div.form, {"type":"text", "name":"item_comment", "label":u.txt["comment"]});
				actions = u.ae(this.div.form, "ul", {"class":"actions"});
				bn_add = u.f.addAction(actions, {"value":u.txt["add_comment"], "class":"button primary update", "name":"add"});
				bn_add.div = div;
				bn_cancel = u.f.addAction(actions, {"value":u.txt["cancel"], "class":"button cancel", "type":"button", "name":"cancel"});
				bn_cancel.div = div;
				u.f.init(this.div.form);
				this.div.form.submitted = function() {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							if(!div.list) {
								var p = u.qs("p", div);
								if(p) {
									p.parentNode.removeChild(p);
								}
								div.list = u.ie(div, "ul", {"class":"comments"});
								div.insertBefore(div.list, div.actions);
							}
							var comment_li = u.ae(this.div.list, "li", {"class":"comment comment_id:"+response.cms_object["id"]});
							var info = u.ae(comment_li, "ul", {"class":"info"});
							u.ae(info, "li", {"class":"created_at", "html":response.cms_object["created_at"]});
							u.ae(info, "li", {"class":"author", "html":response.cms_object["nickname"]});
							u.ae(comment_li, "p", {"class":"comment", "html":response.cms_object["comment"]})
							this.div.initComment(comment_li);
							this.parentNode.removeChild(this);
							u.as(this.div.actions, "display", "");
						}
					}
					u.request(this, this.action, {"method":"post", "data":this.getData()});
				}
				u.ce(bn_cancel);
				bn_cancel.clicked = function(event) {
					u.e.kill(event);
					this.div.form.parentNode.removeChild(this.div.form);
					u.as(this.div.actions, "display", "");
				}
			}
		}
		else {
			u.ae(div, "p", {"html": (u.txt["login_to_comment"] ? u.txt["login_to_comment"] : "Login or signup to comment")});
		}
		var i, node;
		for(i = 0; node = div.comments[i]; i++) {
			div.initComment(node);
		}
	}
}


/*m-pagination.js*/
Util.Modules["pagination"] = new function() {
	this.init = function(pagination) {
		if(pagination) {
			u.ae(document.body, pagination);
			u.as(pagination, "transform", "none");
			var next = u.qs(".next", pagination);
			if(next) {
				u.addNextArrow(next);
				next.a = u.qs("a", next);
				u.ce(next, {"type":"link"});
				u.e.hover(next);
				next.over = function() {
					u.ass(this, {
						"width":this.a.offsetWidth+"px"
					});
					u.ass(this.a, {
						"opacity":1
					});
				}
				next.out = function() {
					u.ass(this.a, {
						"opacity":0
					});
					u.ass(this, {
						"width":0
					});
				}
			}
			var prev = u.qs(".previous", pagination);
			if(prev) {
				u.addPreviousArrow(prev);
				prev.a = u.qs("a", prev);
				u.ce(prev, {"type":"link"});
				u.e.hover(prev);
				prev.over = function() {
					u.ass(this, {
						"width":this.a.offsetWidth+"px"
					});
					u.ass(this.a, {
						"opacity":1
					});
				}
				prev.out = function() {
					u.ass(this.a, {
						"opacity":0
					});
					u.ass(this, {
						"width":0
					});
				}
			}
		}
	}
}


/*m-article_list.js*/
Util.Modules["articleList"] = new function() {
	this.init = function(list) {
		list.articles = u.qsa("li.article", list);
		list.resized = function() {
			this.browser_h = u.browserH();
			this.screen_middle = this.browser_h/2;
		}
		list.scrolled = function(event) {
			u.t.resetTimer(this.t_init);
			this.scroll_y = u.scrollY();
			if(this._next_url) {
				var i, node, node_y, list_y;
				list_y = u.absY(this);
				if(list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
					this.loadNext();
				}
			}
			this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);
		}
		list.initFocusedArticles = function() {
			var i, node, node_y;
			for(i = 0; node = this.articles[i]; i++) {
				if(!node.is_ready) {
					node_y = u.absY(node);
					if(node_y > this.scroll_y + this.browser_h) {
						break;
					}
					else if(
						(
							node_y + node.offsetHeight > this.scroll_y && 
							node_y + node.offsetHeight < this.scroll_y + this.browser_h
						)
						 || 
						(
							node_y > this.scroll_y &&
							node_y < this.scroll_y + this.browser_h
						)
						 ||
						(
							node_y < this.scroll_y &&
							node_y + node.offsetHeight > this.scroll_y + this.browser_h
						)
					) {
						u.m.article.init(node);
						node.is_ready = true;
					}
				}
			}
		}
		list.correctScroll = function(div_image) {
			if(this.scroll_y) {
				var image_node_y = u.absY(div_image);
				if(image_node_y < this.scroll_y + this.screen_middle) {
					var new_scroll_y = this.scroll_y + (div_image.offsetHeight);
					window.scrollTo(0, new_scroll_y);
				}
			}
		}
		var next = u.qs(".pagination li.next a", list.parentNode);
		list._next_url = false;
		if(next) {
			u.ac(u.pn(next, {include:"div"}), "autoload");
			list._next_url = next ? next.href : false;
		}
		list.loadNext = function() {
			if(this._next_url) {
				this.response = function(response) {
					var articles = u.qsa("li.article", response);
					var i, node;
					for(i = 0; i < articles.length; i++) {
						node = u.ae(this, articles[i]);
						node.article_list = this;
					}
					var next = u.qs(".pagination li.next a", response);
					this._next_url = next ? next.href : false;
					this.articles = u.qsa("li.article", this);
				}
				u.request(this, this._next_url);
				this._next_url = false;
			}
		}
		var i, node;
		for(i = 0; node = list.articles[i]; i++) {
			node.article_list = list;
		}
		list.resized();
		list.scrolled();
		u.e.addWindowEvent(list, "resize", list.resized);
		u.e.addWindowEvent(list, "scroll", list.scrolled);
	}
}


/*m-article_preview_list.js*/
Util.Modules["articlePreviewList"] = new function() {
	this.init = function(list) {
		list.articles = u.qsa("li.article", list);
		list.initArticle = function(article) {
			article._a = u.qs("h3 a", article);
			if(article._a) {
				article._link = article._a.href ? article._a.href : article._a.url;
			}
			article._description_p = u.qs("div.description p", article)
			if(article._description_p && article._link) {
				u.ae(article._description_p, "br");
				u.ae(article._description_p, "a", {href: article._link, class:"readmore", html:u.txt("readmore")});
			}
			var i, image;
			article._images = u.qsa("div.image,div.media", article);
			for(i = 0; image = article._images[i]; i++) {
				image.node = article;
				image.caption = u.qs("p a", image);
				if(image.caption) {
					image.caption.removeAttribute("href");
				}
				image._id = u.cv(image, "item_id");
				image._format = u.cv(image, "format");
				image._variant = u.cv(image, "variant");
				if(image._id && image._format) {
					image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
					u.ass(image, {
						"opacity": 0
					});
					image.loaded = function(queue) {
						u.ac(this, "loaded");
						this._image = u.ie(this, "img");
						this._image.image = this;
						this._image.src = queue[0].image.src;
						if(this.node.article_list && fun(this.node.article_list.correctScroll)) {
							this.node.article_list.correctScroll(this);
						}
						u.ce(this._image);
						this._image.clicked = function() {
							if(u.hc(this.image, "fullsize")) {
								u.a.transition(this, "all 0.3s ease-in-out");
								u.rc(this.image, "fullsize");
								this.src = this.image._image_src;
								u.ass(this, {
									width: ""
								});
							}
							else {
								u.a.transition(this, "all 0.3s ease-in-out");
								u.ac(this.image, "fullsize");
								u.ass(this, {
									width: (page.browser_w < 1080 ? page.browser_w : 1080) + "px"
								});
								if(this._fullsize_src) {
									this.src = this._fullsize_src;
								}
								else {
									this._fullsize_width = 1080;
									this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									this.response = function() {
										this.src = this._fullsize_src;
									}
									this.responseError = function() {
										this._fullsize_width = this._fullsize_width-200;
										this._fullsize_src = "/images/" + this._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
										u.request(this, this._fullsize_src);
									}
									u.request(this, this._fullsize_src);
								}
							}
						}
						u.a.transition(this, "all 0.5s ease-in-out");
						u.ass(this, {
							"opacity": 1
						});
					}
					u.preloader(image, [image._image_src]);
				}
			}
			var video;
			article._videos = u.qsa("div.youtube, div.vimeo", article);
			for (i = 0; video = article._videos[i]; i++) {
				video._src = u.cv(video, "video_id");
				video._type = video._src.match(/youtube|youtu\.be/) ? "youtube" : "vimeo";
				if (video._type == "youtube") {
					video._id = video._src.match(/watch\?v\=/) ? video._src.split("?v=")[1] : video._src.split("/")[video._src.split("/").length-1];
					video.iframe = u.ae(video, "iframe", {
						src: 'https://www.youtube.com/embed/'+video._id+'?autoplay=false&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1',
						id: "ytplayer",
						type: "text/html",
						webkitallowfullscreen: true,
						mozallowfullscreen: true,
						allowfullscreen: true,
						frameborder: 0,
						allow: "autoplay",
						sandbox:"allow-same-origin allow-scripts",
						width: "100%",
						height: 540 / 1.7777,
					});
				}
				else {
					video._id = video._src.split("/")[video._src.split("/").length-1];
					video.iframe = u.ae(video, "iframe", {
						src: 'https://player.vimeo.com/video/'+video._id+'?autoplay=false&loop=0&byline=0&portrait=0',
						webkitallowfullscreen: true,
						mozallowfullscreen: true,
						allowfullscreen: true,
						frameborder: 0,
						sandbox:"allow-same-origin allow-scripts",
						width: "100%",
						height: 540 / 1.7777,
					});
				}
			}
			var header = u.qs("h2,h3", article);
			header.current_readstate = article.getAttribute("data-readstate");
			if(header.current_readstate) {
				u.ac(header, "read");
				u.addCheckmark(header);
			}
			article.geolocation = u.qs("ul.geo", article);
			if(article.geolocation && typeof(u.injectGeolocation) == "function") {
				u.injectGeolocation(article);
			}
		}
		list.resized = function() {
			this.browser_h = u.browserH();
			this.screen_middle = this.browser_h/2;
		}
		list.scrolled = function(event) {
			u.t.resetTimer(this.t_init);
			this.scroll_y = u.scrollY();
			if(this._next_url) {
				var i, node, node_y, list_y;
				list_y = u.absY(this);
				if(list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
					this.loadNext();
				}
			}
			this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);
		}
		list.initFocusedArticles = function() {
			var i, node, node_y;
			for(i = 0; node = this.articles[i]; i++) {
				if(!node.is_ready) {
					node_y = u.absY(node);
					if(node_y > this.scroll_y + this.browser_h) {
						break;
					}
					else if(
						(
							node_y + node.offsetHeight > this.scroll_y && 
							node_y + node.offsetHeight < this.scroll_y + this.browser_h
						)
						 || 
						(
							node_y > this.scroll_y &&
							node_y < this.scroll_y + this.browser_h
						)
						 ||
						(
							node_y < this.scroll_y &&
							node_y + node.offsetHeight > this.scroll_y + this.browser_h
						)
					) {
						this.initArticle(node);
						node.is_ready = true;
					}
				}
			}
		}
		list.correctScroll = function(div_image) {
			if(this.scroll_y) {
				var image_node_y = u.absY(div_image);
				if(image_node_y < this.scroll_y + this.screen_middle) {
					var new_scroll_y = this.scroll_y + (div_image.offsetHeight);
					window.scrollTo(0, new_scroll_y);
				}
			}
		}
		var next = u.qs(".pagination li.next a", list.parentNode);
		list._next_url = false;
		if(next) {
			u.ac(u.pn(next, {include:"div"}), "autoload");
			list._next_url = next ? next.href : false;
		}
		list.loadNext = function() {
			if(this._next_url) {
				this.response = function(response) {
					var articles = u.qsa("li.article", response);
					var i, node;
					for(i = 0; i < articles.length; i++) {
						node = u.ae(this, articles[i]);
						node.article_list = this;
					}
					var next = u.qs(".pagination li.next a", response);
					this._next_url = next ? next.href : false;
					this.articles = u.qsa("li.article", this);
				}
				u.request(this, this._next_url);
				this._next_url = false;
			}
		}
		var i, node;
		for(i = 0; node = list.articles[i]; i++) {
			node.article_list = list;
		}
		list.resized();
		list.scrolled();
		u.e.addWindowEvent(list, "resize", list.resized);
		u.e.addWindowEvent(list, "scroll", list.scrolled);
	}
}


/*m-signup.js*/
Util.Modules["signup"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_signup = u.qs("form.signup", this);
			var place_holder = u.qs("div.articlebody .placeholder.signup", this);
			if(form_signup && place_holder) {
				place_holder.parentNode.replaceChild(form_signup, place_holder);
			}
			if(form_signup) {
				u.f.init(form_signup);
			}
			form_signup.submitted = function() {
				var data = this.getData();
				this.is_submitting = true; 
				u.ac(this, "submitting");
				u.ac(this.actions["signup"], "disabled");
				this.response = function(response, request_id) {
					if (u.qs(".scene.verify", response)) {
						u.bug(response);
						scene.replaceScene(response);
						var url_actions = this[request_id].response_url.replace(location.protocol + "://" + document.domain, "");
						u.h.navigate(url_actions, false, true);
					}
					else {
						if (this.is_submitting) {
							this.is_submitting = false; 
							u.rc(this, "submitting");
							u.rc(this.actions["signup"], "disabled");
						}
						if (this.error) {
							this.error.parentNode.removeChild(this.error);
						}
						this.error = scene.showMessage(this, response);
						u.ass(this.error, {
							transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
							opacity:0
						});
						u.a.transition(this.error, "all .6s ease");
						u.ass(this.error, {
							transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
							opacity:1
						});
					}
				}
				u.request(this, this.action, {"data":data, "method":"POST"});
			}
			u.showScene(this);
		}
		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); 
			u.init();
			new_scene.ready();
			return new_scene;
		}
		scene.showMessage = function(form, response) {
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));
			if (!current_error) {
				u.ie(form, new_error);
			}
			else {
				form.replaceChild(new_error, current_error);
			}
			return new_error;
		}
		page.cN.scene = scene;
	}
}


/*m-verify.js*/
Util.Modules["verify"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_verify = u.qs("form.verify_code", this);
			if(form_verify) {
				u.f.init(form_verify);
			}
			form_verify.submitted = function() {
				var data = this.getData();
				this.is_submitting = true; 
				u.ac(this, "submitting");
				u.ac(this.actions["verify"], "disabled");
				u.ac(this.actions["skip"], "disabled");
				this.response = function(response, request_id) {
					if (u.qs(".scene.login", response)) {
						scene.replaceScene(response);
						u.h.navigate("/login", false, true);
					}
					else if (u.qs(".scene.confirmed", response)) {
						scene.replaceScene(response);
						var url_actions = this[request_id].response_url.replace(location.protocol + "://" + document.domain, "");
						u.h.navigate(url_actions, false, true);
					}
					else {
						if (this.is_submitting) {
							this.is_submitting = false; 
							u.rc(this, "submitting");
							u.rc(this.actions["verify"], "disabled");
							u.rc(this.actions["skip"], "disabled");
						}
						if (this.error) {
							this.error.parentNode.removeChild(this.error);
						}
						this.error = scene.showMessage(this, response);
						u.ass(this.error, {
							transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
							opacity:0
						});
						u.a.transition(this.error, "all .6s ease");
						u.ass(this.error, {
							transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
							opacity:1
						});
					}
				}
				u.request(this, this.action, {"data":data, "method":"POST", "responseType":"document"});
			}
			u.showScene(this);
		}
		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); 
			u.init();
			new_scene.ready();
			return new_scene;
		}
		scene.showMessage = function(form, response) {
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));
			if (!current_error) {
				u.ie(form, new_error);
			}
			else {
				form.replaceChild(new_error, current_error);
			}
			return new_error;
		}
		page.cN.scene = scene;
	}
}


/*m-wishes.js*/
Util.Modules["wishes"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			u.bug("scene.resized:", this);
			if(this.nodes && this.nodes.length && this.has_images) {
				var text_width = this.nodes[0].offsetWidth - this.image_width;
				for(i = 0; node = this.nodes[i]; i++) {
					u.as(node.text_mask, "width", text_width+"px", false);
				}
			}
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.image_width = 250;
			this.ul_wishes = u.qs("ul.wishes", this);
			this.has_images = u.hc(this.ul_wishes, "images");
			this.confirm_reserve_text = this.ul_wishes.getAttribute("data-confirm-reserve") || "Save";
			this.nodes = u.qsa("li.item", this);
			u.bug("this.nodes", this.nodes);
			if(this.nodes.length) {
				var text_width = this.nodes[0].offsetWidth - this.image_width;
				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {
					node.scene = this;
					if(this.has_images) {
						node.item_id = u.cv(node, "id");
						node.image_format = u.cv(node, "format");
						node.image_variant = u.cv(node, "variant");
						node.image_mask = u.ae(node, "div", {"class":"image"});
						node.text_mask = u.ae(node, "div", {"class":"text"});
						u.as(node.text_mask, "width", text_width+"px", false);
						if(node.image_format) {
							u.as(node.image_mask, "backgroundImage", "url(/images/"+node.item_id+"/"+node.image_variant+"/"+this.image_width+"x."+node.image_format+")");
						}
						else {
							u.as(node.image_mask, "backgroundImage", "url(/images/0/missing/"+this.image_width+"x.png)");
						}
						node._header = u.qs("h3", node);
						if(node._header) {
							u.ae(node.text_mask, node._header);
						}
						node._info = u.qs("dl.info", node);
						if(node._info) {
							u.ae(node.text_mask, node._info);
						}
						node._actions = u.qs("ul.actions", node);
						if(node._actions) {
							u.ae(node.text_mask, node._actions);
						}
						node._description = u.qs("div.description", node);
						if(node._description) {
							u.ae(node.text_mask, node._description);
						}
					}
					node.reserve_form = u.qs("li.reserve form", node);
					if(node.reserve_form) {
						node.reserve_form.node = node;
						u.f.init(node.reserve_form);
						node.reserve_form.submitted = function() {
							if(this.is_active) {
								this.response = function(response) {
									page.notify(response);
									if(response.cms_status == "success") {
										location.reload(true);
									}
								}
								u.request(this, this.action, {"method":this.method, "data":this.getData()});
							}
							else {
								this.actions["reserve"].value = this.node.scene.confirm_reserve_text;
								u.ass(this.inputs["reserved"], {
									"display":"block"
								});
								this.is_active = true;
							}
						}
					}
					node.li_unreserve = u.qs("li.unreserve", node);
					node.form_unreserve = u.qs("li.unreserve form", node);
					if(node.li_unreserve && node.form_unreserve) {
						node.li_unreserve.confirmed = function() {
							this.response = function(response) {
								page.notify(response);
								if(response.cms_status == "success") {
									location.reload(true);
								}
							}
							u.request(this, this.form.action, {"method":this.form.method, "data":this.form.getData()});
						}
					}
				}
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-columns.js*/
Util.Modules["columns"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.columns(this, [
				{"c200": [
					"div.article", 
					"div.articles",
					"div.related"
				]},
				{"c100": [
					".search",
					".categories"
				]},
				{"c300": [
					"div.company"
				]}
			]);
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-search.js*/
Util.Modules["search"] = new function() {
	this.init = function(div) {
		div.form = u.qs("form", div);
		if(div.form) {
			u.f.init(div.form);
		}
	}
}


/*m-front.js*/
Util.Modules["front"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			if(this.intro) {
				if(!this.intro.is_small) {
					u.ass(this.intro, {
						"height": page.browser_h + "px",
						"width": page.browser_w + "px"
					});
				}
				else {
					var width = (this.intro.parentNode.offsetWidth - 100);
					u.ass(this.intro, {
						"height": (width / (540 / 350)) + "px",
						"width": width + "px"
					});
				}
			}
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			page.cN.scene = this;
			this.fontsLoaded = function() {
				u.columns(this, [
					{"c-main": [
						"div.intro", 
						"div.article", 
						"div.news"
					]},
					{"c-sidebar": [
						".all_events",
					]},
					{"c300": [
						"div.company"
					]}
				]);
				page.resized();
				this.build();
			}
			u.fontsReady(this, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			]);
		}
		scene.build = function() {
			var intro_cookie = u.getCookie("intro_v1");
			if (u.qs(".intro", this)) {
				this.intro = u.qs(".intro", this);
				this.intro.scene = this;
				this.showLoader();
			}
			if(!intro_cookie && this.intro) {
				this.show_full_intro = true;
				this.initIntro();
			}
			else if (intro_cookie && this.intro) {
				this.show_full_intro = false;
				this.initShortIntro();
			}
			else {
				this.initNoIntro();
			}
		}
		scene.showLoader = function() {
			this.intro_loader = u.ae(this.intro, "div", {"class":"loader"});
			this.intro_loader_dot = u.ae(this.intro_loader, "div", {"class":"dot"});
			this.intro_loader_dot.scene = this;
			this.intro_loader_dot.loaderAnimation = function() {
				var random = u.random(0, 5);
				u.a.transition(this, "all 0.3s ease-in-out");
				u.ass(this, {
					"transform":"scale("+random+")",
				});
			}
			this.t_intro_loader = u.t.setInterval(this.intro_loader_dot, "loaderAnimation", 300);
		}
		scene.removeLoader = function() {
			u.t.resetInterval(this.t_intro_loader);
			this.intro_loader_dot.transitioned = function() {
				this.scene.intro_loader.parentNode.removeChild(this.scene.intro_loader);
			}
			u.a.transition(this.intro_loader_dot, "all 0.2s ease-in-out");
			u.ass(this.intro_loader_dot, {
				"transform":"scale(25)",
			});
		}
		scene.createIntroBgs = function() {
			u.preloader(this.intro, [
				"/img/intro/bg_front_1.jpg",
				"/img/intro/bg_front_2.jpg",
				"/img/intro/bg_front_3.jpg",
				"/img/intro/bg_front_4.jpg",
				"/img/intro/bg_front_5.jpg",
				"/img/intro/bg_front_6.jpg",
				"/img/intro/bg_front_7.jpg",
			]);
			this.intro.bgs = [""];
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg1", "html":"<h2>do you</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg2", "html":"<h2>want</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg3", "html":"<h2>to make</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg4", "html":"<h2>a</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg5", "html":"<h2>difference?</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg6", "html":"<h2>welcome</h2>"}));
			this.intro.bgs.push(u.ae(this.intro, "div", {"class":"bg bg7", "html":"<h2>to the club</h2>"}));
		}
		scene.injectHotspots = function() {
			var ul_hotspots = u.ae(this.intro, "ul", {"class":"hotspots"});
			u.ce(ul_hotspots);
			ul_hotspots.clicked = function(event) {
				u.e.kill(event);
			}
			this.intro.hotspots = [""];
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot1", "html":"t"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot2", "html":"h"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot3", "html":"i"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot4", "html":"n"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot5", "html":"k"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot6", "html":"d"}));
			this.intro.hotspots.push(u.ae(ul_hotspots, "li", {"class":"hotspot hotspot7", "html":"k"}));
			var i;
			for(i = 1; i < this.intro.hotspots.length; i++) {
				this.intro.hotspots[i].intro = this.intro;
				this.intro.hotspots[i].i = i;
				this.intro.hotspots[i].over = function(event) {
					this.intro.scene.showIntroFrame(this.i);
				}
				u.e.addOverEvent(this.intro.hotspots[i], this.intro.hotspots[i].over);
			}
			this.hideIntro();
			this.intro.is_active = true;
		}
		scene.showIntroFrame = function(frame) {
			if(this.frame != frame) {
				u.ass(this.intro.bgs[frame], {
					"opacity":0,
					"display":"block",
				});
				u.a.transition(this.intro.bgs[frame], "all 0.15s ease-in-out");
				u.ass(this.intro.bgs[frame], {
					"opacity":1,
				});
				if(this.intro.hotspots) {
					u.ac(this.intro.hotspots[frame], "selected");
				}
				if(this.frame) {
					u.a.transition(this.intro.bgs[this.frame], "all 0.15s ease-in-out 0.05s");
					u.ass(this.intro.bgs[this.frame], {
						"opacity":0,
					});
					if(this.intro.hotspots) {
						u.rc(this.intro.hotspots[this.frame], "selected");
					}
				}
				this.frame = frame;
			}
			// 
		}
		scene.showCarousel = function() {
			this.intro.loaded = function() {
				this.scene.injectHotspots();
				u.textscaler(this, {
					"min_height":400,
					"max_height":1000,
					"min_width":600,
					"max_width":1300,
					"unit":"rem",
					"h2":{
						"min_size":4,
						"max_size":6
					},
					"h3":{
						"min_size":3,
						"max_size":6
					},
					"p":{
						"min_size":2,
						"max_size":4
					}
				});
				this.scene.showIntroFrame(u.random(1, this.bgs.length-1));
			}
			this.createIntroBgs();
		}
		scene.initNoIntro = function() {
			u.bug("initNoIntro");
			this.intro = u.ie(scene, "div", {class:"intro"});
			this.intro.scene = this;
			this.showCarousel();
		}
		scene.initShortIntro = function() {
			u.bug("initShortIntro");
			this.removeLoader();
			this.showCarousel();
		}
		scene.initIntro = function() {
			 u.bug("initIntro")
			this.intro._textnodes = u.qsa("p,h2,h3,h4", this.intro);
			if(this.intro._textnodes.length) {
				u.textscaler(this.intro, {
					"min_height":400,
					"max_height":1000,
					"min_width":600,
					"max_width":1300,
					"unit":"rem",
					"h2":{
						"min_size":4,
						"max_size":6
					},
					"h3":{
						"min_size":3,
						"max_size":6
					},
					"p":{
						"min_size":2,
						"max_size":4
					}
				});
				u.ass(this.intro, {
					"height": page.browser_h + "px",
					"width": page.browser_w + "px",
					"opacity": 1,
				});
				var i, node;
				for(i = 0; node = this.intro._textnodes[i]; i++) {
					u.ass(node, {
						"position":"absolute",
						"opacity": 0, 
						"right": "50px", 
						"bottom": (50) + "px",
					});
				}
				u.ass(this, {
					"height":this.intro.offsetHeight - page.hN.offsetHeight+"px"
				});
				this.intro.loaded = function() {
					this.scene.showIntro();
				}
				this.createIntroBgs();
			}
			else {
				this.hideIntro();
			}
		}
		scene.showIntro = function() {
			var node, duration, i;
			this.intro.audioPlayer = u.audioPlayer({autoplay:true});
			this.intro.audioPlayer.playing = function(event) {
				u.t.resetTimer(this.t_timeout);
				var _time = event.target.currentTime;
				this.intro.timestamps = ["", 2330, 2625, 2900, 3200, 3487, 4349, 4645];
				u.t.setTimer(this.intro.scene, "removeLoader", this.intro.timestamps[1]-_time - 200);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[1]-_time, 1);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[2]-_time, 2);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[3]-_time, 3);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[4]-_time, 4);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[5]-_time, 5);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[6]-_time, 6);
				u.t.setTimer(this.intro.scene, "showIntroFrame", this.intro.timestamps[7]-_time, 7);
				u.t.setTimer(this.intro.scene, "injectHotspots", 6045 - _time);
				delete this.playing;
			}
			u.ae(this, this.intro.audioPlayer);
			this.intro.audioPlayer.timeout = function() {
				if(this.currentTime) {
					this.playing({"target":{"currentTime":this.currentTime}});
				}
				else {
					this.stop();
					this.playing({"target":{"currentTime":2000}});
				}
			}
			this.intro.audioPlayer.ready = function() {
				if(this.can_autoplay) {
					this.t_timeout = u.t.setTimer(this, "timeout", 4000);
					this.load("/assets/audio/intro-4-2.mp3");
				}
				else {
					this.playing({"target":{"currentTime":2000}});
				}
			}
			this.intro.audioPlayer.intro = this.intro;
			//         
			//         
		}
		scene.hideIntro = function() {
			u.saveCookie("intro_v1", 1, {"expires":false});
			// 	
			// 	
			// 	
			if(!this.intro.is_active) {
				u.ass(this, {
					"height":"auto"
				});
				u.ce(this.intro);
				this.intro.clicked = function() {
					u.a.transition(this, "all .5s ease-in-out");
					u.a.transition(this.scene._article, "all .5s ease-in-out");
					if(this.is_small) {
						u.ass(this, {
							"width": page.browser_w + "px",
							"height": page.browser_h + "px",
							"top": "-150px",
							"left": "0px",
							"border-radius":"0px",
							"cursor":"zoom-out",
						});
						u.ass(this.scene._article, {
							"margin-top": "-70px",
						});
						this.is_small = false;
					}
					else {
						u.ass(this, {
							"width": "540px",
							"top": 0,
							"height": 350 + "px",
							"left": "50px",
							"border-radius":"5px",
							"cursor":"zoom-in",
						});
						u.ass(this.scene._article, {
							"margin-top": "50px",
						});
						this.is_small = true;
					}
				}
				if(this.frame) {
					u.ac(this.intro.hotspots[this.frame], "selected");
				}
				if(this.show_full_intro) {
					u.a.transition(this.intro, "all .5s ease-in-out");
				}
				var width = (this.intro.parentNode.offsetWidth - 100);
				u.ass(this.intro, {
					"width": width + "px",
					"top": 0,
					"height": (width / (540 / 350))+"px",
					"left": "50px",
					"border-radius":"5px",
					"cursor":"zoom-in",
				});
				this.intro.is_small = true;
				u.a.transition(this.intro, "all .5s ease-in-out");
				u.ass(this.intro, {
					"opacity":1,
				});
				u.a.transition(page.hN, "none");
				u.ass(page.hN, {
					"opacity":0,
					"display":"block"
				});
				u.a.transition(page.fN, "none");
				u.ass(page.fN, {
					"opacity":0,
					"display":"block"
				});
				u.a.transition(page.hN, "all 0.5s ease-in");
				u.ass(page.hN, {
					"opacity":1,
				});
				u.a.transition(page.fN, "all 0.5s ease-in");
				u.ass(page.fN, {
					"opacity":1,
				});
				page.acceptCookies();
				this.showArticle();
			}
		}
		scene.showArticle = function() {
			this._article = u.qs("div.article", this);
			if(this._article) {
				this._article.scene = this;
				u.ass(this._article, {
					"opacity":0,
					"display":"block"
				});
				var cn = u.cn(this._article);
				this._article.nodes = [];
				for(i = 0; node = cn[i]; i++) {
					if(u.gcs(node, "display") != "none") {
						u.ass(node, {
							"opacity":0,
						});
						this._article.nodes.push(node);
					}
				}
				u.ass(this._article, {
					"opacity":1,
				});
				u._stepA1.call(this._article.nodes[0]);
				for(i = 1; node = cn[i]; i++) {
					u.a.transition(node, "all 0.3s ease-in "+(100+(i*200))+"ms");
					u.ass(node, {
						"transform":"translate(0, 0)",
						"opacity":1
					});
				}
				u.t.setTimer(this, "showEvents", 800);
			}
			else {
				this.showEvents();
			}
		}
		scene.showEvents = function() {
			this._events = u.qs("div.all_events", this);
			if(this._events) {
				this._events.scene = this;
				u.ass(this._events, {
					"opacity": 0,
					"display":"block"
				});
				u.a.transition(this._events, "all 0.4s ease-in-out", "showPosts");
				u.ass(this._events, {
					"opacity":1
				});
				this._events.showPosts = function() {
					this._posts = u.qsa("li.item", this._events);
					if(this._posts) {
						var i, node;
						for(i = 0; node = this._posts[i]; i++) {
							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
							u.ass(node, {
								"opacity": 1
							});
						}
					}
				} 
				u.t.setTimer(this, "showNews", 800);
			}
			else {
				this.showNews();
			}
		}
		scene.showNews = function() {
			this._news = u.qs("div.news", this);
			if(this._news) {
				this._news.scene = this;
				u.ass(this._news, {
					"opacity": 0,
					"display":"block"
				});
				u.a.transition(this._news, "all 0.4s ease-in-out", "showPosts");
				u.ass(this._news, {
					"opacity":1
				});
				this._news.showPosts = function() {
					this._posts = u.qsa("li.item", this._news);
					if(this._posts) {
						var i, node;
						for(i = 0; node = this._posts[i]; i++) {
							var header = u.qs("h2,h3", node);
							header.current_readstate = node.getAttribute("data-readstate");
							if(header.current_readstate) {
								u.addCheckmark(header);
							}
							u.a.transition(node, "all 0.4s ease-in-out "+(100*i)+"ms", "done");
							u.ass(node, {
								"opacity": 1
							});
						}
					}
				} 
			}
		}
		page.cN.scene = scene;
	}
}


/*m-unsubscribe.js*/
Util.Modules["unsubscribe"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}

/*m-contact.js*/
Util.Modules["contact"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			if (u.qs("div.article", this)) {
				var injection_point = u.ns(u.qs("div.article h1", this));
				this.map = u.ae(this, "div", {"class":"map"});
				this.map.loaded = function() {
					u.googlemaps.addMarker(this.g_map, [55.711510,12.564495]);
					delete this.loaded;
				}
				injection_point.parentNode.insertBefore(this.map, injection_point);
				u.googlemaps.map(this.map, [55.711510,12.564495], {"zoom":14});
			}
			u.showScene(this);
			// 
		}
		page.cN.scene = scene;
	}
}

/*m-events.js*/
Util.Modules["events"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
			this.events = {};
			var events = u.qsa("li.event", this);
			if(events.length) {
				var event, i;
				for(i = 0; event = events[i]; i++) {
					this.indexEvent(event);
				}
			}
			this.createCalendar();
		}
		scene.indexEvent = function(event) {
			var event_date, timestamp_fragments, dd_starting_at, starting_at, year, month, date, hour, minute;
			dd_starting_at = u.qs("dd.starting_at", event);
			if(dd_starting_at) {
				starting_at = dd_starting_at.getAttribute("content");
				event.item_id = u.cv(event, "item_id");
				timestamp_fragments = starting_at.match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)/);
				if(timestamp_fragments) {
					year = timestamp_fragments[1];
					month = timestamp_fragments[2]-1;
					date = timestamp_fragments[3];
					hour = timestamp_fragments[4];
					minute = timestamp_fragments[5];
					event.date = new Date(year, month, date, hour, minute);
					event_date = u.date("Y-m-d", event.date.getTime());
					if(!this.events[event_date]) {
						this.events[event_date] = []
					}
					else {
						var i, e;
						for(i = 0; i < this.events[event_date].length; i++) {
							e = this.events[event_date][i];
							if(e.item_id == event.item_id) {
								this.events[event_date].splice(i, 1);
							}
						}
					}
					this.events[event_date].push(event);
				}
			}
		}
		scene.nextMonth = function() {
			this.div_calendar.removeChild(this.current_month);
			this.current_month = u.ae(this.div_calendar, this.getMonth(this.current_month.year, this.current_month.month+1));
		}
		scene.prevMonth = function() {
			this.response = function(response) {
				var events = u.qsa("div.all_events li.event", response);
				if(events.length) {
					var event, i;
					for(i = 0; event = events[i]; i++) {
						this.indexEvent(event);
					}
				}
				this.div_calendar.removeChild(this.current_month);
				this.current_month = u.ie(this.div_calendar, this.getMonth(this.current_month.year, this.current_month.month-1));
			}
			u.request(this, "/events/past/"+this.current_month.year+"/"+(this.current_month.month-2));
		}
		scene.createCalendar = function() {
			if(!this.div_calendar) {
				this.div_calendar = u.ae(this, "div", {"class":"calendar"});
				u.textscaler(this.div_calendar, {
					"min_width":600,
					"max_width":1300,
					"unit":"px",
					"ul.month h3":{
						"min_size":9,
						"max_size":12
					}
				});
				this.now = {
					"date":new Date().getDate(),
					"month":new Date().getMonth()+1,
					"year":new Date().getFullYear()
				}
				var bn_next_month = u.ae(this.div_calendar, "span", {"class":"next"});
				bn_next_month.scene = this;
				u.addNextArrow(bn_next_month);
				var bn_prev_month = u.ae(this.div_calendar, "span", {"class":"prev"});
				u.addPreviousArrow(bn_prev_month);
				bn_prev_month.scene = this;
				u.ce(bn_next_month);
				bn_next_month.clicked = function() {
					this.scene.nextMonth();
				}
				u.ce(bn_prev_month);
				bn_prev_month.clicked = function() {
					this.scene.prevMonth();
				}
				var year = this.getAttribute("data-year");
				var month = this.getAttribute("data-month");
				if(year && month) {
					this.current_month = this.getMonth(year, month);
				}
				else {
					this.current_month = this.getMonth(this.now.year, this.now.month);
				}
				u.ae(this.div_calendar, this.current_month);
			}
		}
		scene.getMonth = function(year, month) {
			var test_date = new Date(year, month-1);
			if(test_date) {
				year = test_date.getFullYear();
				month = test_date.getMonth()+1;
			}
			var month_object = [];
			var first_weekday = this.getFirstWeekdayOfMonth(year, month);
			var last_day = this.getLastDayOfMonth(year, month);
			var i, j, day, date, date_in_prev_month, last_day_last_month, date_obj, event;
			var weekday_counter = 1;
			if(first_weekday > 1) {
				last_day_last_month = this.getLastDayOfMonth(year, month-1);
			}
			var new_month = document.createElement("div");
			new_month.month = month;
			new_month.year = year;
			new_month.scene = this;
			u.ac(new_month, "month")
			var h3 = u.ae(new_month, "h3");
			var h3_month = u.ae(h3, "span", {"class":"month", "html":u.txt["month-"+month]});
			var h3_year = u.ae(h3, "span", {"class":"year", "html":year});
			var ul = u.ae(new_month, "ul", {"class":"weekdays"});
			for(i = 1; i <= 7; i++) {
				day = u.ae(ul, "li", {"class":"weekday", "html":u.txt["weekday-"+i+"-abbr"]});
			}
			var ul = u.ae(new_month, "ul", {"class":"month"});
			for(i = 1; i < first_weekday; i++) {
				date_in_prev_month = last_day_last_month + 1 + (i - first_weekday);
				day = u.ae(ul, "li", {"class":"prev_month"});
				u.ae(day, "span", {"html":date_in_prev_month});
				date_obj = new Date(year, month-2, date_in_prev_month);
				date = u.date("Y-m-d", date_obj.getTime());
				if(this.events[date]) {
					for(j = 0; event = this.events[date][j]; j++) {
						this.insertEvent(day, event);
					}
				}
				if(this.now.year == date_obj.getFullYear() && this.now.month == (date_obj.getMonth()+1) && this.now.date == date_in_prev_month) {
					u.ac(day, "today");
				}
				if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
					u.ac(day, "weekend");
				}
				weekday_counter++;
			}
			for(i = 1; i <= last_day; i++) {
				day = u.ae(ul, "li", {"class":"day"});
				u.ae(day, "span", {"html":i});
				date_obj = new Date(year, month-1, i);
				date = u.date("Y-m-d", date_obj.getTime());
				if(this.events[date]) {
					for(j = 0; event = this.events[date][j]; j++) {
						this.insertEvent(day, event, year, month);
					}
				}
				if(this.now.year == date_obj.getFullYear() && this.now.month == (date_obj.getMonth()+1) && this.now.date == i) {
					u.ac(day, "today");
				}
				if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
					u.ac(day, "weekend");
				}
				weekday_counter++;
			}
			if((weekday_counter-1)%7) {
				i = 1;
				while((weekday_counter-1)%7) {
					day = u.ae(ul, "li", {"class":"next_month"});
					u.ae(day, "span", {"html":i});
					date_obj = new Date(year, month, i);
					date = u.date("Y-m-d", date_obj.getTime());
					if(this.events[date]) {
						for(j = 0; event = this.events[date][j]; j++) {
							this.insertEvent(day, event, year, month);
						}
					}
					if(this.now.year == date_obj.getFullYear() && this.now.month == (date_obj.getMonth()+1) && this.now.date == i) {
						u.ac(day, "today");
					}
					if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
						u.ac(day, "weekend");
					}
					weekday_counter++;
					i++;
				}
			}
			return new_month;
		}
		scene.insertEvent = function(day, event, year, month) {
			var h3 = u.ae(day, u.qs("h3", event).cloneNode(true));
			var h3_a = u.qs("a", h3);
			h3.day = day;
			var div_description = u.qs("div.description p", event);
			if(div_description) {
				h3.description = div_description.innerHTML;
			}
			else {
				h3.description = "N/A";
			}
			u.ie(h3_a, "span", {"html":u.date("H:i", event.date.getTime())});
			u.e.hover(h3);
			h3.over = function() {
				this.div_description = u.ae(this, "div", {"class":"description", "html":this.description});
				if(u.hc(this.day, "weekend")) {
					u.ass(this.div_description, {
						"left":-(150) + "px"
					})
				}
				else {
					u.ass(this.div_description, {
						"left":(this.offsetWidth - 15) + "px"
					})
				}
			}
			h3.out = function() {
				this.removeChild(this.div_description);
			}
		}
		scene.getFirstWeekdayOfMonth = function(year, month) {
			var first_day = new Date(year, month-1).getDay();
			if(first_day == 0) {
				return 7;
			}
			else {
				return first_day;
			}
		}
		scene.getLastDayOfMonth = function(year, month) {
			var date = 28;
			var test_date = new Date(year, month-1, date);
			while(month == test_date.getMonth()+1) {
				date++;
				test_date.setDate(date);
			}
			return date-1;
		}
		page.cN.scene = scene;
	}
}

/*m-blog.js*/
Util.Modules["blogs"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var list = u.qs("ul.blogs");
			if(list) {
				list.articles = u.qsa("li.article", list);
				list.initArticle = function(article) {
					article._a = u.qs("h3 a", article);
					if(article._a) {
						article._link = article._a.href ? article._a.href : article._a.url;
					}
					article._description_p = u.qs("div.description p", article)
					if(article._description_p && article._link) {
						u.ae(article._description_p, "br");
						u.ae(article._description_p, "a", {href: article._link, class:"readmore", html:u.txt("readmore")});
					}
					var i, image;
					article._images = u.qsa("div.image,div.media", article);
					for(i = 0; image = article._images[i]; i++) {
						image.node = article;
						image.caption = u.qs("p a", image);
						if(image.caption) {
							image.caption.removeAttribute("href");
						}
						image._id = u.cv(image, "item_id");
						image._format = u.cv(image, "format");
						image._variant = u.cv(image, "variant");
						if(image._id && image._format) {
							image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
							u.ass(image, {
								"opacity": 0
							});
							image.loaded = function(queue) {
								u.ac(this, "loaded");
								this._image = u.ie(this, "img");
								this._image.image = this;
								this._image.src = queue[0].image.src;
								u.a.transition(this, "all 0.5s ease-in-out");
								u.ass(this, {
									"opacity": 1
								});
							}
							u.preloader(image, [image._image_src]);
						}
					}
				}
				list.resized = function() {
					this.browser_h = u.browserH();
					this.screen_middle = this.browser_h/2;
				}
				list.scrolled = function(event) {
					u.t.resetTimer(this.t_init);
					this.scroll_y = u.scrollY();
					if(this._next_url) {
						var i, node, node_y, list_y;
						list_y = u.absY(this);
						if(list_y + this.offsetHeight < this.scroll_y + (this.browser_h*2)) {
							this.loadNext();
						}
					}
					this.t_init = u.t.setTimer(this, this.initFocusedArticles, 500);
				}
				list.initFocusedArticles = function() {
					var i, node, node_y;
					for(i = 0; node = this.articles[i]; i++) {
						if(!node.is_ready) {
							node_y = u.absY(node);
							if(node_y > this.scroll_y + this.browser_h) {
								break;
							}
							else if(
								(
									node_y + node.offsetHeight > this.scroll_y && 
									node_y + node.offsetHeight < this.scroll_y + this.browser_h
								)
								 || 
								(
									node_y > this.scroll_y &&
									node_y < this.scroll_y + this.browser_h
								)
								 ||
								(
									node_y < this.scroll_y &&
									node_y + node.offsetHeight > this.scroll_y + this.browser_h
								)
							) {
								this.initArticle(node);
								node.is_ready = true;
							}
						}
					}
				}
				var i, node;
				for(i = 0; node = list.articles[i]; i++) {
					node.article_list = list;
					u.columns(node, [
						{"c125": [
							"div.image"
						]},
						{"c175": [
							"h3",
							"dl.author",
							"div.description"
						]}
					]);
				}
				list.resized();
				list.scrolled();
				u.e.addWindowEvent(list, "resize", list.resized);
				u.e.addWindowEvent(list, "scroll", list.scrolled);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["blog"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.columns(this, [
				{"c-main": [
					"div.article",
					"div.articles",
				]},
				{"c-sidebar": [
					"div.bio", 
				]}
			]);
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-cart.js*/
Util.Modules["cart"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.isHTML = true;
			page.notify(this);
			this.header_cart = u.qs("li.cart span.total", page.hN);
			this.total_cart_price = u.qs("li.total span.total_price", this);
			this.cart_nodes = u.qsa("ul.items li.item", this);
			var i, node;
			for(i = 0; node = this.cart_nodes[i]; i++) {
				node.scene = this;
				node.item_id = u.cv(node, "id");
				node.unit_price = u.qs("span.unit_price", node);
				node.total_price = u.qs("span.total_price", node);
				node.quantity = u.qs("#input_quantity", node);
				var quantity_form = u.qs("form.updateCartItemQuantity", node)
				if(quantity_form) {
					quantity_form.node = node;
					u.f.init(quantity_form);
					quantity_form.inputs["quantity"].updated = function() {
						u.ac(this._form.actions["update"], "primary");
						this._form.submit();
					}
					quantity_form.submitted = function() {
						this.response = function(response) {
							page.notify(response);
							if(response) {
								var total_price = u.qs("div.scene li.total span.total_price", response);
								var header_cart = u.qs("div#header li.cart span.total", response);
								var item_row = u.ge("id:"+this.node.item_id, response);
								var item_total_price = u.qs("span.total_price", item_row);
								var item_unit_price = u.qs("span.unit_price", item_row);
								var item_quantity = u.qs("#input_quantity", response);
								this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
								this.node.scene.header_cart.innerHTML = header_cart.innerHTML;
								this.node.total_price.innerHTML = item_total_price.innerHTML;
								this.node.unit_price.innerHTML = item_unit_price.innerHTML;
								this.node.quantity.value = item_quantity.value;
					 			u.rc(this.actions["update"], "primary");
							}
						}
						u.request(this, this.action, {"method":"post", "data":this.getData()});
					}
				}
				var bn_delete = u.qs("ul.actions li.delete", node);
				if(bn_delete) {
					u.m.oneButtonForm.init(bn_delete);
					bn_delete.node = node;	
					bn_delete.confirmed = function(response) {
						if(response) {
							var total_price = u.qs("div.scene li.total span.total_price", response);
							var header_cart = u.qs("div#header li.cart span.total", response);
							this.node.scene.total_cart_price.innerHTML = total_price.innerHTML;
							this.node.scene.header_cart.innerHTML = header_cart.innerHTML;
							this.node.parentNode.removeChild(this.node);
						}
					}
				}
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["checkout"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_login = u.qs("form.login", this);
			if(form_login) {
				u.f.init(form_login);
			}
			var form_signup = u.qs("form.signup", this);
			if(form_signup) {
				u.f.init(form_signup);
				form_signup.preSubmitted = function() {
					this.actions["signup"].value = "Wait";
					u.ac(this, "submitting");
					u.ac(this.actions["signup"], "disabled");
				}
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["shopProfile"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.isHTML = true;
			var form = u.qs("form.details", this);
			if(form) {
				u.f.init(form);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}
Util.Modules["shopAddress"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form = u.qs("form.address", this);
			if(form) {
				u.f.init(form);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-memberships.js*/
Util.Modules["memberships"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			if(this.membership_nodes) {
			}
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.div_memberships = u.qs("div.memberships", this);
			var place_holder = u.qs("div.articlebody .placeholder.memberships", this);
			if(this.div_memberships && place_holder) {
				place_holder.parentNode.replaceChild(this.div_memberships, place_holder);
			}
			if(this.div_memberships) {
				this.membership_nodes = u.qsa("li.membership", this.div_memberships);
				var total_benefits = [];
				var i, node, benefit, j, li, table, txt;
				for(i = 0; node = this.membership_nodes[i]; i++) {
					node.benefits = u.qsa(".description li", node);
					for(j = 0; j < node.benefits.length; j++) {
						txt = node.benefits[j].innerHTML;
						if(total_benefits.indexOf(txt) === -1) {
							total_benefits.push(txt);
						}
					}
				}
				if(total_benefits.length) {
					this.ul_memberships = u.qs("ul.memberships", this.div_memberships);
					var benefits_node = u.ie(this.ul_memberships, "li", {"class":"benefits"})
					var ul = u.ae(benefits_node, "ul");
					for(i = 0; benefit = total_benefits[i]; i++) {
						li = u.ae(ul, "li");
						table = u.ae(li, "span", {"class":"table"});
						u.ae(table, "span", {"class":"cell", "html":benefit});
						li.explanation = u.qs("p.hint_"+ u.superNormalize(benefit).replace(/-/g, "_"), this);
						if(li.explanation) {
							u.e.hover(li);
							li.over = function() {
								this.div_explanation = u.ae(this, "div", {"class":"explanation", "html":this.explanation.innerHTML});
								u.ass(this.div_explanation, {
									"left": (this.offsetWidth + 20) + "px",
									"top": (this.offsetHeight / 2) - (this.div_explanation.offsetHeight / 2) + "px"
								});
							}
							li.out = function() {
								if(this.div_explanation) {
									this.removeChild(this.div_explanation);
									delete this.div_explanation;
								}
							}
						}
					}
					this.benefits = u.qsa("li", ul);
				}
				for(i = 0; node = this.membership_nodes[i]; i++) {
					var j, benefit, not_included;
					for(j = 0; j < this.benefits.length; j++) {
						benefit = node.benefits[j];
						if(!benefit) {
							if(!node.benefits.length) {
								u.ae(u.ae(u.qs("li.description", node), "ul"), "li", {"class":"no"});
								node.benefits = u.qsa(".description li", node);
							}
							else {
								u.ae(node.benefits[0].parentNode, "li", {"class":"no"});
							}
						}
						else if(u.text(benefit) != u.text(this.benefits[j])) {
							not_included = u.ae(benefit.parentNode, "li", {"class":"no"});
							benefit.parentNode.insertBefore(not_included, benefit);
							node.benefits = u.qsa(".description li", node);
						}
						else if(benefit) {
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
			}
			this.div_maillist = u.qs("div.maillist", this);
			var maillist_place_holder = u.qs("div.articlebody .placeholder.maillist", this);
			if(this.div_maillist && maillist_place_holder) {
				maillist_place_holder.parentNode.replaceChild(this.div_maillist, maillist_place_holder);
			}
			if(this.div_maillist) {
				this.div_maillist.form = u.qs("form.maillist", this.div_maillist);
				u.f.init(this.div_maillist.form);
			}
			this.fontsLoaded = function() {
				page.resized();
				u.textscaler(this.div_memberships, {
					"min_height":900,
					"max_height":900,
					"min_width":600,
					"max_width":900,
					"unit":"px",
					"h3":{
						"min_size":14,
						"max_size":20,
					},
					"li.allin h3":{
						"min_size":18,
						"max_size":24,
					},
					"p":{
						"min_size":11,
						"max_size":13
					},
					"li.price":{
						"min_size":9,
						"max_size":11
					},
					"li.benefits li":{
						"min_size":10,
						"max_size":13
					}
				});
			}
			u.fontsReady(this, [
				{"family":"OpenSans", "weight":"normal", "style":"normal"},
				{"family":"OpenSans", "weight":"bold", "style":"normal"},
				{"family":"OpenSans", "weight":"normal", "style":"italic"},
				{"family":"PT Serif", "weight":"normal", "style":"normal"}
			]);
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-payment.js*/
Util.Modules["payment"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form = u.qs("form", this);
			if(form) {
				u.f.init(form);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}

/*m-payments.js*/
Util.Modules["payments"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form = u.qs("form", this);
			if(form) {
				u.f.init(form);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}

/*m-stripe.js*/
Util.Modules["stripe"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.card_form = u.qs("form.card", this);
			u.f.customValidate["card"] = function(iN) {
				var card_number = iN.val().replace(/ /g, "");
				if(u.paymentCards.validateCardNumber(card_number)) {
					u.f.inputIsCorrect(iN);
					u.f.validate(iN._form.inputs["card_cvc"]);
				}
				else {
					u.f.inputHasError(iN);
				}
			}
			u.f.customValidate["exp_month"] = function(iN) {
				var month = iN.val();
				var year = iN._form.inputs["card_exp_year"].val();
				if(year && parseInt(year) < 100) {
					year = parseInt("20"+year);
				}
				if(u.paymentCards.validateExpMonth(month)) {
					u.f.inputIsCorrect(iN);
				}
				else {
					u.f.inputHasError(iN);
				}
				if(!iN.validating_year) {
					iN._form.inputs["card_exp_year"].validating_month = true;
					u.f.validate(iN._form.inputs["card_exp_year"]);
					iN._form.inputs["card_exp_year"].validating_month = false;
				}
			}
			u.f.customValidate["exp_year"] = function(iN) {
				var year = iN.val();
				var month = iN._form.inputs["card_exp_month"].val();
				if(year && parseInt(year) < 100) {
					year = parseInt("20"+year);
				}
				if(!iN.validating_month) {
					iN._form.inputs["card_exp_month"].validating_year = true;
					u.f.validate(iN._form.inputs["card_exp_month"]);
					iN._form.inputs["card_exp_month"].validating_year = false;
				}
				if(u.paymentCards.validateExpDate(month, year)) {
					u.f.inputIsCorrect(iN);
				}
				else if(!month && u.paymentCards.validateExpYear(year)) {
					u.rc(iN, "correct");
					u.rc(iN.field, "correct");
				}
				else {
					u.f.inputHasError(iN);
					u.f.inputHasError(iN._form.inputs["card_exp_month"]);
				}
			}
			u.f.customValidate["cvc"] = function(iN) {
				var cvc = iN.val();
				var card_number = iN._form.inputs["card_number"].val().replace(/ /g, "");
				if(u.paymentCards.validateCVC(cvc, card_number)) {
					u.f.inputIsCorrect(iN);
				}
				else {
					u.f.inputHasError(iN);
				}
			}
			u.f.init(this.card_form);
			this.card_form.submitted = function() {
				if(!this.is_submitting) {
					this.is_submitting = true;
					u.ac(this, "submitting");
					u.ac(this.actions["pay"], "disabled");
					this.DOMsubmit();
				}
			}
			this.card_form.inputs["card_number"].updated = function(iN) {
				var value = this.val();
				this.value = u.paymentCards.formatCardNumber(value.replace(/ /g, ""));
				var card = u.paymentCards.getCardTypeFromNumber(value);
				if(card && card.type != this.current_card) {
					if(this.current_card) {
						u.rc(this, this.current_card);
					}
					this.current_card = card.type;
					u.ac(this, this.current_card);
				}
				else if(!card) {
					if(this.current_card) {
						u.rc(this, this.current_card);
					}
				}
			}
			this.card_form.inputs["card_exp_year"].changed = function(iN) {
				var year = parseInt(this.val());
				if(year > 99) {
					if(year > 2000 && year < 2100) {
						this.val(year-2000);
					}
				}
			}
			this.card_form.inputs["card_exp_month"].changed = function(iN) {
				var month = parseInt(this.val());
				if(month < 10) {
					this.val("0"+month);
				}
			}
			// 
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}

/*m-verify-maillist.js*/
Util.Modules["verify_maillist"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_verify = u.qs("form.verify_code", this);
			if(form_verify) {
				u.bug("init form")
				u.f.init(form_verify);
			}
			u.showScene(this);
		}
		page.cN.scene = scene;
	}
}


/*m-verify-shop.js*/
Util.Modules["verify_shop"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var form_verify = u.qs("form.verify_code", this);
			if(form_verify) {
				u.f.init(form_verify);
			}
			form_verify.submitted = function() {
				var data = this.getData();
				this.is_submitting = true; 
				u.ac(this, "submitting");
				u.ac(this.actions["verify"], "disabled");
				u.ac(this.actions["skip"], "disabled");
				this.response = function(response, request_id) {
					if (u.qs(".scene.login", response)) {
						scene.replaceScene(response);
						u.h.navigate("/login", false, true);
					}
					else if (u.hc(u.qs(".scene", response), "confirmed|checkout|cart|shopReceipt")) {
						scene.replaceScene(response);
						var url_actions = this[request_id].response_url.replace(location.protocol + "://" + document.domain, "");
						u.h.navigate(url_actions, false, true);
					}
					else {
						if (this.is_submitting) {
							this.is_submitting = false; 
							u.rc(this, "submitting");
							u.rc(this.actions["verify"], "disabled");
							u.rc(this.actions["skip"], "disabled");
						}
						if (this.error) {
							this.error.parentNode.removeChild(this.error);
						}
						this.error = scene.showMessage(this, response);
						u.ass(this.error, {
							transform:"translate3d(0, -20px, 0) rotate3d(-1, 0, 0, 90deg)",
							opacity:0
						});
						u.a.transition(this.error, "all .6s ease");
						u.ass(this.error, {
							transform:"translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
							opacity:1
						});
					}
				}
				u.request(this, this.action, {"data":data, "method":"POST", "responseType":"document"});
			}
			u.showScene(this);
		}
		scene.replaceScene = function(response) {
			var current_scene = u.qs(".scene", page);
			var new_scene = u.qs(".scene", response);
			page.cN.replaceChild(new_scene, current_scene); 
			u.init();
			new_scene.ready();
			return new_scene;
		}
		scene.showMessage = function(form, response) {
			var new_error = (u.qs("p.errormessage", response) || u.qs("p.error", response));
			var current_error = (u.qs("p.errormessage", form) || u.qs("p.error", form));
			if (!current_error) {
				u.ie(form, new_error);
			}
			else {
				form.replaceChild(new_error, current_error);
			}
			return new_error;
		}
		page.cN.scene = scene;
	}
}


/*m-black.js*/
Util.Modules["black"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
			page.resized();
		}
		page.cN.scene = scene;
	}
}

/*m-frios.js*/
Util.Modules["frios"] = new function() {
	this.init = function(scene) {
		u.txt["login_to_comment"] = '<a href="/login">Log ind</a> eller <a href="/memberships">opret en konto</a> for at tilføje kommentarer.';
		u.txt["share"] = "Del denne side";
		u.txt["share-info-headline"] = "(Hvordan deler jer?)";
		u.txt["share-info-txt"] = "Vi har med vilje ikke inkluderet social media plugins, fordi disse ofte misbruges til at indsamle data om dig. Vi ønsker heller ikke at promovere nogle kanaler over andre. I stedet kan du blot kopiere det viste link og selv dele det, dér hvor du finder det relevant.";
		u.txt["share-info-ok"] = "OK";
		u.txt["add_comment"] = "Tilføj kommentar";
		u.txt["comment"] = "Kommentar";
		u.txt["cancel"] = "Fortryd";
		scene.resized = function() {
			if(this.ul_images) {
				u.ass(this.ul_images, {
					"height":Math.floor(this.ul_images.offsetWidth / 1.32) +"px"
				});
			}
			if(this.c_1) {
				u.ass(this.help_us, {
					"padding-top": "0px"
				});
				if(this.c_1.offsetHeight < this.c_2.offsetHeight) {
					u.ass(this.help_us, {
						"padding-top": (this.c_2.offsetHeight - this.c_1.offsetHeight) + "px"
					});
				}
			}
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.txt["login_to_comment"] = '<a href="/login">Log ind</a> eller <a href="/memberships">Opret en konto</a> for at tilføje kommentarer.';
			u.columns(this, [
				{"c300":[
					{"c200": [
						"div.article", 
					]},
					{"c100": [
						"div.dictionary",
						"div.info_meeting",
						"div.practicalities",
						"div.signup",
						"div.more_info",
						"div.help_us",
					]},
				]},
				{"c300": [
					"div.people",
				]}
			]);
			this.c_1 = u.qs(".c .c100", this);
			this.c_2 = u.qs(".c .c200", this);
			console.log(this.c_2);
			var load_queue = [];
			var i, image, person;
			this.ul_images = u.qs("ul.images", this);
			if(this.ul_images) {
				this.images = u.qsa("li div.image", this.ul_images);
				for(i = 0; i < this.images.length; i++) {
					image = this.images[i];
					image.item_id = u.cv(image, "item_id");
					image.variant = u.cv(image, "variant");
					image.format = u.cv(image, "format");
					load_queue.push("/images/" + image.item_id + "/" + image.variant + "/540x." + image.format);
				}
			}
			this.ul_people = u.qs("ul.people", this);
			if(this.ul_people) {
				this.people = u.qsa("li.person", this.ul_people);
				for(i = 0; i < this.people.length; i++) {
					person = this.people[i];
					person.image_src = person.getAttribute("data-image-src");
					load_queue.push(person.image_src);
				}
			}
			this.form_signup = u.qs("form.signup", this);
			if(this.form_signup) {
				u.f.init(this.form_signup);
			}
			this.help_us = u.qs("div.help_us", this);
			this.loaded = function(queue) {
				var i, person;
				if(this.ul_people) {
					this.people = u.qsa("li.person", this.ul_people);
					for(i = 0; i < this.people.length; i++) {
						person = this.people[i];
						u.ie(person, "img", {src: person.image_src});
					}
				}
				if(this.ul_images) {
					this.slideshow = u.slideshow(this.ul_images);
					this.slideshow.scene = this;
					this.resized();
					this.slideshow.preloaded = function() {
						if(!this.selected_node) {
							this.selectNode(0);
						}
					}
					this.slideshow.prepare();
					u.addNextArrow(this.slideshow.bn_next);
					u.addPreviousArrow(this.slideshow.bn_prev);
				}
				u.showScene(this);
			}
			u.preloader(this, load_queue);
		}
		page.cN.scene = scene;
	}
}


/*m-corona.js*/
Util.Modules["corona"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.showScene(this);
			page.resized();
		}
		page.cN.scene = scene;
	}
}
