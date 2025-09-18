import * as yup from 'yup';
import { phone } from '../../validationSchemas';
const alluraPhone = '+16047076700';

const validPhoneNumbers = [alluraPhone, '+1(604)7076700', '+1-604-707-6700', '+1(604)7076700 ext 344'];
const invalidPhoneNumbers = ['6043382312', '1', '+', '78787'];

describe('Accepts Correct Phone Numbers', () => {
  validPhoneNumbers.forEach(item => {
    it(`Correct Number:${item} `, async () => {
      const schema = yup.object({
        phone: phone,
      });
      const val = schema.isValidSync({ phone: item });
      expect(val).toBe(true);
    });
  });
});

describe('Rejects incorrect numbers', () => {
  invalidPhoneNumbers.forEach(item => {
    it(`Incorrect Number:${item} `, async () => {
      const schema = yup.object({
        phone: phone,
      });
      const val = schema.isValidSync({ phone: item });
      expect(val).toBe(false);
    });
  });
});
