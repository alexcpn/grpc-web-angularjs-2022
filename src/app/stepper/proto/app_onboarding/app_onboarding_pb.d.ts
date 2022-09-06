import * as jspb from 'google-protobuf'



export class AppOnboardingRequest extends jspb.Message {
  getCompanyName(): string;
  setCompanyName(value: string): AppOnboardingRequest;

  getEmailId(): string;
  setEmailId(value: string): AppOnboardingRequest;

  getApplicationName(): string;
  setApplicationName(value: string): AppOnboardingRequest;

  getApplicationDescription(): string;
  setApplicationDescription(value: string): AppOnboardingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppOnboardingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AppOnboardingRequest): AppOnboardingRequest.AsObject;
  static serializeBinaryToWriter(message: AppOnboardingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppOnboardingRequest;
  static deserializeBinaryFromReader(message: AppOnboardingRequest, reader: jspb.BinaryReader): AppOnboardingRequest;
}

export namespace AppOnboardingRequest {
  export type AsObject = {
    companyName: string,
    emailId: string,
    applicationName: string,
    applicationDescription: string,
  }
}

export class AppOnboardingResponse extends jspb.Message {
  getAppResponse(): string;
  setAppResponse(value: string): AppOnboardingResponse;

  getCompanyId(): number;
  setCompanyId(value: number): AppOnboardingResponse;

  getTimestamp(): string;
  setTimestamp(value: string): AppOnboardingResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppOnboardingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AppOnboardingResponse): AppOnboardingResponse.AsObject;
  static serializeBinaryToWriter(message: AppOnboardingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppOnboardingResponse;
  static deserializeBinaryFromReader(message: AppOnboardingResponse, reader: jspb.BinaryReader): AppOnboardingResponse;
}

export namespace AppOnboardingResponse {
  export type AsObject = {
    appResponse: string,
    companyId: number,
    timestamp: string,
  }
}

