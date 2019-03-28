import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldMetadata } from '../model-metadata/field-metadata';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  constructor() { }

  toFormGroup(fieldMetadatas: FieldMetadata[] ) {
    let group: any = {};

    fieldMetadatas.forEach(fieldMetadata => {
      group[fieldMetadata.name] = fieldMetadata.required ? new FormControl(undefined, Validators.required)
        : new FormControl(undefined);
    });
    return new FormGroup(group);
  }
}
