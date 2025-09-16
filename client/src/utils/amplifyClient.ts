"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
    },
  },
});

console.log("✅ Amplify configured:", {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  pool: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
  client: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID,
});

export {};
