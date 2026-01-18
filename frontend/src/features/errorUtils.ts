/**
 * Extracts a user-friendly error message from RTK Query errors
 * @param error - The error object from RTK Query
 * @returns A string error message
 */
export const getErrorMessage = (error: any): string => {
  // Backend returns plain string error messages
  if (error?.data && typeof error.data === "string") {
    return error.data;
  }

  // JSON error responses (if backend changes format)
  if (error?.data?.message) {
    return error.data.message;
  }

  // RTK Query serialization errors
  if (error?.error) {
    return error.error;
  }

  // Status text fallback
  if (error?.status) {
    return `Error ${error.status}: ${error?.statusText || "Request failed"}`;
  }

  // Generic fallback
  return "An unexpected error occurred";
};

/**
 * Checks if an error is a specific HTTP status code
 * @param error - The error object from RTK Query
 * @param statusCode - The HTTP status code to check
 * @returns boolean
 */
export const isErrorStatus = (error: any, statusCode: number): boolean => {
  return error?.status === statusCode;
};

/**
 * Checks if the error is a network error (no response from server)
 * @param error - The error object from RTK Query
 * @returns boolean
 */
export const isNetworkError = (error: any): boolean => {
  return error?.status === "FETCH_ERROR" || error?.originalStatus === 0;
};
