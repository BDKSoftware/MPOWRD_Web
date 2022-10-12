import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();

  const { password, email } = JSON.parse(req.body);

  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: "us-west-2",
  });
  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await cognitoClient.send(signUpCommand);
    console.log(response);
    return res.status(200).send({ ...response });
  } catch (err) {
    return res.status(405).json({ error: err.toString() });
  }
}
