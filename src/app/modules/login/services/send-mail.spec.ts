import { TestBed } from '@angular/core/testing';

import { SendMail } from './send-mail';

describe('SendMail', () => {
  let service: SendMail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
