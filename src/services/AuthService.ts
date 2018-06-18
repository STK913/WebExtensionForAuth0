import {Injectable} from '@angular/core';
import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';
import {Variables} from "../variables";

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth({domain: Variables.AUTH0_DOMAIN, clientID: Variables.AUTH0_CLIENT_ID});
  lock = new Auth0Lock(Variables.AUTH0_CLIENT_ID, Variables.AUTH0_DOMAIN, {
    auth: {
      redirect: false,
      sso: false,
      params: {
        scope: 'openid offline_access',
      }
    },
    closable: false,
    language: 'fr',
    loginAfterSignup: false
  });

  idToken: string = null;
  expiresAt: any = null;
  accessToken: string = null;

  constructor() {
    this.lock.on('authenticated', authResult => {
      console.log("Authenticated");
      this.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.idToken = authResult.idToken;
      this.accessToken = authResult.accessToken;
      this.lock.hide();
    });
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }
}
