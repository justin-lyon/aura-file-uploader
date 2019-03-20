@isTest
private class FileUploaderAuraServiceTest {

	@TestSetup
	static void setupDocuments() {
		List<ContentVersion> documents = new List<ContentVersion>();
		String fileNameOne = 'Test Doc 1.png';
		String fileNameTwo = 'Test Doc 2.csv';

		documents.add(createContentVersion(fileNameOne));
		documents.add(createContentVersion(fileNameTwo));
		insert documents;
	}

	static TestMethod void deleteDocuments_givenIds_shouldDeleteDocuments() {
		Set<Id> documentIds = new Set<Id>();
		for(ContentDocument doc : [SELECT Id FROM ContentDocument]) {
			documentIds.add(doc.Id);
		}
		System.assertEquals(2, documentIds.size(), 'Should have two documents from @TestSetup.');

		Test.startTest();

			FileUploaderAuraService.deleteDocuments(new List<Id> (documentIds));

		Test.stopTest();

		List<ContentDocument> documents = [SELECT Id FROM ContentDocument];
		System.assert(documents.isEmpty(), 'Should have deleted the documents.');
	}

	private static ContentVersion createContentVersion(String name) {
		return new ContentVersion(
			Title = name,
			PathOnClient = name,
			VersionData = Blob.valueOf(name));
	}
}