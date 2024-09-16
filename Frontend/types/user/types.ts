export interface userLogin {
  email: string;
  password: string;
}
export interface userSignUp{
  email: string;
  password: string;
  name: string;
}
export interface userLoginReturnObjectType {
  name: string
  token: string;  
}
export interface OtpVerificationPayload {
  email: string;
  otp: string;
}
export interface OtpVerificationPayloadResponse {
  
  otp: string;
}