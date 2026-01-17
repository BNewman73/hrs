export const calculateNights = (
  checkInDate: string | Date,
  checkOutDate: string | Date
): number => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
