import { FormGroup, FormControl } from "@angular/forms";

export type ModelFormGroup<T> = FormGroup<{
    [K in keyof T]: T[K] extends object ? ModelFormGroup<T[K]> : FormControl<T[K]> ;
}>;