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
    if (value.maxlength) {
      return `Maximum
        ${value.maxlength.requiredLength} karakter hosszú legyen.`;
    }
    if (value.pattern) {
      return `Csak számokat tartalmazhat.`;
    }
    if (value.email) {
      return 'Hiányzó karakter @...';
    }
    if (value.min) {
      return 'Az érték túl kicsi!';
    }
    if (value.max) {
      return 'Az érték túl nagy!';
    }
    return JSON.stringify(value);
  }

}
