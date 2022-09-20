import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userProfile;

  constructor(private authService: AuthService) {
    this.userProfile = {}
   }

  ngOnInit(): void {
  }

  login(){
    this.authService.login()
  }
  
 isLoggedIn(){
   return this.authService.isLoggedIn()
      
  }
  getUserProfile(){
  return  this.authService.getUserProfile()
 }

}
