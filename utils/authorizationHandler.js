import jwt from "jsonwebtoken";
import cookie from "cookie";
export default  function jndf (req, res) {
  if (req.method === "GET") {
    console.log(req.body);
    //cookie.parse(req.cookies.user);
    if (req.cookies.user == null) return "you are not";
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    return user.Email;
  }
}
