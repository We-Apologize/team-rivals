import jwt from "jsonwebtoken";

export default function (req, res) {
  if (req.method === "GET") {
    const compare = jwt.verify(req.cookies.auth != null, process.env.SECRET);
    if (compare == true) {
      return res.send(200);
    }
    return res.send(404);
  }
}
