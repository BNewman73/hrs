/**
 * Stripe client loader.
 *
 * Exports a singleton `stripePromise` created via `loadStripe` using the
 * publishable key. For local development this file uses a test key —
 * replace it with the appropriate environment-managed key for production.
 *
 * @module frontend/stripeConfig
 */
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Sn1kuHVq6JDmmdbAqgPq8DeIsKpohJkbzEDfnx1hS78ePCc9E3sd3OiOq3Hprx7qYBFQXPtiYqODLJvK1Lvxvbb00TY4CzjVg",
);

export default stripePromise;
