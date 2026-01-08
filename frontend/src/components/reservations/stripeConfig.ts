import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Sn1kuHVq6JDmmdbAqgPq8DeIsKpohJkbzEDfnx1hS78ePCc9E3sd3OiOq3Hprx7qYBFQXPtiYqODLJvK1Lvxvbb00TY4CzjVg"
);

export default stripePromise;
