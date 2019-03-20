({
	fireTrash: function(cmp) {
		var file = cmp.get("v.file");
		var trash = cmp.getEvent('trash');

		trash.setParams({
			data: file.documentId
		}).fire();
	}
})