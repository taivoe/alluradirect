import { TaxIDEnum } from '../../types';

export type TaxItem = ReturnType<typeof generateTaxItem>;

export type BookingTax = typeof TAX;

const PSTRate = 8;
const GSTRate = 5;
const MRDTRate = 3;

const generateTaxItem = ({ AMOUNT }: { AMOUNT: string }) => ({
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: 'PST',
  ID: TaxIDEnum.PST,
  RATE: PSTRate,
  AMOUNT,
});

const generatePSTTax = ({ AMOUNT }: { AMOUNT: string }): TaxItem => ({
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: 'PST',
  ID: TaxIDEnum.PST,
  RATE: PSTRate,
  AMOUNT,
});

const generateGSTTax = ({ AMOUNT }: { AMOUNT: string }): TaxItem => ({
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: 'GST',
  ID: TaxIDEnum.GST,
  RATE: GSTRate,
  AMOUNT,
});

const generateMRDTax = ({ AMOUNT }: { AMOUNT: string }): TaxItem => ({
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: 'MRDT',
  ID: TaxIDEnum.GST,
  RATE: MRDTRate,
  AMOUNT,
});

const BOOKING_TAX = [
  generatePSTTax({ AMOUNT: '222.40' }),
  generateMRDTax({ AMOUNT: '83.40' }),
  generateGSTTax({ AMOUNT: '139.00' }),
];

const TAX_TOTALS = [
  generatePSTTax({ AMOUNT: '222.40' }),
  generateMRDTax({ AMOUNT: '83.40' }),
  generateGSTTax({ AMOUNT: '139.00' }),
];

const TAX = {
  RATE_TOTAL: 16,
  BOOKING: BOOKING_TAX,
  TOTAL: '444.80',
  PERCENTAGES: '8% PST, 3% MRDT, 5% GST',
  TOTALS: TAX_TOTALS,
};
