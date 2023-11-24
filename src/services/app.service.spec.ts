import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';

describe('AppService', () => {

  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });

    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post data and return response', () => {

    const testData = 'test data 1';

    service.getMeetingByPost(testData).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('https://netly-node.onrender.com/data');

    expect(req.request.method).toEqual('POST');

    req.flush({message: 'Success'});

  });

});
