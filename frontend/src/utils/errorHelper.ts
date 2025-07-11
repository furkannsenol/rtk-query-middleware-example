export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    if ("data" in error && typeof (error as any).data?.message === "string") {
      return (error as any).data.message;
    }
  }
  return "An unexpected error occurred.";
};
