import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule  } from '@angular/material';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';

@NgModule({
  declarations: [    
    DynamicFormComponent,
    DynamicFormFieldComponent
  ],
  exports: [
    DynamicFormComponent, DynamicFormFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule 
  ]
})
export class DynamicFormModule { }
