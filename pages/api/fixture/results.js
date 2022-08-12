import { executeQuery } from "../../../lib/db";
export default async function (req, res) {
  if (req.method == "GET") {
    try {
      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      yourDate = yourDate.toISOString().split("T")[0];
      console.log(yourDate);
      const matches = await executeQuery(
        "select * from fmatch where date<=? ORDER BY date ASC",
        [yourDate]
      );
      res.status(200).json(matches);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
