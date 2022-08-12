import { executeQuery } from "../../../lib/db";
const dateFix = (d) => {
  d = d.slice(0, 10);
  return d;
};
const timeFix = (d) => {
  d = d.slice(11, 16);
  return d;
};
export default async function (req, res) {
  if (req.method === "POST") {
    try {
      let { tickets, match, date, time } = req.body;
      let m_id = Math.floor(100000 + Math.random() * 900000);
      console.log(req.body, m_id);
      const addMatch = executeQuery("INSERT INTO fmatch VALUES (?,?,?,?,?)", [
        m_id,
        match.opponant,
        match.venue,
        dateFix(date),
        timeFix(time),
      ]);
      let promises = [];
      promises.push(addMatch);

      for (let i = 0; i < tickets.length; i++) {
        const res = executeQuery("INSERT INTO ticket VALUES (?,?,?,?,?)", [
          m_id,
          parseInt(tickets[i].price),
          tickets[i].category,
          0,
          parseInt(tickets[i].total_ticket),
        ]);
        promises.push(res);
      }
      const results = await Promise.all(promises);
      console.log(results);
      res.status(200).json({
        ok: true,
      });
      //res.status(200).json({ok:"ok"})
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else if (req.method == "GET") {
    try {
      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      yourDate = yourDate.toISOString().split("T")[0];
      console.log(yourDate);
      const matches = await executeQuery("select * from fmatch where date>=? ORDER BY date ASC",[yourDate]);
      res.status(200).json({matches})
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
