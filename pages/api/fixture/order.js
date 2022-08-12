import { executeQuery } from "../../../lib/db";
import { confirmTicket, confirmOrder } from "../../../utils/confirmMail";
export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const { order, email, total, products } = req.body;
      const mail = await confirmOrder(email, order, total, products);
      return res.status(200).json({
        ok: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}
