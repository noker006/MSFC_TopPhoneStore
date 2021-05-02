/**
 * Created by Max on 02.05.2021.
 */

public without sharing class PhoneCardFullInfoController {
    @AuraEnabled
    public static Product2 getProduct(Id productId){
        Product2 product = [
                SELECT Name,
                        ProductCode,
                        Description,
                        Processor__c,
                        BodyColor__c,
                        Image__c,
                        Maker__c,
                        OperatingSystem__c,
                        Rating__c,
                        ReviewNumbers__c,
                (SELECT Id,UnitPrice FROM PricebookEntries WHERE IsActive = TRUE ORDER BY CreatedDate LIMIT 1)
                FROM Product2
                WHERE Id = :productId
        ];

        return product;
    }
}