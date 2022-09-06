import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { StepperService } from '../stepper.service';
import { AppOnboardingRequest, AppOnboardingResponse } from './proto/app_onboarding/app_onboarding_pb';
import * as grpcWeb from 'grpc-web';

export interface Food {
   value: string;
   display: string;
}
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class StepperComponent implements OnInit {

  title = 'materialApp';   
  firstFormGroup: FormGroup;
  completed: boolean = false;
  state!: string;
  service: StepperService;
  response:AppOnboardingResponse;

  constructor(private _formBuilder: FormBuilder,service:StepperService) {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required],
      emailId: ['', Validators.required],
      applicationName: ['', Validators.required],
      applicationDescription: ['', Validators.required]
    });
    this.service = service
    // Empty object
    this.response = <AppOnboardingResponse>{}
    
  }
  ngOnInit(): void {
  
  }

  async done() {
    this.completed = true;
    this.state = 'done';
    console.log(this.firstFormGroup.valid);
    console.log(this.firstFormGroup.get('companyName')!.value)
    console.log(this.firstFormGroup.get('applicationName')!.value)
    var request: AppOnboardingRequest = new AppOnboardingRequest()
    request.setCompanyName(this.firstFormGroup.get('companyName')!.value)
    request.setEmailId(this.firstFormGroup.get('emailId')!.value)
    request.setApplicationDescription(this.firstFormGroup.get('applicationDescription')!.value)
    request.setApplicationName(this.firstFormGroup.get('applicationName')!.value)
    try {
      this.response =await  this.service.submitToAppService(request)  
      console.log("Got Success Response from Server ",this.response.getAppResponse())
    } catch (error) {
      console.log("Error from GRPC Server--->",(error as grpcWeb.RpcError).message)
    }
    
  }

}
