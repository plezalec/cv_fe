import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'buildHtmlFromJson',
})
@Injectable({ providedIn: 'root' })
export class BuildHtmlFromJsonPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const self = this;
    function buildHtmlFromJson(node: any): string {
      return self.transform_recursive(node);
    }
    return buildHtmlFromJson(value);
  }

  private transform_recursive(child: any): string {
    const tagName = (child as any)["tag"];
    const attrs = (child as any)["attributes"] ? Object.entries((child as any)["attributes"]).map(([k, v]) => `${k}="${v}"`).join(' ') : '';
    const children = (child as any)["children"] ? Object.values((child as any)["children"]).map((c: any) => this.transform_recursive(c)).join('') : '';
    const text = (child as any)["text"] ? (child as any)["text"] : '';
    return `<${tagName}${attrs ? ' ' + attrs : ''}>${text}${children}</${tagName}>`;
  }
}
