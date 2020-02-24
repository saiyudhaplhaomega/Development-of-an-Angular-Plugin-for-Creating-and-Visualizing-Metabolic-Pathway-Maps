import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfigElixir: AuthConfig = {

  issuer: 'https://login.elixir-czech.org/oidc/',
  redirectUri: window.location.origin + '/login',
  clientId: 'd7737d10-75d0-40c1-9732-cca9683eabc6',
  scope: 'openid profile email',

}

