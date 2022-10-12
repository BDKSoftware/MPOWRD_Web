import db from "../../aws/db";

export default async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    const params = {
      TableName: "User-v4t4l2m4lzdfbloyhy27n6pqjq-dev",
      Key: {
        id: id,
      },
    };

    try {
      const result = await db.get(params).promise();
      if (result.Count === 0 || result.Item.length === 0) {
        res.status(404).json({ error: "No users found by Id" });
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
