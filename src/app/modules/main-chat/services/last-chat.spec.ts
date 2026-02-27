import { TestBed } from '@angular/core/testing';

import { LastChat } from './last-chat';

describe('LastChat', () => {
  let service: LastChat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastChat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
