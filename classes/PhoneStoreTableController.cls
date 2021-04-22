/**
 * Created by Max on 18.04.2021.
 */

public with sharing class PhoneStoreTableController {
    @AuraEnabled
    public static List<Product2> getProducts(String query, Integer qLimit, Integer qOffset){
        System.debug('######query1'+ query);
        List<Product2> products = new List<Product2>();
        if(!String.isBlank(query)){
            query += ' LIMIT :qLimit ' + 'OFFSET :qOffset';
            try {
                System.debug('######query2'+ query);
                products = Database.query(query);
            } catch (QueryException qException) {
                throw new AuraHandledException('Darn it! Something went wrong: ' + qException.getMessage());
            }
        }
        return products;
    }
}