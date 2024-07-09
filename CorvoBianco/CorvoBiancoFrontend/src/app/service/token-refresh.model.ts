import {AuthenticationToken} from "../../authentification/authentificationToken";


export interface JwtRefreshResponse {
  refresh: boolean;
  newToken: string;
  message: string | null;
  authenticationToken: AuthenticationToken;
}
