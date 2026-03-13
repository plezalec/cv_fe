import { Pipe, PipeTransform, Injectable, inject } from '@angular/core';
import { SpecialButton } from './components/special-button/special-button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'buildHtmlFromJson',
})
@Injectable({ providedIn: 'root' })
export class BuildHtmlFromJsonPipe implements PipeTransform {
  
  private componentMap: Map<string, any> = new Map([
    ['app-special-button', SpecialButton],
  ]);
  
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown, ...args: unknown[]): SafeHtml {
    const self = this;
    function buildHtmlFromJson(node: any): SafeHtml {
      const html_string = self.transform_recursive(node);
      const custom_components_html = self.replaceComponentTags(html_string);
      const sanitized = self.sanitizer.bypassSecurityTrustHtml(custom_components_html);
      return sanitized;
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

  private replaceComponentTags(html: string): string {
    this.componentMap.forEach((_: any, tag: string) => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>|<${tag}[^>]*/?>`, 'gs');
      html = html.replace(regex, `<div class="dynamic-component-placeholder" data-component="${tag}"></div>`);
    });
    return html;
  }
}
