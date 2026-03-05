import { TestBed } from '@angular/core/testing';

import { TutorWebSocket } from './tutor-web-socket-html';

describe('TutorWebSocketHtmlDelta', () => {
  let service: TutorWebSocketHtmlDelta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorWebSocketHtmlDelta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
