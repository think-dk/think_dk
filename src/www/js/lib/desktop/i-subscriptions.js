Util.Objects["subscriptions"] = new function() {
	this.init = function(fieldset) {
//		u.bug("init subscriptions");

		var field = u.qs(".field.radiobuttons", fieldset);
		field.options = u.qsa(".item", field);

		var i, option;
		for(i = 0; option = field.options[i]; i++) {
			option.input = u.qs("input", option)

			u.ce(option);
			option.clicked = function() {
				this.input.val(this.input.value);
				this.input.field.updated();
			}
		}

		field.updated = function() {
//			u.bug("option changed")
			
			var selected = this._input.val();
			
			for(i = 0; option = this.options[i]; i++) {
				if(option.input.value == selected) {
					u.ac(option, "selected");
				}
				else {
					u.rc(option, "selected");
				}

			}

		}

	}
}