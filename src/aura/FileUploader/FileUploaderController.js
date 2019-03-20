({
	onUploadFinished: function(cmp, event, helper) {
		var files = event.getParams().files;
		helper.setDocuments(cmp, files);
		helper.fireFileUploaded(cmp, files);
	},

	handleTrash: function(cmp, event, helper) {
		var fileId = event.getParams().data;

		helper.requestDelete(cmp, helper, fileId);
	}
})