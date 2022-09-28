import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';


const oAuthConfigGoogle: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId: '613344691107-jc8hd7r8a2ocp5jvdi58l6va9s20b0dd.apps.googleusercontent.com',
  dummyClientSecret: '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',
  scope: "openid profile",
  redirectUri: "http://localhost:4200/Login",
  userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo ',
  responseType: 'code',
  showDebugInformation: true,
  // Activate Session Checks: #TODO
  sessionChecksEnabled: false,

}

type UserDetails = {
  [key: string]: any; // 👈️ variable key

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails!: UserDetails;

  constructor(private readonly oAuthService: OAuthService) {
    this.configure()
  }
  private configure() {
    this.oAuthService.configure(oAuthConfigGoogle);
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

  public async loginWithGoolge() {

    let ret = await this.oAuthService.loadDiscoveryDocument()
    console.log("loadDiscoveryDocument", ret)
    let ret2 = await this.oAuthService.tryLogin()
    console.log("tryLoginImplicitFlow", ret2)
    if (!this.oAuthService.hasValidAccessToken()) {
      console.log("login::hasValidAccessToken", false)
      this.oAuthService.initLoginFlow()
    } else {
      console.log("login::hasValidAccessToken", true)
      this.oAuthService.loadUserProfile().then((userProfile) => {
        this.userDetails = userProfile
        console.log("login",this.userDetails['info']['name'])
        if (document.getElementById('userdetails') != null) {
          document.getElementById('userdetails')!.innerHTML += this.userDetails['info']['name'];
        }

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
  public getUserProfile() {
    if (!this.oAuthService.hasValidAccessToken()) {
      console.log("getUserProfile::hasValidAccessToken", false)
      return this.userDetails
    }
    console.log("getUserProfile::hasValidAccessToken", true)
    if (this.userDetails == null) {
      console.log("User details are null- trying to get")
      this.oAuthService.loadUserProfile().then(
        (userProfile) => {
          this.userDetails = userProfile
          console.log("getUserProfile:",this.userDetails['info']['name'])
          if (document.getElementById('userdetails') != null) {
            document.getElementById('userdetails')!.innerHTML += this.userDetails['info']['name'];
          }
        },
        (reason) => {
          console.log("getUserProfile:Could not get user details -details", reason)
        },
      );
    }
    return this.userDetails
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

