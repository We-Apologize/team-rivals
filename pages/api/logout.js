import cookie from "cookie";
export default function (req, res) {
  if (req.method == "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user", "", {
        httpOnly: true,
        path: "/",
        maxAge: -1,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      })
    );
    return res.send(200);
  }
}
