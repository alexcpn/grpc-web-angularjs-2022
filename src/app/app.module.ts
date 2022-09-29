import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { SearchComponent } from './search/search.component';
import { StepperComponent } from './stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider';
import { StepperService } from './stepper.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import { ZendeskComponent } from './zendesk/zendesk.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './login/login.component';
import { LoginWithAzureComponent } from './login-with-azure/login-with-azure.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StepperComponent,
    ZendeskComponent,
    LoginComponent,
    LoginWithAzureComponent
  ],
  imports: [
    BrowserModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    AppRoutingModule,
    MatListModule,
    HttpClientModule,
    OAuthModule.forRoot()
    
  ],
  providers: [
    SearchService,
    StepperService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
