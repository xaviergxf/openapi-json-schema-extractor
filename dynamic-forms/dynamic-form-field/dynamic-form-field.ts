import { FieldMetadata } from "../../model-metadata/field-metadata";

export type DynamicFormControlType = 'text' | 'textarea' | 'number' | 'enum' | 'dropdown' | 'checkbox' | 'date' | 'datetime' | 'typeahead' | 'file';

export interface DynamicFormField {
  controlType: DynamicFormControlType;
  fieldMetadata: FieldMetadata
}
