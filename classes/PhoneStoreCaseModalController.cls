/**
 * Created by Max on 02.05.2021.
 */

public without sharing class PhoneStoreCaseModalController {
    @AuraEnabled
    public static void createCase(Id leadId, String subject, String description){
        String normalDescription = description.replaceAll('\\<.*?\\>', '');

        Case newCase = new Case(
                Lead__c = leadId,
                Subject = subject,
                Description = normalDescription,
                HtmlDiscriptionView__c = description
        );

        insert newCase;
    }
}