import { executeQuery } from "../../lib/db";

export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery("INSERT INTO users VALUES(?,?)", {
      Email: "kongka",
      Password: "mew",
    });
    console.log("success", result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
