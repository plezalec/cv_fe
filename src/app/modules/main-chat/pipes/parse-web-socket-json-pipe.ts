import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'parseWebSocketJson',
})
@Injectable({ providedIn: 'root' })
export class ParseWebSocketJsonPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') return value;
    try {
      let parsed = JSON.parse(value);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse JSON:', e, value);
      return null;
    }
  }

}
