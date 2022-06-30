import jwt from "jsonwebtoken";

export default function (req, res) {

  if (req.method === "GET") {
    console.log(req.body);
    //cookie.parse(req.cookies.user);
    if (req.cookies.user == null) return "false";
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    
  }
}
