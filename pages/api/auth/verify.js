import jwt from "jsonwebtoken";
export default function (req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    if (!req.cookies.user) return res.send(401);
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    console.log("from verify");
    console.log(user);
    res.send(user);
  }
}
