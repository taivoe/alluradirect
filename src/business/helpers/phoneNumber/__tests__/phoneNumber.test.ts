import { getAllCountryCallingCodes, parsePhone } from '../phoneNumber';

describe('parse works', () => {
  it('parses valid E.164 phone numbers from twilio example', () => {
    const brazil1 = '+551155256325';
    const brazil1Result = parsePhone(brazil1);
    expect(brazil1Result.countryCode).toEqual('55');
    expect(brazil1Result.subscriberNumber).toEqual('1155256325');

    const greatBritain1 = '+442071838750';
    const greatBritain1Result = parsePhone(greatBritain1);
    expect(greatBritain1Result.countryCode).toEqual('44');
    expect(greatBritain1Result.subscriberNumber).toEqual('2071838750');

    const us1 = '+14155552671';
    const us1Result = parsePhone(us1);
    expect(us1Result.countryCode).toEqual('1');
    expect(us1Result.subscriberNumber).toEqual('4155552671');
  });

  it('parses various numbers from reservations at property 1794', () => {
    const n1 = '16044770831';
    const n1Result = parsePhone(n1);
    expect(n1Result.countryCode).toEqual('1');
    expect(n1Result.subscriberNumber).toEqual('6044770831');

    const n2 = '15198817949';
    const n2Result = parsePhone(n2);
    expect(n2Result.countryCode).toEqual('1');
    expect(n2Result.subscriberNumber).toEqual('5198817949');

    const n3 = '85295232551';
    const n3Result = parsePhone(n3);
    expect(n3Result.countryCode).toEqual('852');
    expect(n3Result.country).toEqual('HK');
    expect(n3Result.subscriberNumber).toEqual('95232551');

    const n4 = '14258981248';
    const n4Result = parsePhone(n4);
    expect(n4Result.countryCode).toEqual('1');
    expect(n4Result.country).toEqual('US');
    expect(n4Result.subscriberNumber).toEqual('4258981248');
  });

  it('parses mysterious taivo numbers from the database', () => {
    const n1 = '004915776451866';
    const n1Result = parsePhone(n1);
    expect(n1Result.countryCode).toEqual('49');
    expect(n1Result.country).toEqual('DE');
    expect(n1Result.subscriberNumber).toEqual('15776451866');

    const n2 = '628161869626';
    const n2Result = parsePhone(n2);
    expect(n2Result.countryCode).toEqual('62');
    expect(n2Result.country).toEqual('ID');
    expect(n2Result.subscriberNumber).toEqual('8161869626');

    const n3 = '61422351974';
    const n3Result = parsePhone(n3);
    expect(n3Result.countryCode).toEqual('61');
    expect(n3Result.country).toEqual('AU');
    expect(n3Result.subscriberNumber).toEqual('422351974');

    const n4 = '491718363245';
    const n4Result = parsePhone(n4);
    expect(n4Result.countryCode).toEqual('49');
    expect(n4Result.country).toEqual('DE');
    expect(n4Result.subscriberNumber).toEqual('1718363245');

    // TODO: this phone number is too mysterious for our system to handle
    // It may be a switzerland phone number that was formatted incorrectly
    // const n5 = '10413245531';
    // const n5Result = parsePhoneNumberV2(n5);
    // expect(n5Result.countryCode).toEqual('1');
    // expect(n5Result.country).toEqual('CA');
    // expect(n5Result.subscriberNumber).toEqual('0413245531');

    // TODO: another borked number
    // const n6 = '021410816';
    // const n6Result = parsePhoneNumberV2(n6);
    // console.log(n6Result);
    // expect(n6Result.countryCode).toEqual('1');
    // expect(n6Result.country).toEqual('CA');
    // expect(n6Result.subscriberNumber).toEqual('021410816');

    // TODO: another borked number
    // const n7 = '0011610733526663';
    // const n7Result = parsePhoneNumberV2(n7);
    // console.log(n7Result);
    // expect(n7Result.countryCode).toEqual('1');
    // expect(n7Result.country).toEqual('US');
    // expect(n7Result.subscriberNumber).toEqual('610733526663');
  });
});

describe(getAllCountryCallingCodes.name, () => {
  it('loads countries and their calling codes', () => {
    const res = getAllCountryCallingCodes();
    expect(res.length).toBeGreaterThan(0);

    res.forEach(({ countryCode, callingCode, countryName }) => {
      expect(countryCode.length).toBeGreaterThan(0);
      expect(callingCode.length).toBeGreaterThan(0);
      expect(countryName.length).toBeGreaterThan(0);
    });
  });
});
