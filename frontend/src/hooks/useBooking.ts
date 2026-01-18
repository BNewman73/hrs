// src/hooks/useBooking.ts
import { useCreateCheckoutSessionMutation } from "../features/roomApi";
import { calculateNights } from "../features/utils";

interface BookingParams {
  roomNumber: string;
  roomPricePerNight: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export const useBooking = () => {
  const [createCheckoutSession, { isLoading, error }] =
    useCreateCheckoutSessionMutation();

  const bookRoom = async (params: BookingParams): Promise<void> => {
    const { roomNumber, roomPricePerNight, checkInDate, checkOutDate, guests } =
      params;

    try {
      const numberOfNights = calculateNights(checkInDate, checkOutDate);
      const totalPrice = roomPricePerNight * numberOfNights;

      const result = await createCheckoutSession({
        roomNumber,
        checkInDate,
        checkOutDate,
        guests,
        numberOfNights,
        totalPrice,
      }).unwrap();

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      console.error("Failed to create checkout session:", err);
      throw err; // Re-throw so component can handle it
    }
  };

  return {
    bookRoom,
    isLoading,
    error,
  };
};
