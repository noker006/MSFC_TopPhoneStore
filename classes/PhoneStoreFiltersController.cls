/**
 * Created by Max on 30.04.2021.
 */

public without sharing class PhoneStoreFiltersController {

    @AuraEnabled
    public static List<String> getPicklistValues(String ObjectApi_name, String Field_name) {
        List<String> lstPickvals = new List<String>();
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(ObjectApi_name);
        Sobject Object_name = targetType.newSObject();
        Schema.sObjectType sobject_type = Object_name.getSObjectType();
        Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe();
        Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap();
        List<Schema.PicklistEntry> pick_list_values = field_map.get(Field_name).getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : pick_list_values) {
            lstPickvals.add(a.getValue());
        }
        return lstPickvals;
    }

    @AuraEnabled
    public static String getQuery(Map<String, String> queryConditions) {
        String query = 'SELECT Name,ProductCode,Description,Processor__c,BodyColor__c,Image__c,Maker__c,OperatingSystem__c,Rating__c,ReviewNumbers__c,' +
                '(SELECT Id,UnitPrice FROM PricebookEntries WHERE IsActive = TRUE ORDER BY CreatedDate LIMIT 1) ' +
                'FROM Product2 ';

        Integer conditionCounter = 0;
        Integer counter = 0;

        for (String keyField : queryConditions.keySet()) {
            String fieldValue = queryConditions.get(keyField);
            if (counter == 0) {
                query += 'WHERE ';
            }
            if (fieldValue != null && fieldValue != '' && fieldValue != 'none' && keyField != 'UnitPrice') {
                if (conditionCounter != 0) {
                    if(keyField == 'Name') {
                        query += 'AND ' + keyField + ' LIKE ' + '\'' + fieldValue + '\'' + ' ';
                    } else {
                        query += 'AND ' + keyField + ' = ' + '\'' + fieldValue + '\'' + ' ';
                    }
                } else {
                    if(keyField == 'Name') {
                        query += keyField + ' LIKE ' + '\'' + fieldValue + '\'' + ' ';
                    } else {
                        query += keyField + ' = ' + '\'' + fieldValue + '\'' + ' ';
                    }
                }
                conditionCounter++;
            }
            counter++;
        }

        List<Decimal> prices = splitAndCheckPrices(queryConditions.get('UnitPrice'));

        query = addPriceConditionToQuery(prices[0], prices[1], query, conditionCounter);

        return query;
    }

    private static String addPriceConditionToQuery(Decimal fromPrice, Decimal toPrice, String query, Integer conditionCounter) {

            if(conditionCounter != 0){
                query += ' AND ';
            }
            query += ' Id IN (SELECT Product2Id FROM PricebookEntry WHERE UnitPrice >= ' + fromPrice + ' AND UnitPrice <= ' + toPrice + ')';

        return query;
    }

    private static List<Decimal> splitAndCheckPrices(String strPrices){
        List<Decimal> validPrices = new List<Decimal>();
        List<String> parsedPrices = strPrices.split(',');

        for (String price : parsedPrices){
            Boolean isNotValidPriceRange = (String.isBlank(price) && price == 'none');
            if(isNotValidPriceRange){
                validPrices.add(0);
            } else {
                validPrices.add(Decimal.valueOf(price));
            }
        }

        return validPrices;
    }
}