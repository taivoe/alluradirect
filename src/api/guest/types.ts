import {
  B64_PROPERTY_GUIDEBOOK,
  GUEST_FORM_INPUTS,
  GUEST_PAYMENT,
  GUEST_PAYMENT_INFORMATION,
  GUEST_RATING_QUESTION,
  GUEST_RECOMMENDATION,
  GUEST_REVIEWS,
  propertyGuidebook,
} from './constants';
import { FullBooking, SparseBooking } from '../booking/types';

import { ContactTracingGuest } from '../types';

// Full Types

// TODO: move out of guest and into user/root
export type PropertyGuidebook = typeof propertyGuidebook;
export type B64PropertyGuidebook = typeof B64_PROPERTY_GUIDEBOOK;

// Information retrieved from owner endpoints
export type GuestFormInputs = typeof GUEST_FORM_INPUTS;
export type GuestPayment = typeof GUEST_PAYMENT;
export type GuestPaymentInformation = typeof GUEST_PAYMENT_INFORMATION;
export type GuestReviews = typeof GUEST_REVIEWS;

// Partial Types
export type GuestBooking = SparseBooking | FullBooking;
export enum GuestBookingType {
  SPARSE = 'sparse',
  FULL = 'full',
}

export interface GuestPaymentFee {
  AMOUNT: number;
  NAME: string;
}

export interface GuestPaymentTaxes {
  BREAKDOWN: GuestPaymentFee[]; // contains array of FEES (cleaning, pet, booking, service etc...) and how much they add to the tax total
  NAME: string; // Tax name
  PERCENT: number;
  TOTAL: number;
}

export type ContactTracing = {
  BOOKING_ID: string;
  GUESTS: ContactTracingGuest[];
};

export type GuestRatingQuestion = typeof GUEST_RATING_QUESTION;

export type GuestRecommendation = typeof GUEST_RECOMMENDATION;
