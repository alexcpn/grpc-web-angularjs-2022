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
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StepperComponent
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
    MatDividerModule
    
  ],
  providers: [
    SearchService,
    StepperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
