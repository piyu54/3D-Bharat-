export const simulateServiceError = (
  probability = 0.05
) => {
  if (Math.random() < probability) {
    throw new Error(
      "Unable to fetch data. Please try again."
    );
  }
};