import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';




type UserDetails = {
  [key: string]: any; // 👈️ variable key

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails!: UserDetails;

  constructor(private readonly oAuthService: OAuthService) {


  }
  public  configure(authConfig: AuthConfig) {
    this.oAuthService.configure(authConfig);
    this.oAuthService.events.pipe(filter(e => e.type === 'session_terminated')).subscribe(e => {
      console.debug('Your  session has been terminated!');
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
    console.log("logiWithGoogle Flow: Start")
    await this.login(this.oAuthService);
  }

  public async loginWithMicrosoft() {
    console.log("loginWithMicrosoft Flow: Start")
    await this.login(this.oAuthService);
  }

  private async login(oAuthService: OAuthService) {
    console.log("Login")
    let ret = await oAuthService.loadDiscoveryDocument();
    console.log("loadDiscoveryDocument", ret);
    let ret2 = await oAuthService.tryLogin();
    console.log("tryLoginImplicitFlow", ret2);
    if (!oAuthService.hasValidAccessToken()) {
      console.log("login::hasValidAccessToken", false);
      oAuthService.initLoginFlow();
    } else {
      console.log("login::hasValidAccessToken", true);
      oAuthService.loadUserProfile().then((userProfile) => {
        this.userDetails = userProfile;
        console.log("login", this.userDetails['info']['name']);
        if (document.getElementById('userdetails') != null) {
          document.getElementById('userdetails')!.innerHTML += this.userDetails['info']['name'];
        }
      });
    }
  }

  public isLoggedIn(): boolean {

    if (this.oAuthService.hasValidAccessToken()) {
      console.log("isLoggedIn::hasValidAccessToken", true)
      return true
    }
    console.log("isLoggedIn::hasValidAccessToken", false)
    return false

  }

  public getUserProfile() {
    this.getUserProfileInt(this.oAuthService)
    return this.userDetails

  }
  private getUserProfileInt(oAuthService: OAuthService) {
    if (!oAuthService.hasValidAccessToken()) {
      console.log("getUserProfile::hasValidAccessToken", false)
      return
    }
    console.log("getUserProfile::hasValidAccessToken", true)
    if (this.userDetails == null) {
      console.log("User details are null- trying to get")
      oAuthService.loadUserProfile().then(
        (userProfile) => {
          this.userDetails = userProfile
          console.log("getUserProfile:", this.userDetails['info']['name'])
          if (document.getElementById('userdetails') != null) {
            document.getElementById('userdetails')!.innerHTML += this.userDetails['info']['name'];
          }
        },
        (reason) => {
          console.log("getUserProfile:Could not get user details -details", reason)
        },
      );
    }
    return
  }

  public logout() {
    if (this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.logOut();
    }
  }

}

