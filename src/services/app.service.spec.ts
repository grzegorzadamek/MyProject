import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });

    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post data and return response', () => {
    const testData = 'test data 1';

    service.getMeetingByPost(testData).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('https://netly-node.onrender.com/data');

    expect(req.request.method).toEqual('POST');

    req.flush({ message: 'Success' });
  });
describe('AppService - getMeetingByPost', () => {
  let service: AppService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    })

    service = TestBed.inject(AppService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should send the correct data in the request body', () => {    const testData = 'test data 2'

    service.getMeetingByPost(testData).subscribe()

    const req = httpMock.expectOne('https://netly-node.onrender.com/data')
    expect(req.request.body).toEqual({ data: testData })
    req.flush({})
  })

  it('should handle empty string input', () => {
    const testData = ''

    service.getMeetingByPost(testData).subscribe((res) => {
      expect(res).toBeTruthy()
    })

    const req = httpMock.expectOne('https://netly-node.onrender.com/data')
    expect(req.request.body).toEqual({ data: '' })
    req.flush({ message: 'Empty input received' })
  })

  it('should handle server error responses', () => {
    const testData = 'error test'

    service.getMeetingByPost(testData).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: any) => {
        expect(error.status).toBe(404)
        expect(error.statusText).toBe('Not Found')
      }
    )

    const req = httpMock.expectOne('https://netly-node.onrender.com/data')
    req.flush('Not Found', { status: 404, statusText: 'Not Found' })
  })

  it('should handle different response structures', () => {
    const testData = 'complex data'

    service.getMeetingByPost(testData).subscribe((res) => {
      expect(res.data).toBeTruthy()
      expect(res.timestamp).toBeDefined()
    })

    const req = httpMock.expectOne('https://netly-node.onrender.com/data')
    req.flush({ data: { message: 'Complex response' }, timestamp: Date.now() })
  })
})
});
