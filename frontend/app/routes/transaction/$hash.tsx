import { json, LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { fetchTransaction } from '~/api/explorer.server';

export async function loader({ params }: LoaderArgs) {
  invariant(params.hash, "Transaction hash is not found");
  const transaction = await fetchTransaction(params.hash);
  return json({ transaction });
}

export default function TransactionPage() {
  const { transaction } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <p>Block hash</p>
        <Link to={`../block/${transaction.blockHash}`}>
          <div>{transaction.blockHash}</div>
        </Link>
      </div>
      <div>
        <p>Transaction number</p>
        <div>{transaction.transactionIndex}</div>
      </div>
      <div>
        <p>Transaction hash</p>
        <div>{transaction.hash}</div>
      </div>
      <div>
        <p>From</p>
        <div>{transaction.from}</div>
      </div>
      <div>
        <p>To</p>
        <div>{transaction.to}</div>
      </div>
      <div>
        <p>Gas</p>
        <div>{transaction.gas}</div>
      </div>
      <div>
        <p>Gas price</p>
        <div>{transaction.gasPrice}</div>
      </div>
      <div>
        <p>Data</p>
        <div>{transaction.data}</div>
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
    return <div>Transaction {caught.data} is not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
