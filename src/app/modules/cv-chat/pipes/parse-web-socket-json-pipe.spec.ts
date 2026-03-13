import { ParseWebSocketJsonPipe } from './parse-web-socket-json-pipe';

describe('ParseWebSocketJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new ParseWebSocketJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
