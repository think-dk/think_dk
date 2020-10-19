Util.Modules["eventproposalConvert"] = new function() {
	this.init = function(node) {
		// u.bug("eventproposalConvert:", node);

		node.convertedToEvent = function(response) {
			if(response.cms_status == "success") {
				location.href = location.href.replace(/eventproposal\/edit\/.+/, "event/admin-edit/"+response.cms_object["id"]);
			}
			// console.log(response)
			
			// location.href = location.href.replace(/edit\/.+/, "edit/"+response.cms_object["id"]);
		}

	}
}

