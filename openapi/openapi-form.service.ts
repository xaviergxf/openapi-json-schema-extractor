import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swagger from 'swagger-parser/dist/swagger-parser';
import { map, throttle } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OpenAPIFormService {

  constructor(
  )
  {

  }

  createFormGroup(openApiObject: any, typeName: string): Observable<FormGroup> {
    let result = <Observable<FormGroup>>(Swagger.dereference(openApiObject).then(v => {
      if (v.swagger === '2.0') {
        if (!v.definitions)
          throw new Error(`OpenAPI v2.0 doesn't contain definitions property. It's not compliant with Openapi v2.0`);
        let definitionType = v.definitions[typeName];
        if (!definitionType)
          throw new Error(`OpenAPI v2.0 doesn't contain the definition ${typeName}`);
        if (!definitionType.properties)
          throw new Error(`OpenAPI v2.0 definition ${typeName} doesn't contain property properties`);

        let controls: { [key: string]: AbstractControl } = {};
        Object.keys(definitionType.properties).map(prop => {
          let isRequired = definitionType.required && definitionType.required.indexOf(prop)>=0 || null;
          let validators: ValidatorFn[] = [];
          if (isRequired)
            validators.push(Validators.required);
          controls[prop] = new FormControl('', validators);
        });
        return new FormGroup(controls);
      } else if (true) {
        throw new Error(``);
      }
    }));

    return from(result);
  }

}
