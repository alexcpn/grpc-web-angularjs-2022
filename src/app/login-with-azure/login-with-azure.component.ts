import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


type UserDetails = {
  [key: string]: any; // 👈️ variable key

};

const oAuthConfigAzure: AuthConfig = {
  issuer:'https://login.microsoftonline.com/'+environment.azuretenantid +'/v2.0',
  strictDiscoveryDocumentValidation: false,
  clientId: environment.azureclientid,
  //dummyClientSecret: 'dummy',
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
