import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { clabe } from 'clabe-validator';
import { isValidIBAN } from 'ibantools';

export function bankAccountValidator(paymentMethod: string | any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.replace(/\s+/g, '').toUpperCase();

        if (!value) return null;

        switch (paymentMethod) {
            case 'CLABE':
                return /^\d{18}$/.test(value) && clabe.validate(value)
                    ? null
                    : { invalidClabe: true };

            case 'IBAN':
                return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value) && isValidIBAN(value)
                    ? null
                    : { invalidIban: true };

            case 'Tarjeta de Crédito':
                return /^\d{13,19}$/.test(value) && isValidCardNumber(value)
                    ? null
                    : { invalidCard: true };
              case 'Tarjeta de Débito':
                return /^\d{13,19}$/.test(value) && isValidCardNumber(value)
                    ? null
                    : { invalidCard: true };
             case 'EFECTIVO':
                return { invalidCard: false };            

            default:
                return { unsupportedPaymentMethod: true };
        }
    };
}

function isValidCardNumber(card: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = card.length - 1; i >= 0; i--) {
        let digit = parseInt(card.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}
