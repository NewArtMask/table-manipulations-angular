import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
}