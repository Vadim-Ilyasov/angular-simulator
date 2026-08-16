import { FormControl, FormGroup } from "@angular/forms";

export type ModelFormGroup<T> = {
  [K in keyof T]: T[K] extends object ? FormGroup<ModelFormGroup<T[K]>> : FormControl<T[K]> ;
}; 

export interface IAuth {
  username: string;
  password: string;
}
