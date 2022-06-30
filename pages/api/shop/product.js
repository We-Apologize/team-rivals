const { executeQuery } = require("../../../lib/db");
export default async function (req, res) {
  console.log(req.method);
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const { product, productStock } = req.body;
      ///TODO : ADD Validation
      const addProduct = executeQuery(
        "INSERT INTO PRODUCT VALUES (?,?,?,?,?,?)",
        [
          product.id,
          product.name,
          product.price,
          product.category,
          product.tag,
          product.image,
        ]
      );
      let promises = [];
      promises.push(addProduct);
      
      for (let i = 0; i < productStock.length; i++) {
        const res = executeQuery("INSERT INTO STOCK VALUES (?,?,?)", [
          product.id,
          productStock[i].size,
          productStock[i].piece,
        ]);
        promises.push(res);
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
