/**
 * Created by Max on 21.03.2021.
 */
//TODO create validation for new Lead(check for already existing lead with same login(email))
public without sharing class LoginRegFormController {
    @AuraEnabled
    public static String createLead(Lead lead) {
        System.debug('#############lead' + lead);
        List<Lead> invalidLeads = getLeadByEmail(lead.Email);
        System.debug('#############invalidLeads' + invalidLeads);
        String result = '';
        if (invalidLeads.isEmpty()) {
            Lead createdLead = new Lead(
                    FirstName = lead.FirstName,
                    LastName = lead.LastName,
                    Email = lead.Email,
                    Password__c = lead.Password__c,
                    Company = lead.Company
            );

            try {
                insert createdLead;
            } catch (DmlException dmlException) {
                throw new AuraHandledException('Darn it! Something went wrong: ' + dmlException.getMessage());
            }
            result = 'OK. Hi ' + createdLead.FirstName + ' ' + createdLead.LastName;
        }

        return result;
    }

    @AuraEnabled
    public static LoginRegFormWrapper.Result checkLead(String username, String password) {
        LoginRegFormWrapper.Result result = new LoginRegFormWrapper.Result();
        List<Lead> leads = getLeadByPasswordAndEmail(username, password);
        if (leads.size() == 1) {
            result.isExistedUser = true;
            result.errorMessage = '';
            result.user = leads[0];
        } else {
            result.isExistedUser = false;
            result.errorMessage = 'There is no user with this combination username and password';
        }

        return result;
    }

    @AuraEnabled
    public static List<Lead> getLeadByPasswordAndEmail(String email, String password) {
        List<Lead> leads = [
                SELECT FirstName, LastName, Password__c, Name
                FROM Lead
                WHERE Email = :email
                AND Password__c = :password
        ];

        return leads;
    }

    @AuraEnabled
    public static List<Lead> getLeadByEmail(String email) {
        List<Lead> leads = [
                SELECT Id
                FROM Lead
                WHERE Email = :email
        ];

        return leads;
    }
}