import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';



type UserDetails = {
  [key: string]: any; // 👈️ variable key

};
const oAuthConfigAzure: AuthConfig = {
  //issuer: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize', as https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
  issuer:'https://login.microsoftonline.com/5d471751-9675-428d-917b-70f44f9630b0/v2.0',
  strictDiscoveryDocumentValidation: false,
  clientId: 'a27870f0-13fa-406e-beb1-7a9ff703a87c',
  dummyClientSecret: 'dummy',
  scope: "openid profile",
  redirectUri: "http://localhost:4200/LoginAzure",
  userinfoEndpoint: 'https://graph.microsoft.com/oidc/userinfo',
  responseType: 'code',
  showDebugInformation: true,
  // Activate Session Checks: #TODO
  sessionChecksEnabled: false,

}

@Component({
  selector: 'app-login-with-azure',
  templateUrl: './login-with-azure.component.html',
  styleUrls: ['./login-with-azure.component.css']
})
export class LoginWithAzureComponent implements OnInit {
  userDetails:UserDetails;

  constructor(private authService: AuthService) {
    authService.configure(oAuthConfigAzure)
    this.userDetails = authService.getUserProfile()
   }

  ngOnInit(): void {
  }


  loginWithMicrosoft(){
    this.authService.loginWithMicrosoft()
  }
  
 isLoggedIn(){
   return this.authService.isLoggedIn()
      
  }

  public logOut(){
    return this.authService.logout()
  }
  

}
