import { json, LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { explorerApi } from '~/api/explorer.server';
import { ResponseError } from 'explorer-client';

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, "Block ID is not found");
  try {
    const block = await explorerApi.findOneBlock({
      id: params.id
    });
    return json({ block });
  } catch (e) {
    if (e instanceof Error && e.name === ResponseError.name) {
      throw new Response(params.id, { status: 404 });
    }
    throw e;
  }
}

export default function BlockPage() {
  const { block } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <p>Block number</p>
        <div>{block.number}</div>
      </div>
      <div>
        <p>Block hash</p>
        <div>{block.hash}</div>
      </div>
      <div>
        <p>Parent block hash</p>
        <div>{block.parentHash}</div>
      </div>
      <div>
        <p>Gas used</p>
        <div>{block.gasUsed}</div>
      </div>
      <div>
        <p>Transactions</p>
        <div>{block.transactions.map((transaction) => (
          <Link key={transaction} to={`/explorer/transaction/${transaction}`}>
            {transaction}
          </Link>
        ))}</div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Block {caught.data} is not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

