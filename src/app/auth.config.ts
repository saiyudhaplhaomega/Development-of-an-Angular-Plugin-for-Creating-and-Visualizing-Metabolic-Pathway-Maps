import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // TODO: fill with info ..................

  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/silent-refresh.html',
  clientId: '533975881425-kerne9k4q8rhiqt6q0mn0gtcftohibcp.apps.googleusercontent.com',
  scope: 'openid profile email',

}

