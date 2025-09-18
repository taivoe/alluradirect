import { FullBooking } from '../../../api/booking/types';

export const transactionText = {
  /** Section of a reservation screen/page where billing, invoice, revenue, bank info is deisplayed */
  billingDetails: 'Billing Details',
  /** A bill that a guest receives for booking with alluraDirect */
  reservationInvoice: 'Reservation Invoice',
  /** A bill that a guest receives for booking with an allura partner (Whistler) */
  partnerInvoice: 'Partner Invoice',
  /** Summary of deposits that the owner has received from a booking */
  bankDeposits: 'Bank Deposits',
  /** A breakdown of the total amount that the owner will receive from a booking */
  revenueReceivedSummary: 'Revenue Received (Summary)',

  /** Price per night * number of nights */
  accommodation: 'Accommodation Subtotal',
  cleaningAndPetFees: 'Cleaning/Pet Fees',
  /** Service fee that the guest is charged for booking with alluraDirect */
  guestServiceFee: 'Service Fee (Guest)',
  /** The total amount due for a booking. Includes fees, taxes etc */
  reservationTotal: 'Reservation Total',
  partnerCommissionFee: 'Partner Commission Fee',
  damageDeposit: 'Damage Deposit',
  creditCardFee: 'Credit Card Fee',
  bookingCommission: 'Booking Commission',
  /** Non-resident only */
  nr6Withheld: 'NR6 Withheld',
  totalDepositedToBank: 'Total Deposited to Bank',
  /** Either the property owner or alluraDirect */
  taxRemitter: 'Tax Remitter',
  /** Property managers want an additional cut of the booking fee */
  propertyManagerServiceFee: 'Host Booking Fee',
};

export function isInflatedBooking(booking: FullBooking): boolean {
  return Boolean(booking.INFLATED_BOOKING);
}
