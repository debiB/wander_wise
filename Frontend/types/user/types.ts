export interface userLogin {
  email: string;
  password: string;
}
export interface userLoginReturnObjectType {
  token: string;  
}
export interface OtpVerificationPayload {
  otp: string;
}
export interface OtpVerificationPayloadResponse {
  otp: string;
}