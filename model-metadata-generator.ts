import { OpenAPIV2, OpenAPIV3, OpenAPI, IJsonSchema } from './openapi-types';
import * as _  from 'lodash';


export function extractOpenApi2Schemas(allSchemas: { [key: string]: OpenAPIV2.SchemaObject }): {[key: string]: IJsonSchema} {
    let result: { [key: string]: OpenAPIV2.SchemaObject } = {};
    Object.keys(allSchemas).forEach(key=>{
        let schemaObject = allSchemas[key];
        let mergedSchema: OpenAPIV2.SchemaObject = {};
        this.mergePropertiesV2(schemaObject, allSchemas).forEach(element => {
            mergedSchema = _.mergeWith(mergedSchema, element, (a,b)=>{
                if (_.isArray(a)) {
                    return _.union(a,b);
                }
            });
            result[key] = mergedSchema;
        });
    });
    return result;
}

export function mergePropertiesV2(schemaObject:OpenAPIV2.SchemaObject, allSchemas:{ [key: string]: OpenAPIV2.SchemaObject } ): IJsonSchema[]
{
    let result: OpenAPIV2.SchemaObject[] = [];
    if(schemaObject.$ref)
    {
        let refString:string = schemaObject.$ref;
        const refToFind:string = refString.replace(/^(#\/definitions\/)/, "");
        const indexFound = Object.keys(allSchemas).indexOf(refToFind);
        delete schemaObject.$ref;
        if(indexFound>=0)
        {
            return this.mergePropertiesV2(allSchemas[refToFind], allSchemas);
        }
    }
    else
    {
        if(schemaObject.allOf)
        {
            schemaObject.allOf.forEach((subSchema: IJsonSchema)=>{
                let allOfSchemas = this.mergePropertiesV2(subSchema, allSchemas);
                allOfSchemas.forEach((element:OpenAPIV2.SchemaObject) => {
                    schemaObject = _.mergeWith({}, schemaObject, element, (a,b)=>{
                        if (_.isArray(a)) {
                            return _.union(a,b);
                        }
                    });
                });
            });
            delete schemaObject.allOf;
            result.push(schemaObject);
        }
        else
            result.push(schemaObject);
    }
    return result;
}