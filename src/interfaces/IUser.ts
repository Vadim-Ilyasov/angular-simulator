import { FormControl, FormGroup } from "@angular/forms";

export type ModelFormGroup<T> = {
    [K in keyof T]: T[K] extends object ? FormGroup<ModelFormGroup<T[K]>> : FormControl<T[K]> ;
}; 

export interface IUser {
  id: number;
  name: string | null;
  username: string | null;
  email: string | null;
  address: {
    city: string | null;
    street: string | null;
    suite: string | null;
    zipcode: number | null;
    geo: {
      lat: number | null;
      lng: number | null;
    };
  };
  phone: number | null;
  website: string | null;
  company: {
    name: string | null;
    catchPhrase: string | null;
    bs: string | null;
  };
}
