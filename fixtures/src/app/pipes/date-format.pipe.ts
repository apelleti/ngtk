import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string, format: string = 'short'): string {
    const date = new Date(value);
    if (format === 'short') return date.toLocaleDateString();
    return date.toLocaleString();
  }
}
