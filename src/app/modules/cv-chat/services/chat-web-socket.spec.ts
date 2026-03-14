import { TestBed } from '@angular/core/testing';

import { ChatWebSocket } from './chat-web-socket';

describe('ChatWebSocket', () => {
  let service: ChatWebSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatWebSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
