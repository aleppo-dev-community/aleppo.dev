import { AppType } from "@workspace/api/src";
import { hc } from "hono/client";

import { ClientResponse } from "hono/client";

/** Query Wrapper
 * wrap hono queries and throw errors if they fail
 */
export function qw<
  TResponse,
  TStatusCode extends number,
  TFormat extends string,
  TParams extends any[],
>(
  queryFn: (...params: TParams) => Promise<ClientResponse<TResponse, TStatusCode, TFormat>>
): (...params: TParams) => Promise<TResponse> {
  return (async (...params: TParams) => {
    const response = await queryFn(...params);
    if (!response.ok) {
      throw await response.json();
    }
    return response.json();
  }) as any;
}

function wrapWithQw<T extends object>(obj: T) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === "function") {
        return qw(value as any);
      }
      if (typeof value === "object" && value !== null) {
        return wrapWithQw(value as object);
      }
      return value;
    },
  });
}
interface ProxyConstructor {
  revocable<T extends object>(
    target: T,
    handler: ProxyHandler<T>
  ): { proxy: T; revoke: () => void };

  new <T extends object>(target: T, handler: ProxyHandler<T>): ProxyResponse<T>;
}
declare var Proxy: ProxyConstructor;

export const rpc = wrapWithQw(
  hc<AppType>(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/").api
);

type ExtractFromClientResponse<T> = T extends (
  ...args: infer A
) => Promise<ClientResponse<infer U, any, any>>
  ? (...args: A) => Promise<U>
  : T;

type ProxyResponse<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ExtractFromClientResponse<T[K]>
    : T[K] extends object
      ? ProxyResponse<T[K]>
      : T[K];
};
