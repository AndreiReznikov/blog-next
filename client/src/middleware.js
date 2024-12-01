export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile/:path*", "/posts/add", "/posts/edit/:path*"] };