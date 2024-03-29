import { executeQuery } from "../../../lib/db";
const dateFix = (date) => {
  const d = date.slice(0, 10);
  return d;
};
export default async function (req, res) {
  if (req.method === "GET") {
    const Defender = await executeQuery(
      "SELECT p_id,name,image FROM player WHERE position = (?)",
      ["Defender"]
    );
    const Goalkeeper = await executeQuery(
      "SELECT p_id,name,image FROM player WHERE position = (?)",
      ["Goalkeeper"]
    );
    const Forward = await executeQuery(
      "SELECT p_id,name,image FROM player WHERE position = (?)",
      ["Forward"]
    );
    const Midfielder = await executeQuery(
      "SELECT p_id,name,image FROM player WHERE position = (?)",
      ["Midfielder"]
    );
    const players = {
      Defender: Defender,
      Goalkeeper: Goalkeeper,
      Forward: Forward,
      Midfielder: Midfielder,
    };
    return res.send(players);
  }
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const { player, url } = req.body;
      console.log(player);
      ///TODO : ADD Validation
      const addPlayer = await executeQuery(
        "INSERT INTO player VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          player.p_id,
          player.teamName,
          player.name,
          dateFix(player.dob),
          player.country,
          player.jersey_no,
          player.height,
          player.release_clause,
          dateFix(player.join_date),
          player.position,
          player.biography,
          "False",
          dateFix(player.contract_end),
          url,
        ]
      );
      res.status(200).json({ ok: "ok" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
