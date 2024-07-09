export interface AuthLoginRequest {
  username: string;
  password: string;
  signalRConnectionId:string | null | undefined;
}
