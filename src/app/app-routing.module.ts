import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { SearchComponent } from './search/search.component';
import { ZendeskComponent } from './zendesk/zendesk.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: 'Add Application', component: StepperComponent,canActivate: [AuthGuard] },
  { path: 'Search', component: SearchComponent,canActivate: [AuthGuard] },
  {path: 'Zen-desk',component:ZendeskComponent,canActivate: [AuthGuard]},
  {path: 'Login',component:LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ],
  providers:[]
})
export class AppRoutingModule { }
