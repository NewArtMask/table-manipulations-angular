import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {
  transform(pageAmount: number): number[] {
    return Array.from({ length: pageAmount }, (_, i) => i + 1);
  }
}
