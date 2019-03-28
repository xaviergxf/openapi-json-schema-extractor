import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormField, DynamicFormControlType } from './dynamic-form-field';
import { environment } from '@root/environments/environment';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent implements OnChanges {
  @Input() field: DynamicFormField;
  @Input() form: FormGroup;

  ngOnChanges(changes: SimpleChanges) {
    if (!environment.production && changes['field']) {
      this.validateFields();
    }
  }
  validateFields() {
    let allowedControlTypes: DynamicFormControlType[] = [];
    switch (this.field.fieldMetadata.dataType) {
      case "string":
        allowedControlTypes = ['text', 'textarea'];
        if (allowedControlTypes.indexOf(this.field.controlType))
          throw new Error(`Field metadata ${this.field.fieldMetadata.name} Data type ${this.field.fieldMetadata.dataType} is not compatible with control type`);
        break;
    }
   
  }
}
