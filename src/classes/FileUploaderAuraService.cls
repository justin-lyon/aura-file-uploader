public with sharing class FileUploaderAuraService {

	@AuraEnabled
	public static void deleteDocuments(List<Id> docIds) {
		Set<Id> documentIds = new Set<Id> (docIds);
		List<ContentDocument> documents = new List<ContentDocument>();
		for(Id docId : new List<Id> (documentIds)) {
			documents.add(new ContentDocument(Id = docId));
		}

		try {
			delete documents;
		} catch(Exception exc) {
			throw new AuraHandledException(exc.getMessage());
		}
	}
}