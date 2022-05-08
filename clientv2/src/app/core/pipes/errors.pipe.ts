import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'appErrors'
})
export class ErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors): string {
    if (value.required) {
      return 'Mező kitöltése kötelező.';
    }
    if (value.minlength) {
      return `Mimumum
        ${value.minlength.requiredLength} karakter hosszú legyen.`;
    }
    if (value.email) {
      return 'Hiányzó karakter @...';
    }
    if (value.min) {
      return 'Rossz érték!';
    }
    if (value.max) {
      return 'Rossz érték!';
    }
    return JSON.stringify(value);
  }

}
