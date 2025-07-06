// apps/api/src/auth/index.ts

import type { BetterAuthOptions, Path } from "better-auth";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database";

import * as schema from "../database/auth-schema";

const options = {
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/callback/google`,
    },
  },
  plugins: [openAPI()],
  trustedOrigins: [process.env.NEXT_PUBLIC_SERVER_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,     
      }
    }
  }
} satisfies BetterAuthOptions;


export const auth = betterAuth({
  ...options,
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/api/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path] as Path;

        for (const method of Object.keys(paths[path] as Path)) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: string | null | undefined;
};
