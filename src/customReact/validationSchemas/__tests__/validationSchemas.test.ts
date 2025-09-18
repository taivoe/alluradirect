import * as yup from 'yup';
import { RequiredSubformsEnum } from '../../../api/subformNames';
import { accountOwner, parkingFormSchema, rentalManagerCoHost } from '../subformValidationSchemas';

describe('parking form schema', () => {
  const schema = {
    ParkingForm: {
      PARKING: {
        HAS_ADDITIONAL_PAID_SPOTS: false,
        HAS_ADDITIONAL_FREE_SPOTS: true,
        ID: 252,
        NUM_SPOTS_PROVIDED: 0,
        IS_DEFAULT_DESCRIPTION: false,
        DESCRIPTION:
          'There is plenty of underground parking in the Aspens. Height restriction is 6 feet, 6 inches. Pay for parking when you arrive at the building. Daily parking is approximately $20, with discounts for longer stays. Contact the Aspens Front Desk (604-932-7222) for exact prices and parking information.',
        INSTRUCTIONS: '<p><br/>a </p>',
        CODES: {
          GARAGE_DOOR_CODE: '',
        },
      },
    },
  };

  it(`"Test" - Is Valid :`, async () => {
    const isTestValid = await yup.object(parkingFormSchema).isValid(schema);
    expect(isTestValid).toBe(true);
  });
  it(`"Test" - Is Invalid :`, async () => {
    const updatedValue = { ParkingForm: { ...schema.ParkingForm.PARKING, INSTRUCTIONS: '<p><br/></p>' } };
    const isTestValid = await yup.object(parkingFormSchema).isValid(updatedValue);
    expect(isTestValid).toBe(false);
  });
});

describe('account owner schema', () => {
  function generateAccountOwnerData() {
    return {
      [RequiredSubformsEnum.AccountOwnerForm]: {
        USER: {
          IS_COMPANY: false,
          COMPANY_NAME: 'test',
          FIRST_NAME: 'test',
          LAST_NAME: 'test',
          EMAIL: 'test@test.com',
          PHONE: '123123',
          IS_SMS_VERIFIED: true,
          IS_EMAIL_VERIFIED: true,
          ADDRESS: {
            STREET_NAME: '123',
            STREET_NUMBER: '123',
            UNIT: '',
            CITY: '123',
            POSTAL: '123',
            REGION: '123',
            COUNTRY: '123',
          },
        },
      },
    };
  }

  it('is not valid for is_company with no company name', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.IS_COMPANY = true;
    data[RequiredSubformsEnum.AccountOwnerForm].USER.COMPANY_NAME = '';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is valid for is_company with a company name', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.IS_COMPANY = true;
    data[RequiredSubformsEnum.AccountOwnerForm].USER.COMPANY_NAME = 'test';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(true);
  });

  it('is invalid without first or last name', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.FIRST_NAME = 'test';
    data[RequiredSubformsEnum.AccountOwnerForm].USER.LAST_NAME = '';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);

    data[RequiredSubformsEnum.AccountOwnerForm].USER.FIRST_NAME = '';
    data[RequiredSubformsEnum.AccountOwnerForm].USER.LAST_NAME = 'test';
    const isValid2 = await yup.object(accountOwner).isValid(data);
    expect(isValid2).toBe(false);
  });

  it('is valid with first and last name', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.FIRST_NAME = 'test';
    data[RequiredSubformsEnum.AccountOwnerForm].USER.LAST_NAME = 'test';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(true);
  });

  it('is invalid without an email', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.EMAIL = '';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is invalid without a valid email entered', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.EMAIL = 'test';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is invalid without a valid email entered 2', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.EMAIL = 'test@test';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is invalid without a valid email entered 3', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.EMAIL = 'test.com';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is invalid without a phone number', async () => {
    const data = generateAccountOwnerData();
    data[RequiredSubformsEnum.AccountOwnerForm].USER.PHONE = '';

    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(false);
  });

  it('is valid with required information provided', async () => {
    const data = generateAccountOwnerData();
    const isValid = await yup.object(accountOwner).isValid(data);
    expect(isValid).toBe(true);
  });
});

describe('rental manager co-host schema', () => {
  function generateRentalManagerCoHostSchema(): any {
    return {
      [RequiredSubformsEnum.PropertyContactForm]: {
        IS_CUSTOM_PROPERTY_CONTACT: true,
        PROPERTY_CONTACT: {
          IS_COMPANY: true,
          COMPANY_NAME: 'test',
          FIRST_NAME: 'test',
          LAST_NAME: 'test',
          EMAIL: 'test@test.com',
          PHONE: '+6047041234',
          ID: 0,
          NOTIFY_CHECKIN_REMINDER: true,
        },
        IS_CO_HOST_MANAGER_ENABLED: true,
        CO_HOST: {
          IS_COMPANY: false,
          FIRST_NAME: 'test',
          LAST_NAME: 'test',
          PHONE: '123123',
          EMAIL: 'test@test.com',
          ID: 0,
          NOTIFY_RESORT_SPECIFIC: true,
          NOTIFY_GENERAL_INQUIRIES: true,
          NOTIFY_ALL_OWNERS: true,
          NOTIFY_RESERVATION_REQUESTS: true,
          NOTIFY_RENEWALS: true,
          NOTIFY_RESERVATIONS_CANCELLED: true,
          NOTIFY_RESERVATIONS_ADDED: true,
        },
      },
    };
  }

  it('works with valid data entered', async () => {
    const data = generateRentalManagerCoHostSchema();
    const isValid = await yup.object(rentalManagerCoHost).isValid(data);
    expect(isValid).toBe(true);
  });

  it('does not require property contact data when is_custom_property_contact is false', async () => {
    const data = generateRentalManagerCoHostSchema();
    data[RequiredSubformsEnum.PropertyContactForm].IS_CUSTOM_PROPERTY_CONTACT = false;
    data[RequiredSubformsEnum.PropertyContactForm].PROPERTY_CONTACT = {};
    const isValid = await yup.object(rentalManagerCoHost).isValid(data);
    expect(isValid).toBe(true);
  });

  it('does not require a co_host when is_co_host_manager_enabled is false', async () => {
    const data = generateRentalManagerCoHostSchema();
    data[RequiredSubformsEnum.PropertyContactForm].IS_CO_HOST_MANAGER_ENABLED = false;
    data[RequiredSubformsEnum.PropertyContactForm].CO_HOST = {};
    const isValid = await yup.object(rentalManagerCoHost).isValid(data);
    expect(isValid).toBe(true);
  });

  it('fails if property_contact id not defined', async () => {
    const data = generateRentalManagerCoHostSchema();
    delete data[RequiredSubformsEnum.PropertyContactForm].PROPERTY_CONTACT.ID;
    const isValid = await yup.object(rentalManagerCoHost).isValid(data);
    expect(isValid).toBe(false);
  });

  it('fails if co_host id not defined', async () => {
    const data = generateRentalManagerCoHostSchema();
    delete data[RequiredSubformsEnum.PropertyContactForm].CO_HOST.ID;
    const isValid = await yup.object(rentalManagerCoHost).isValid(data);
    expect(isValid).toBe(false);
  });
});
