import { ValidatorFn, AbstractControl } from '@angular/forms';
import { cnpjIsValid, cpfIsValid } from '../utils/validators';
import { Patterns } from '../utils/patterns';

export function cpfCnpjValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const cpfCnpj = control.value
      ? control.value.replace(Patterns.DIGITS, '')
      : '';
    let error = null;
    if (!cpfCnpj || cpfCnpj.length === 0) return error;
    if (cpfCnpj.length <= 11) {
      if (!cpfIsValid(cpfCnpj)) {
        error = { 'invalid-cpf': true };
      }
    } else {
      if (!cnpjIsValid(cpfCnpj)) {
        error = { 'invalid-cnpj': true };
      }
    }

    return error;
  };
}
