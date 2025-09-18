const generateNumberOfSpotsText = (numberOfSpotsProvided: number) => {
  const hasAssignedParking = numberOfSpotsProvided > 0;
  const hasAssignedParkingText = `${numberOfSpotsProvided} reserved parking stall(s) included at no charge.`;
  const noAssignedParkingText = 'There are no reserved parking stalls included.';

  return hasAssignedParking ? hasAssignedParkingText : noAssignedParkingText;
};

const generateAdditionalFreeSpotsText = (hasAdditionalFreeSpots: boolean) => {
  const hasFreeSpotsText =
    'Limited additional parking spots at no charge, however they are first come first serve and are not guaranteed.';
  const noFreeSpotsText = 'There are no additional free parking stalls available at this location.';

  return hasAdditionalFreeSpots ? hasFreeSpotsText : noFreeSpotsText;
};

const generatePayParkingText = (hasAdditionalPaidSpots: boolean) => {
  const hasAdditionalSpotsText =
    'Pay parking is available at this location, pricing can be obtained from the building manager.';
  const noAdditionalSpotsText = 'No additional pay parking available at this location.';

  return hasAdditionalPaidSpots ? hasAdditionalSpotsText : noAdditionalSpotsText;
};

export const generateParkingText = ({
  numberOfSpotsProvided,
  hasAdditionalFreeSpots,
  hasAdditionalPaidSpots,
}: {
  numberOfSpotsProvided: number;
  hasAdditionalFreeSpots: boolean;
  hasAdditionalPaidSpots: boolean;
}) => {
  const numberOfSpotsText = generateNumberOfSpotsText(numberOfSpotsProvided);
  const additionalFreeSpotsText = generateAdditionalFreeSpotsText(hasAdditionalFreeSpots);
  const payParkingText = generatePayParkingText(hasAdditionalPaidSpots);

  return `${numberOfSpotsText} ${additionalFreeSpotsText} ${payParkingText} `;
};
