import db from "../../aws/db";

export default async (req, res) => {
  if (req.method === "GET") {
    const params = {
      TableName: "Company-v4t4l2m4lzdfbloyhy27n6pqjq-dev",
    };

    try {
      const result = await db.scan(params).promise();

      if (result.Count === 0) {
        res.status(404).json({ error: "No Companies found" });
        return;
      } else {
        res.status(200).json(result);
        return;
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
};
