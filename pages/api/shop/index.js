import { executeQuery } from "../../../lib/db";
export default async function (req, res) {
  if (req.method === "GET") {
    try {
      let result = await executeQuery(`SELECT * FROM Product`, []);
      result = Object.values(JSON.parse(JSON.stringify(result)));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
