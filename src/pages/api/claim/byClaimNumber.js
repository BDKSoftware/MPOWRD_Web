import db from "../../aws/db";

export default async (req, res) => {
  const { claimNumber } = req.query;

  if (req.method === "GET") {
    const params = {
      TableName: "Claim-v4t4l2m4lzdfbloyhy27n6pqjq-dev",
      IndexName: "byClaimNumber",
      KeyConditionExpression: "claimNumber = :claimNumber",
      ExpressionAttributeValues: {
        ":claimNumber": claimNumber,
      },
    };

    try {
      const result = await db.query(params).promise();
      if (result.Count === 0 || result.Items.length === 0) {
        res
          .status(404)
          .json({ error: "No Claim found under this claim number" });
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
