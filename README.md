
# AngularJS based GRPC Client with GRPC Web

This project demonstrates how to consume a GRPC Service in a Angular Application directly from a Server, using Google [Grpc-Web -https://github.com/grpc/grpc-web](https://github.com/grpc/grpc-web) framework.

GRPC is pretty popular in the server side and for Microservices. In the client side, usually a REST translation service is used to convert between the backend's and front end's. With GRPC web this is no longer needed. Each Angular Component+Service can be thought of as a small client side microservice that calls the server side services directly instead of getting translated through to REST and back.

Note that the GRPC server cannot by itself handle the GRPC-Web JS client calls; and we have the Envoy proxy running as a sidecar to do the header and padding etc as per GRPC protocol. How to configure the Envoy side car with relation to the Go server are here 
https://github.com/alexcpn/go_grpc_2022/tree/main/k8sdeployment

The server project is here https://github.com/alexcpn/go_grpc_2022

Related articles 

https://medium.com/better-software/rest-in-peace-grpc-for-micro-service-and-grpc-for-the-web-a-how-to-908cc05e1083

https://medium.com/better-software/interface-grpc-with-web-using-grpc-web-and-envoy-possibly-the-best-way-forward-3ae9671af67


---

## Summary

We will create an Angular Component called `search` for View and and Angular Service `search` which has the typescript code for GRPC client.
Also the `package.json` to compile the protobuffer  files in folder
[test-proj/src/app/search/proto](src/app/search/proto)


![grpcweb](https://i.imgur.com/1DjKYhe.png)






## Step 1: Create a new project

```
ng new test-proj
```

## Step 2: Generate a Component

Component in Angular is what has the HTML

```
ng generate component  search 
```

This creates a component under [test-proj/src/app/search](src/app/search)

Let remove the default contents in [test-proj/src/app/app.component.html](src/app/app.component.html); select all and delete all contents

and add the components data  by adding the following tag in above file

```
<app-search></app-search>
```

Now the main page will reflect the html in the component [test-proj/src/app/search/search.component.html](src/app/search/search.component.html`)


## Step 3: Create a Service


```
ng generate service search
```
This creates the following service files  [src/app/search.service.ts](src/app/search.service.ts) and a .spec for testing

The Service class will provide the data and functions needed for the components

## Step 4: Inject the service to the Component via Dependency Injection

Basically add to Provider in [test-proj/src/app/app.module.ts](src/app/app.module.ts)

```
  providers: [
    SearchService
  ],
  ```

  And add this to the Ctor of the component [test-proj/src/app/search/search.component.ts](src/app/search/search.component.ts`)

  ```
  export class SearchComponent implements OnInit {

  service;
  constructor(service:SearchService) {
    this.service = service
   }

```
Okay we have wired the component and the service; Next we will add some html to the component

Let's start compiling and auto-compile with ng-serve

```
ng serve
```
You should be able to see the client in localhost:4200 or some other port


## Step 5: Add a method to Service  and call it from Component

Let's add a method call `getCourses` to service file [test-proj/src/app/search.service.ts](src/app/search.service.ts`)

```
export class SearchService {

  constructor() { }

  getCourseList(){
    return ["Course 1","Course 2"]
  }
}
```
In the component add a method for button click

```
export class SearchComponent implements OnInit {

  service;
  courses; //Added
  constructor(service:SearchService) {
    this.service = service
    this.courses = [""]
   }

  onClick(){ //added
    this.courses =this.service.getCourseList()
  }
  ngOnInit(): void {
  }

}
```
And let's add some HTML to the component to call this method

```
<p>Test Component works!</p>
<button (click)="onClick()"> Call Service</button>
<h3>List of Courses</h3>
<li *ngFor="let course of courses">
    {{course}}    
</li>
```

You should be able to see the following on screen on button-click

So far is simple Angular related parts;

Now we will add GRPC-Web to the Client part; 

For that we need to do the following; Copy the Protos of the service we need to call here in another folder

We are adding it here [test-proj/src/app/search/interfaces/microservice1/test.proto](src/app/search/interfaces/microservice1/test.proto`)

Then we need to add the `compile` directive for `protoc` and `protoc-gen-ts` to generate the necessary client files in the `package.json` file

```
"compile": "./node_modules/protoc/protoc/bin/protoc  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:src/app/search/proto  --grpc-web_out=import_style=typescript,mode=grpcweb:src/app/search/proto -I ./src/app/search/interfaces/ ./src/app/search/interfaces/**/*.proto",
 ```

Pre-requisite : you need to install these plug-ins as pre-requisite

```
npm install google-protobuf protoc ts-protoc-gen
npm i --save-dev @types/google-protobuf
npm install grpc-web
```

Compile with npm

```
test-proj$ npm run compile
```

After that we use the generated client files as shown  in our service - [test-proj/src/app/search.service.ts](src/app/search.service.ts)

You can see just changes of the added code here https://github.com/alexcpn/grpc-web-angularjs-2022/pull/1/files without the generated code.

