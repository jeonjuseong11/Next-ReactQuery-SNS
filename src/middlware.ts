export { auth as middleware } from "./auth";

// See " Matching Paths" below to learn more

export const config = {
  matcher: ["/comnpose/tweet", "/home", "/explore", "messages", "search"],
};
