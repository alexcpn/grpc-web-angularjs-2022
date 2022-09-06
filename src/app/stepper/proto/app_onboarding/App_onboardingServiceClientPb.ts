/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as app_onboarding_app_onboarding_pb from '../app_onboarding/app_onboarding_pb';


export class AppOnboardingServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorOnBoardApp = new grpcWeb.MethodDescriptor(
    '/AppOnboardingService/OnBoardApp',
    grpcWeb.MethodType.UNARY,
    app_onboarding_app_onboarding_pb.AppOnboardingRequest,
    app_onboarding_app_onboarding_pb.AppOnboardingResponse,
    (request: app_onboarding_app_onboarding_pb.AppOnboardingRequest) => {
      return request.serializeBinary();
    },
    app_onboarding_app_onboarding_pb.AppOnboardingResponse.deserializeBinary
  );

  onBoardApp(
    request: app_onboarding_app_onboarding_pb.AppOnboardingRequest,
    metadata: grpcWeb.Metadata | null): Promise<app_onboarding_app_onboarding_pb.AppOnboardingResponse>;

  onBoardApp(
    request: app_onboarding_app_onboarding_pb.AppOnboardingRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: app_onboarding_app_onboarding_pb.AppOnboardingResponse) => void): grpcWeb.ClientReadableStream<app_onboarding_app_onboarding_pb.AppOnboardingResponse>;

  onBoardApp(
    request: app_onboarding_app_onboarding_pb.AppOnboardingRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: app_onboarding_app_onboarding_pb.AppOnboardingResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/AppOnboardingService/OnBoardApp',
        request,
        metadata || {},
        this.methodDescriptorOnBoardApp,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/AppOnboardingService/OnBoardApp',
    request,
    metadata || {},
    this.methodDescriptorOnBoardApp);
  }

}

