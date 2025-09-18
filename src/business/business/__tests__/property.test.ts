import {
  chaletOrHouse,
  defaultPropertyTitle,
  generateDevelopmentUnitTitle,
  generatePropertyTitle,
  generateStreetNumberNameTitle,
  hasPropertyContact,
} from '../property';

import { OWNER_PROPERTY } from '../../../api/owner/constants';
import { initialPropertyState } from '../../../api/property/constants';

function generateAddress() {
  return { ...OWNER_PROPERTY.ADDRESS };
}

describe(`${generatePropertyTitle.name} works`, () => {
  it('shows default value where there is no development', () => {
    const address = generateAddress();

    const title = generatePropertyTitle(address);

    expect(title).toEqual(defaultPropertyTitle);
  });

  it('shows default value when is chalet or house is true and there is no city', () => {
    const address = generateAddress();
    address.DEVELOPMENT = chaletOrHouse;

    const title = generatePropertyTitle(address);

    expect(title).toEqual(defaultPropertyTitle);
  });

  it('shows street number and name when is chalet or house', () => {
    const address = generateAddress();
    address.DEVELOPMENT = chaletOrHouse;

    const streetNumber = '512';
    address.STREET_NUMBER = streetNumber;
    const streetName = 'Test';
    address.STREET_NAME = streetName;

    const title = generatePropertyTitle(address);

    expect(title).toEqual(generateStreetNumberNameTitle(streetNumber, streetName));
  });

  it('shows only development when no unit number', () => {
    const development = 'NotChaletOrHouse';
    const address = generateAddress();
    address.DEVELOPMENT = development;

    const title = generatePropertyTitle(address);

    expect(title).toEqual(development);
  });

  it('shows development and unit', () => {
    const development = 'NotChaletOrHouse';
    const unit = '534';
    const address = generateAddress();
    address.DEVELOPMENT = development;
    address.UNIT = unit;

    const title = generatePropertyTitle(address);

    expect(title).toEqual(generateDevelopmentUnitTitle(development, unit));
  });
});

describe(hasPropertyContact.name, () => {
  it('is false if property.PROPERTY_CONTACT is undefined or falsy', () => {
    const property = JSON.parse(JSON.stringify(initialPropertyState));
    property.PROPERTY_CONTACT = undefined;
    expect(hasPropertyContact(property)).toBe(false);

    property.PROPERTY_CONTACT = false;
    expect(hasPropertyContact(property)).toBe(false);

    property.PROPERTY_CONTACT = '';
    expect(hasPropertyContact(property)).toBe(false);
  });

  it('is false if property.PROPERTY_CONTACT is an empty object', () => {
    const property = JSON.parse(JSON.stringify(initialPropertyState));
    property.PROPERTY_CONTACT = {};
    expect(hasPropertyContact(property)).toBe(false);
  });

  it('is false if PROPERTY_CONTACT id <= 0', () => {
    const property = JSON.parse(JSON.stringify(initialPropertyState));
    property.PROPERTY_CONTACT.ID = 0;
    expect(hasPropertyContact(property)).toBe(false);
    property.PROPERTY_CONTACT.ID = -1;
    expect(hasPropertyContact(property)).toBe(false);
  });

  it('is false if PROPERTY_CONTACT has no phone number', () => {
    const property = JSON.parse(JSON.stringify(initialPropertyState));
    property.PROPERTY_CONTACT.PHONE = '';
    expect(hasPropertyContact(property)).toBe(false);
  });

  it('is true otherwise', () => {
    const property = JSON.parse(JSON.stringify(initialPropertyState));
    property.PROPERTY_CONTACT.ID = 5;
    property.PROPERTY_CONTACT.PHONE = '12312312';
    expect(hasPropertyContact(property)).toBe(true);
  });
});
