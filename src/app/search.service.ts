import { Call } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as grpcWeb from 'grpc-web';
import { SearchServiceClient } from './search/proto/microservice1/TestServiceClientPb';
import { SearchRequest, SearchResponse } from './search/proto/microservice1/test_pb';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  response:string[]

  constructor() { 
    this.response =[]
  }

  getCourseList(){
    return ["Course 1","Course 2","Course 3"]
  }

   async getDatafromGRPCServer():Promise<string[]>{
    var client:SearchServiceClient = new SearchServiceClient('http://localhost:8080',null,null)
    var searchRequest:SearchRequest = new SearchRequest()
    searchRequest.setQuery("Test Query")
    searchRequest.setEmailId("test@test.com")

    var dl = new Date();
    dl.setSeconds(dl.getSeconds() + 1);
    let dl_str = dl.getTime().toString()

    //Option 1 - Calling with Async
    try {
      
      let response = await client.search(searchRequest,{deadline:dl_str})
      return [response.getSearchResponse()]
    } catch (error) {
      console.log("Error from GRPC Server--->",(error as grpcWeb.RpcError).message)
      return []
    }
   

    //Option 2 - Calling with the callback
    /*
    const call = client.search(searchRequest,{deadline:dl_str}, (err: grpcWeb.RpcError,response: SearchResponse) =>{
      if(err){
        console.log("Error from GRPC Server--->",err.message)
        this.response= []

      }
      this.response.push(response.getSearchResponse())
      //console.log("Got response from GRPC Server",this.response)
    });
    call.on('status', (status: grpcWeb.Status) => {
      if (status.metadata) {
        console.log("Grpc-greeter.service.ts status-->", status);
      }
    });
    console.log("Got response from GRPC Server",this.response)
    return this.response
    */
  }
}
