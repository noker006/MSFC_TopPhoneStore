/**
 * Created by Max on 01.05.2021.
 */

public without sharing class PhoneStoreReviewModalController {
    @AuraEnabled
    public static void createReview(Id productId, Id leadId, String description, Decimal score){
        Product2 product = ProductManager.getProductById(productId);
        List<Lead> lead = LeadManager.getLeadById(leadId);
        product.Score__c += score;
        product.ReviewNumbers__c++;

        Review__c review = new Review__c( Name = 'Review '+ lead[0].Name, Description__c = description, Score__c = score, Product__c = productId);
        insert review;

        List<Review__c> reviews = getAllReviewsFromProduct(productId);
        product = calcNewRate(product, reviews);
        update product;
    }

    private static Product2 calcNewRate(Product2 product, List<Review__c> reviews){
        Decimal score = product.Score__c;
        Decimal reviewNumber = product.ReviewNumbers__c;
        Decimal rating = score/reviewNumber;

        product.Rating__c = rating;
        return product;
    }

    private static List<Review__c> getAllReviewsFromProduct(Id productId){
        List<Review__c> reviews = [
                SELECT Id,
                        Score__c,
                        Description__c
                FROM Review__c
                WHERE Product__c = :productId
        ];

        return reviews;
    }

}