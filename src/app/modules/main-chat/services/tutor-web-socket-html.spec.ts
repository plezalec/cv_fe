import { TestBed } from '@angular/core/testing';

import { TutorWebSocket } from './tutor-web-socket-html';

describe('TutorWebSocketHtml', () => {
  let service: TutorWebSocketHtml;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorWebSocketHtml);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
