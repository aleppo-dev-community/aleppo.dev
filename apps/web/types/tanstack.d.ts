export interface RPCError {
  error: { message: string };
  status: number;
}

import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: RPCError;
  }
}
