Util.Objects["subscriptions"] = new function() {
	this.init = function(fieldset) {

		var field = u.qs(".field.radiobuttons", fieldset);
		field.options = u.qsa(".item", field);

		var i, option;
		for(i = 0; option = field.options[i]; i++) {
			option.input = u.qs("input", option)

			// needs form update first (selecting radio-button does not cause updated callback)
			// u.ce(option);
			// option.clicked = function() {
			// 	this.input.val(this.input.value);
			// }
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