import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpenAPIFormService } from './openapi-form.service';
import * as AccountClosureOpenAPI from '@root/app/account-closure/swagger.json';

describe('OpenAPIFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [OpenAPIFormService],
  }));

  it('should parse openapi correctly', () => {
    const service: OpenAPIFormService = TestBed.get(OpenAPIFormService);
    expect(service).toBeTruthy();
    let formCreated = service.createFormGroup(AccountClosureOpenAPI, 'StepDetail');
    expect(formCreated).toBeTruthy();
  });
});
