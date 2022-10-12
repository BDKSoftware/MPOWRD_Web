import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();

  const { username, password } = req.body;
  const params = {
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: "us-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand);
    console.log(response);
    return res.status(200).json({
      ...response.AuthenticationResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(405).json({ error: err.toString() });
  }
}
