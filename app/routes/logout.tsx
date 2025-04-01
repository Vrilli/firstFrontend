import { redirect } from "@remix-run/node";
import { tokenCookie } from "../utils/cookies";

export const action = async () => {
  return redirect("/", {
    headers: {
      "Set-Cookie": await tokenCookie.serialize("", { path: "/", expires: new Date(0) }),
    },
  });
};