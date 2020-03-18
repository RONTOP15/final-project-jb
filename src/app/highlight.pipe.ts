import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) { }
  transform(value: any, args: any): any {

    console.log("value: " + value, "args: " + args)

    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);
    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }
    const result = value.replace(re, "<mark>" + match[0] + "</mark>");
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}


