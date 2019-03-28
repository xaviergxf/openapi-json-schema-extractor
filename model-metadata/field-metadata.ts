export interface FieldMetadata{
  name: string;
  label?: string;

  dataType: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  dataFormat?: string;

  readOnly?: boolean;
  required?: boolean;
  minimum?: number;
  maximum?: number;
  pattern?: string;
}
