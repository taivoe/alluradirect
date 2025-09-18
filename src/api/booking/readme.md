The Booking Object is the primary object used to communicate details about a booking on the allura platform. (The term booking is interchangable with the term reservation, as you may see them used throughout the codebase to reference the same thing.)

The Booking Object has different states, that are primarly based off of the BookingStatusId. The 5 Booking Status Ids are:

1.  Reservation Request
2.  Reservation Request Rejected
3.  Deposit Paid Due
4.  Balance Paid
5.  Cancelled

Within those Booking Status Ids, there are additional statuses that reflect different dates and payment options.

1.  Deposit Paid Due - Deposit Payment is overdue
2.  Deposit Paid Due - Balance Payment is overdue (This is the same as Deposit Paid Due - Deposit is overdue)
3.  Balance Paid - Current Date Before Guidebook Send Date
4.  Balance Paid - Current Date After Guidebook Send Date
5.  Balance Paid - Current Date before Arrival
6.  Balance Paid - Current Date after Arrival and before Departure (Active Booking)
7.  Balance Paid - Current Date after Departure
8.  Balance Paid - Booking Complete , Balance is greater than 0 (Owner error)
9.  Balance Paid - Review Not Submitted
    10.Balance Paid - Review Submitted (Will then be able to manage)

Balance paid but AMOUNT_OUTSTANDING ===0 || < 0 ;
