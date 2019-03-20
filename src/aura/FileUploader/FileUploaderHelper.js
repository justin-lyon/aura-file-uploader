({
	setDocuments: function(cmp, files) {
		cmp.set("v.files", files);
	},

	fireFileUploaded: function(cmp, files) {
		var fileUploader = cmp.getEvent('fileUploader');
		fileUploader.setParams({
			data: files
		}).fire();
	},

	requestDelete: function(cmp, helper, fileId) {
		cmp.set("v.showSpinner", true);

		var fileIds = [fileId];
		var deleteDocuments = cmp.get("c.deleteDocuments");

		deleteDocuments.setParams({
			docIds: [fileId]
		});

		kit.promisify(deleteDocuments)
			.then(helper.handleSuccess(cmp, helper, fileIds))
			.catch(helper.handleFailure(cmp));
	},

	handleSuccess: function(cmp, helper, fileIds) {
		return function(res) {
			cmp.set("v.showSpinner", false);

			var files = cmp.get("v.files");

			var remainingFiles = files.filter(function(f) {
				return !fileIds.includes(f.documentId);
			})

			cmp.set("v.files", remainingFiles);

			helper.fireFileUploaded(cmp, remainingFiles);
		}
	},

	handleFailure: function(cmp) {
		return function(res) {
			cmp.set("v.showSpinner", false);

			var errors;
			if(res.getError) {
				errors = res.getError();
			} else {
				errors = res;
			}

			console.error('Unhandled Error: ', errors);
		}
	}
})