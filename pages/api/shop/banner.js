const { executeQuery } = require("../../../lib/db");
export default async function (req, res) {
  console.log(req.method);
  if (req.method === "PUT") {
    try {
      const { url } = req.body;
      console.log(url);
      console.log(req.body);
      const result = await executeQuery("INSERT INTO Banner VALUES (?,?)", [
        Date.now(),
        url,
      ]);
      console.log(result);
      res.status(200).json({
        ok: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else if (req.method === "GET") {
    try {
        
      let result = await executeQuery(`SELECT * FROM Banner`, []);
      result = Object.values(JSON.parse(JSON.stringify(result)));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  else if (req.method === "DELETE") {
    try {
      let {Banner_ID} = req.query;
      console.log(Banner_ID)
      let result = await executeQuery(`DELETE FROM Banner WHERE Banner_ID=?`, [Banner_ID]);
      //TODO : delete from Firebase storage also
      console.log(result);
       res.status(200).json({ok:"ok"});
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
