Util.Objects["qnas"] = new function() {
	this.init = function(div) {
//		u.bug("qnas init:" + u.nodeId(div))


		div.item_id = u.cv(div, "item_id");

		div.list = u.qs("ul.qnas", div);
		div.qnas = u.qsa("li.qna", div.list);


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
		div.initQna = function(node) {

			node.div = this;

		}


		// CMS interaction urls
		div.csrf_token = div.getAttribute("data-csrf-token");
		div.add_question_url = div.getAttribute("data-question-add");
		div.edit_qna_url = div.getAttribute("data-qna-edit");
		div.add_tag_url = div.getAttribute("data-tag-add");
		div.qna_tag = div.getAttribute("data-qna-tag");

		// if interaction data available
		if(div.add_question_url && div.add_tag_url && div.qna_tag && div.csrf_token) {

			// add initial add comment button
			div.actions = u.ae(div, "ul", {"class":"actions"});
			div.bn_qna = u.ae(u.ae(div.actions, "li", {"class":"add"}), "a", {"html":"Tilføj spørgsmål", "class":"button primary qna"});
			div.bn_qna.div = div;

			u.ce(div.bn_qna);
			div.bn_qna.clicked = function() {

				var actions, bn_add, bn_cancel;

				// hide original add button
				u.as(this.div.actions, "display", "none");

				// add comment form
				this.div.form = u.f.addForm(this.div, {"action":this.div.add_question_url+"/"+this.div.item_id, "class":"add labelstyle:inject"});
				this.div.form.div = div;

				u.ae(this.div.form, "input", {"type":"hidden","name":"csrf-token", "value":this.div.csrf_token});
				u.ae(this.div.form, "input", {"type":"hidden","name":"status", "value":"1"});
				u.f.addField(this.div.form, {"type":"string", "name":"name", "label":"Spørgsmål"});
//				u.f.addField(this.div.form, {"type":"text", "name":"description", "label":"Beskrivelse"});
				actions = u.ae(this.div.form, "ul", {"class":"actions"});

				bn_add = u.f.addAction(actions, {"value":"Tilføj Spørgsmål", "class":"button primary update", "name":"add"});
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
								div.list = u.ie(div, "ul", {"class":"qnas"});
								div.insertBefore(div.list, div.actions);
							}

							// inject newly created qna in qnalist
							var qna_li = u.ae(this.div.list, "li", {"class":"qna qna_id:"+response.cms_object["id"]});

							var info = u.ae(qna_li, "ul", {"class":"info"});
							u.ae(info, "li", {"class":"user", "html":response.cms_object["user_nickname"]});
							u.ae(info, "li", {"class":"created_at", "html":response.cms_object["created_at"]});
							var p = u.ae(qna_li, "p", {"class":"question"})

							// does user have access to edit, then add link to headline
							if(this.div.edit_qna_url) {
								u.ae(p, "a", {"href":this.div.edit_qna_url+"/"+response.cms_object["id"], "html":response.cms_object["name"], "target":"_blank"});
							}
							else {
								p.innerHTML = response.cms_object["name"];
							}

							// add tag to newly created qna
							u.request(qna_li, this.div.add_tag_url+"/"+response.cms_object["id"], {"method":"post", "params":"csrf-token="+this.div.csrf_token+"&tags=qna:"+this.div.qna_tag});

							this.div.initQna(qna_li);

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
		for(i = 0; node = div.qnas[i]; i++) {
			div.initQna(node);
		}

	}
}