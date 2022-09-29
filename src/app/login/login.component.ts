import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';


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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetails:UserDetails;

  constructor(private authService: AuthService) {
    this.authService.configure(oAuthConfigGoogle)
    this.userDetails = authService.getUserProfile()
   }

  ngOnInit(): void {
  }

  loginWithGoolge(){
    this.authService.loginWithGoolge()
  }

  
 isLoggedIn(){
   return this.authService.isLoggedIn()
      
  }

  public logOut(){
    return this.authService.logout()
  }
  
}
