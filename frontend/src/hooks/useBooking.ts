/**
 * Hooks related to booking operations.
 *
 * `useBooking` exposes a `bookRoom` method that creates a Stripe checkout
 * session via the `roomApi` and redirects the browser to the returned URL.
 *
 * @module hooks/useBooking
 */
import { useCreateCheckoutSessionMutation } from "../features/roomApi";
import { calculateNights } from "../features/utils";

/**
 * Parameters required to create a booking/checkout session.
 */
interface BookingParams {
  roomNumber: string;
  roomPricePerNight: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

/**
 * Creates a checkout session and redirects to Stripe Checkout.
 *
 * @returns An object with `bookRoom`, `isLoading`, and `error`.
 */
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
