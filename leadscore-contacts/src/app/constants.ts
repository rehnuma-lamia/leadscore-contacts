import {Injectable} from '@angular/core';

@Injectable()
export class Constants {

  public static readonly BASE_URL = 'https://internal-api-staging-lb.interact.io/v2/';

  static LeadscoreAPI = class {
    public static readonly LOGIN_URL = Constants.BASE_URL + 'login';
    public static readonly CONTACTS_URL = Constants.BASE_URL + 'contacts';
    public static readonly LOGOUT_URL = Constants.BASE_URL + 'logout';
  };
}