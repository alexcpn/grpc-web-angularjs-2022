import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';


const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId: '613344691107-jc8hd7r8a2ocp5jvdi58l6va9s20b0dd.apps.googleusercontent.com',
  dummyClientSecret: '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',
  scope: "openid profile",
  redirectUri: "http://localhost:4200/Login",
  responseType: 'code',
  showDebugInformation: true,
  // Activate Session Checks: #TODO
  sessionChecksEnabled: false,

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly oAuthService: OAuthService) {
    this.configure()
  }
  private configure() {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.events.pipe(filter(e => e.type === 'session_terminated')).subscribe(e => {
      console.debug('Your session has been terminated!');
    })

  }


  // stage(): boolean {

  //   this.oAuthService.loadDiscoveryDocument().then(() => {
  //     this.oAuthService.tryLoginImplicitFlow().then(() => { // todo - Check Explicit flow
  //       if (!this.oAuthService.hasValidAccessToken()) {
  //         console.log("User does not have valid Token - Initiating Login")
  //         this.oAuthService.initLoginFlow()

  //       } else {
  //         console.log("User has valid Token")
  //         this.oAuthService.loadUserProfile().then((userProfile) => {
  //           console.log(JSON.stringify(userProfile))
  //         })
  //       }
  //     })
  //   })
  //   return true
  // }

  public async login() {

    let ret = await this.oAuthService.loadDiscoveryDocument()
    console.log("loadDiscoveryDocument", ret)
    let ret2 = await this.oAuthService.tryLogin()
    console.log("tryLoginImplicitFlow", ret2)
    if (!this.oAuthService.hasValidAccessToken()) {
      console.log("login::hasValidAccessToken", false)
      this.oAuthService.initLoginFlow()
    } else {
      console.log("login::hasValidAccessToken", true)
      this.oAuthService.setupAutomaticSilentRefresh();
      this.oAuthService.loadUserProfile().then((userProfile) => {
        console.log(JSON.stringify(userProfile))
      })
    }
  }

  public isLoggedIn(): boolean {

    if (!this.oAuthService.hasValidAccessToken()) {
      console.log("isLoggedIn::hasValidAccessToken", false)
      return false
    }
    console.log("isLoggedIn::hasValidAccessToken", true)
    return true

  }
  public async getUserProfile() {
    if (this.oAuthService.hasValidAccessToken()) {
      let userProfile = await this.oAuthService.loadUserProfile()
      console.log(JSON.stringify(userProfile))
      return userProfile
    }
    return {}
  }

  public logoff() {
    this.oAuthService.logOut();
  }

  public get name() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims;
  }

}

