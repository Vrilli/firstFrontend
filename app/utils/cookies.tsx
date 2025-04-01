import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  secure: true,
  path: "/",
  sameSite: "lax",
});