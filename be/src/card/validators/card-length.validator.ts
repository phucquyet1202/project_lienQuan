import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'CardLengthValidator', async: false })
export class CardLengthValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const object = args.object as any;
    const type = object.type;

    const lengthConditions = {
      Viettel: { pin: [13, 15], seri: [11, 14] },
      Mobifone: { pin: [12], seri: [15] },
      VNM: { pin: [12], seri: [16] },
      Vinaphone: { pin: [14], seri: [14] },
      Garena: { pin: [16], seri: [9] },
      Zing: { pin: [9], seri: [12] },
      Vcoin: { pin: [12], seri: [12] },
      VTC: { pin: [12], seri: [12] },
    };

    if (!lengthConditions[type]) {
      return false; // Invalid type
    }

    const isPin = args.property === 'pin';
    const validLengths = lengthConditions[type][isPin ? 'pin' : 'seri'];
    return validLengths.includes(value.length);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Độ dài mã thẻ hoặc seri không hợp lệ';
  }
}
