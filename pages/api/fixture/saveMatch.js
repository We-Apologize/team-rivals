import { executeQuery } from "../../../lib/db";
export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const { events,m_id } = req.body;
      let promises = []
      for(let i=0;i<events.length;i++)
      {
        const res = executeQuery("INSERT INTO matchdetails VALUES(?,?,?,?)",[
            m_id,
            events[i].time,
            events[i].events,
            JSON.stringify(events[i].eventDetails)
        ])
        promises.push[res]
      }
      const results = await Promise.all(promises);
      console.log(results);
      res.status(200).json({
        ok: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
