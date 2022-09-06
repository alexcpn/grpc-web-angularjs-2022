import { Injectable } from '@angular/core';
import { AppOnboardingServiceClient } from './stepper/proto/app_onboarding/App_onboardingServiceClientPb';
import { AppOnboardingRequest, AppOnboardingResponse } from './stepper/proto/app_onboarding/app_onboarding_pb';
import * as grpcWeb from 'grpc-web';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() { }

  async submitToAppService(request:AppOnboardingRequest):Promise<AppOnboardingResponse>{

    var client:AppOnboardingServiceClient = new AppOnboardingServiceClient('http://localhost:8081',null,null)
     
      var dl = new Date();
      dl.setSeconds(dl.getSeconds() + 1);
      let dl_str = dl.getTime().toString()
  
      //Option 1 - Calling with Async
      try {
        
        let response = await  client.onBoardApp(request,{deadline:dl_str})
        return response
      } catch (error) {
        console.log("Error from GRPC Server--->",(error as grpcWeb.RpcError).message)
        throw (error as grpcWeb.RpcError)
      }
  
  }
}
