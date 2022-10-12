/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AWS_ACCESS_KEY_ID: "AKIAS44PZJVWBCPJYGFQ",
    AWS_SECRET_ACCESS_KEY: "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",
    COGNITO_USER_POOL_ID: "us-west-2_RWnuaUyr4",
    COGNITO_APP_CLIENT_ID: "2453ir1cv778ldomgbv9d6bco8",
    COGNITO_REGION: "us-west-2",
  },
};

module.exports = nextConfig;
