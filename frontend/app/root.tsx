import type { ActionArgs, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { searchTransactionOrBlock } from '~/api/explorer.server';
import NavBar from '~/components/NavBar';
import { Header } from '~/components/Header';

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const searchString = form.get("search-string");
  const searchResult = await searchTransactionOrBlock(searchString);
  if (searchResult.type === 'invalidSearch') {
    return json({
      error: 'Invalid search string'
    }, { status: 400 });
  }
  if (searchResult.type === 'notFound') {
    return json({
      error: 'Nothing found'
    }, { status: 404 });
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

export async function loader({}: LoaderArgs) {
  return json({});
}

export default function App() {
  return <AppLayout />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <AppLayout error={error.message}/>
}

function AppLayout({ error }: { error?: string }) {
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
      {!error && <Outlet/>}
      {error && (
        <div className="mt-4">
          <Header content='Unexpected error'/>
          <div className="mx-auto max-w-7xl">Apparently, the backend is not available: {error}</div>
        </div>
      )}
    </main>
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  )
}
