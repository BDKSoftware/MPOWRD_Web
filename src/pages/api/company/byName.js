import db from "../../aws/db";

export default async (req, res) => {
  const { companyName } = req.query;

  if (req.method === "GET") {
    const params = {
      TableName: "Company-v4t4l2m4lzdfbloyhy27n6pqjq-dev",
      IndexName: "byName",
      KeyConditionExpression: "companyName = :companyName",
      ExpressionAttributeValues: {
        ":companyName": companyName,
      },
    };

    try {
      const result = await db.query(params).promise();
      if (result.Count === 0 || result.Items === undefined) {
        res.status(404).json({ error: "No Company found by this name" });
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
