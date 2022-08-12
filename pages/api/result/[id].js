import { executeQuery } from "../../../lib/db";

export default async function (req, res) {
  if (req.method === "POST") {
    res.status(200).json({ ok: "ok" });
  } else if (req.method == "GET") {
    try {
      console.log(req.query);
      let match = await executeQuery("select * from fmatch where m_id=?", [
        req.query.id,
      ]);
      let details = await executeQuery(
        "select * from matchdetails where m_id=? ORDER BY etime  ASC",
        [req.query.id]
      );

      const goals = await executeQuery(
        "select details from matchdetails where m_id=? and mevent=?;",
        [match[0].m_id, "Goal"]
      );
      let home = 0;
      let away = 0;
      let event = [];
      for (let j = 0; j < goals.length; j++) {
        let gg = await JSON.parse(goals[j].details);
        if (gg.teamname == "Team Rivals") home = home + 1;
        else away = away + 1;
      }
      for (let i = 0; i < details.length; i++) {
        let gg = await JSON.parse(details[i].details);
        details[i].details = gg;
      }
      match[0].home = home;
      match[0].away = away;
      res.status(200).json({ match, details });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
