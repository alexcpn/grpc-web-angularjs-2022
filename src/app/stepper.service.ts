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

    let host ='http://k8s-grpc-apponboa-361a6e7856-1847907397.eu-central-1.elb.amazonaws.com:80'
    //let host = 'http://localhost:8081'
    var client:AppOnboardingServiceClient = new AppOnboardingServiceClient(host,null,null)
     
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
