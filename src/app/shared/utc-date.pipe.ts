import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * El backend guarda las fechas en UTC y las devuelve sin zona ("2026-10-29 16:58:15").
 * Las interpreta como UTC y las muestra en la hora local del navegador.
 */
@Pipe({
  name: 'utcDate',
  standalone: true
})
export class UtcDatePipe implements PipeTransform {
  transform(value: string | null | undefined, format = 'yyyy/MM/dd HH:mm:ss'): string {
    if (!value) {
      return '';
    }
    const date = new Date(value.replace(' ', 'T') + 'Z');
    return isNaN(date.getTime()) ? value : formatDate(date, format, 'en-US');
  }
}
