/**
 * Created by Max on 21.03.2021.
 */
//TODO create validation for new Lead(check for already existing lead with same login(email))
//TODO переделатьлогику на email(логн это email)
public class LoginRegFormController {
    @AuraEnabled
    public static LoginRegFormWrapper.Result checkLead(String username, String password) {
        LoginRegFormWrapper.Result result = new LoginRegFormWrapper.Result();
        List<Lead> user = getLeadByPasswordAndFirstName(username, password);
        if (user.size() == 1) {
            result.isValidUser = true;
            result.errorMessage = '';
        } else {
            result.isValidUser = false;
            result.errorMessage = 'There is no user with this combination username and password';
        }
        return result;
    }

    @AuraEnabled
    public static List<Lead> getLeadByPasswordAndFirstName(String username, String password) {
        List<Lead> leads = [
                SELECT FirstName,Password__c
                FROM Lead
                WHERE FirstName = :username
                AND Password__c = :password
        ];
        return leads;
    }
}