import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


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
  
}
