export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile/:path*"] };
// export const config = { matcher: ["/aaa"] };