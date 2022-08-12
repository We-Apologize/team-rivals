import { executeQuery } from "../../../lib/db";
import { confirmTicket } from "../../../utils/confirmMail";
export default async function (req, res) {
  if (req.method === "GET") {
    try {
        const {m_id} = req.query;
        const ticket = await executeQuery("SELECT * FROM ticket where m_id=?",m_id)
        res.status(200).json({ticket});
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } 
  else if (req.method === "POST") {
    try{
        const {match,email,category,totalAmount} = req.body;
        const result = await executeQuery(`update ticket set total=total-? ,sold = sold+? where category=? and m_id=?`,[parseInt(totalAmount),parseInt(totalAmount),category,match.m_id]);
        const mail = await confirmTicket(email,totalAmount,match,category);
        res.status(200).json({
            ok:true
        });
    }
    catch(err){

    }
  }
}
