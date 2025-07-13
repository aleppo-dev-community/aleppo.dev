import { AppType } from "@workspace/api/src";
import { hc } from "hono/client";

import { ClientResponse } from "hono/client";

export function unwrapClientResponse<
  TResponse,
  TStatusCode extends number,
  TFormat extends string,
  TParams extends any[],
>(
  queryFn: (...params: TParams) => Promise<ClientResponse<TResponse, TStatusCode, TFormat>>,
): (...params: TParams) => Promise<TResponse> {
  return (async (...params: TParams) => {
    const response = await queryFn(...params);
    if (!response.ok) {
      throw { error: await response.json(), status: response.status };
    }
    return response.json();
  }) as any;
}

declare var Proxy: ProxyConstructor;
interface ProxyConstructor {
  new <T extends object>(target: T, handler: ProxyHandler<T>): ProxyResponse<T>;
}
function rpcProxy<T extends object>(obj: T) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (prop.toString().startsWith("$")) {
        return unwrapClientResponse(value as any);
      }
      if (!prop.toString().startsWith("$") && value !== null) {
        return rpcProxy(value as object);
      }

      return value;
    },
  });
}
const rawRpc = hc<AppType>(process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000/").api;

export const rpc = rpcProxy(rawRpc);

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
