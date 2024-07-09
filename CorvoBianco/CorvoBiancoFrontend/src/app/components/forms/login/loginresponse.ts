import {AuthenticationToken} from "../../../../authentification/authentificationToken";

export interface AuthLoginResponse {
  authenticationToken: AuthenticationToken
  isLogged: boolean;
}

