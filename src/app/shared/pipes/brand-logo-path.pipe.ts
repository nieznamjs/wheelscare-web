import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandLogoPath',
})
export class BrandLogoPathPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').join('-').toLowerCase();
  }
}
