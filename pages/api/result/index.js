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
    
      res.status(200).json({ok:"ok"})
   
    
  } else if (req.method == "GET") {
    try {
      let matches = await executeQuery(
        "select * from fmatch where status=? ORDER BY date DESC",
        ["done"]
      );
      for(let i=0;i<matches.length;i++){
        const goals = await executeQuery(
            "select details from matchdetails where m_id=? and mevent=?;",
            [matches[i].m_id,"Goal"]
          );
          let home=0;
          let away=0;
       //
          for(let j=0;j<goals.length;j++)
          {
            let gg = await JSON.parse(goals[j].details);
            if(gg.teamname=="Team Rivals")
            home=home+1;
            else away=away+1;
          }
          matches[i].home=home;
          matches[i].away=away;

      }
      res.status(200).json({ matches });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
