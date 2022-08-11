import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
import bcrypt from 'bcrypt'
export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(id);
    const currentUser = jwt.verify(req.cookies.user, process.env.SECRET);
    if (currentUser) {
      const findUser = await executeQuery(
        "SELECT * FROM users WHERE userId=(?)",
        [id]
      );
      console.log(findUser);
      if (findUser.length == 0) return res.send({ id: "" });
      const user = {
        id: findUser[0].userId,
        name: findUser[0].name,
        email: findUser[0].email,
        role: findUser[0].role,
        description: findUser[0].description,
      };

      res.send(user);
    }
  } else if (req.method == "PUT") {
    const { id } = req.query;
    const currentUser = jwt.verify(req.cookies.user, process.env.SECRET);
    if (currentUser.id == id) {
     
        // if(req.body.isPasswordUpdate == true){
            
        // }
      await executeQuery(
        "UPDATE users SET name=(?),email=(?),description=(?) WHERE userId=(?)",
        [req.body.name, req.body.email, req.body.description, currentUser.id]
      );
      return res.send(200);
    }
  }
};
