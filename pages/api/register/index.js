import { executeQuery } from "../../../lib/db";
import { registrationHandler } from "../../../utils/registrationHandler";
export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    console.log(req.body);
    const result = await registrationHandler(req);
    res.status(201).json(result);
  }
};
