import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


const oAuthConfigGoogle: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId: environment.googleclientid,
  dummyClientSecret: environment.googleclientsecret,
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
