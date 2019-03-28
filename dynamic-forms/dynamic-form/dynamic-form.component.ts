import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormService } from '../dynamic-form.service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit { 
  @Input() fields: DynamicFormField[] = [];
  form: FormGroup;
 
  constructor(private dynamicFormService: DynamicFormService) {

  }
 
  ngOnInit() {
    this.form = this.dynamicFormService.toFormGroup(this.fields.map(v => v.fieldMetadata));
  }
 
}
