import { IAuth } from "./IAuth";

export interface ILoginRequest extends IAuth {
  expiresInMins: number;
}