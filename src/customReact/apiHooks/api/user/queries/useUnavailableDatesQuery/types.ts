export interface UnavailableDatesResponse {
  CANNOT_ARRIVE: string[];
  CANNOT_DEPART: string[];
  UNAVAILABILITY_ARRIVAL: string[];
  UNAVAILABILITY_DEPARTURE: string[];
}

export interface Args {
  onSuccess?: () => void;
  isEnabled: boolean;
  bookingId?: number;
  propertyId: number;
  isOwnerRole?: boolean;
  guestId?: number;
}
