public without sharing class ProductManager {
    public static Product2 getProductById(Id productId){
        Product2 product = [
                SELECT Name,
                        ProductCode,
                        Description,
                        Processor__c,
                        BodyColor__c,
                        Image__c,Maker__c,
                        OperatingSystem__c,
                (SELECT Id,UnitPrice,Pricebook2Id FROM PricebookEntries WHERE IsActive = TRUE ORDER BY CreatedDate LIMIT 1)
                FROM Product2
                WHERE Id = :productId
        ];

        return product;
    }
}