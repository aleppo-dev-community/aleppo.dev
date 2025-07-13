import { SearchParams } from "next/dist/server/request/search-params";
import type { ReactNode } from "react";

export interface PageProps<
  TParams extends object = object,
  TSeach extends object = Promise<SearchParams>,
> {
  params: Promise<TParams>;
  searchParams: TSeach;
}
export interface LayoutProps<
  TParams extends object = object,
  TSearch extends object = Promise<SearchParams>,
> {
  params: Promise<TParams>;
  searchParams: TSearch;
  children: ReactNode;
}
