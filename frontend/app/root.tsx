import type { ActionArgs, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { searchTransactionOrBlock } from '~/api/explorer.server';
import NavBar from '~/components/NavBar';

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const searchString = form.get("search-string");
  if (typeof searchString !== 'string') {
    return json('Search string is missing', { status: 400 });
  }
  const searchResult = await searchTransactionOrBlock(searchString);
  if (searchResult === 'invalidSearch') {
    return json('Search string is invalid', { status: 400 });
  }
  if (searchResult === 'notFound') {
    return json('Nothing found', { status: 404 });
  }
  if (searchResult.type === 'block') {
    return redirect(`/block/${searchResult.blockHash}`);
  }
  return redirect(`/transaction/${searchResult.transactionHash}`);
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Explorer",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ }: LoaderArgs) {
  return json({ });
}

export default function App() {
  return (
    <html lang="en" className="h-full bg-gray-100">
    <head title="Explorer">
      <Meta />
      <Links />
      <title>Explorer</title>
    </head>
    <body className="h-full">
    <NavBar />
    <main>
      <Outlet />
    </main>
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
