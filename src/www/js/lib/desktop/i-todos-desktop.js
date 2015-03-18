Util.Objects["todos"] = new function() {
	this.init = function(div) {
//		u.bug("todos init:" + u.nodeId(div))


		div.item_id = u.cv(div, "item_id");

		div.list = u.qs("ul.todos", div);
		div.todos = u.qsa("li.todo", div.list);


		div.header = u.qs("h2", div);
		div.header.div = div;
		u.addExpandArrow(div.header);

		u.ce(div.header);
		div.header.clicked = function() {
			if(u.hc(this.div, "open")) {

				u.rc(this.div, "open");
				u.addExpandArrow(this);

			}
			else {

				u.ac(this.div, "open");
				u.addCollapseArrow(this);
			}
		}


		// todo initialization (still not doing anything)
		div.initTodo = function(node) {

			node.div = this;

		}


		// CMS interaction urls
		div.csrf_token = div.getAttribute("data-csrf-token");
		div.add_todo_url = div.getAttribute("data-todo-add");
		div.edit_todo_url = div.getAttribute("data-todo-edit");
		div.add_tag_url = div.getAttribute("data-tag-add");
		div.todo_tag = div.getAttribute("data-todo-tag");

		// if interaction data available
		if(div.add_todo_url && div.add_tag_url && div.todo_tag && div.csrf_token) {

			// add initial add comment button
			div.actions = u.ae(div, "ul", {"class":"actions"});
			div.bn_todo = u.ae(u.ae(div.actions, "li", {"class":"add"}), "a", {"html":"Tilføj TODO", "class":"button primary todo"});
			div.bn_todo.div = div;

			u.ce(div.bn_todo);
			div.bn_todo.clicked = function() {

				var actions, bn_add, bn_cancel;

				// hide original add button
				u.as(this.div.actions, "display", "none");

				// add comment form
				this.div.form = u.f.addForm(this.div, {"action":this.div.add_todo_url+"/"+this.div.item_id, "class":"add labelstyle:inject"});
				this.div.form.div = div;

				u.ae(this.div.form, "input", {"type":"hidden","name":"csrf-token", "value":this.div.csrf_token});
				u.ae(this.div.form, "input", {"type":"hidden","name":"status", "value":"1"});
				u.f.addField(this.div.form, {"type":"string", "name":"name", "label":"TODO"});
//				u.f.addField(this.div.form, {"type":"text", "name":"description", "label":"Beskrivelse"});
				actions = u.ae(this.div.form, "ul", {"class":"actions"});

				bn_add = u.f.addAction(actions, {"value":"Tilføj TODO", "class":"button primary update", "name":"add"});
				bn_add.div = div;

				bn_cancel = u.f.addAction(actions, {"value":"Fortryd", "class":"button cancel", "type":"button", "name":"cancel"});
				bn_cancel.div = div;

				u.f.init(this.div.form);

				// handle form submit
				this.div.form.submitted = function() {

					this.response = function(response) {

						if(response.cms_status == "success" && response.cms_object) {

							if(!div.list) {
								var p = u.qs("p", div);
								if(p) {
									p.parentNode.removeChild(p);
								}
								div.list = u.ie(div, "ul", {"class":"todos"});
								div.insertBefore(div.list, div.actions);
							}

							// inject newly created todo in todolist
							var todo_li = u.ae(this.div.list, "li", {"class":"todo todo_id:"+response.cms_object["id"]});

							// does user have access to edit, then add link to headline
							if(this.div.edit_todo_url) {
								u.ae(todo_li, "a", {"href":this.div.edit_todo_url+"/"+response.cms_object["id"], "html":response.cms_object["name"], "target":"_blank"});
							}
							else {
								todo_li.innerHTML = response.cms_object["name"];
							}

							// add tag to newly created todo
							u.request(todo_li, this.div.add_tag_url+"/"+response.cms_object["id"], {"method":"post", "params":"csrf-token="+this.div.csrf_token+"&tags=todo:"+this.div.todo_tag});

							this.div.initTodo(todo_li);

							// remove add comment form
							this.parentNode.removeChild(this);

							// show original add button
							u.as(this.div.actions, "display", "block");
						}
					}
					u.request(this, this.action, {"method":"post", "params":u.f.getParams(this)});

				}

				// handle cancel
				u.ce(bn_cancel);
				bn_cancel.clicked = function(event) {
					u.e.kill(event);
					this.div.form.parentNode.removeChild(this.div.form);

					// show original add button
					u.as(this.div.actions, "display", "block");
				}
			}
		}


		// initalize existing comments
		var i, node;
		for(i = 0; node = div.todos[i]; i++) {
			div.initTodo(node);
		}

	}
}