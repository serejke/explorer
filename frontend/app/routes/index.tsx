import { json, LoaderArgs } from '@remix-run/node';
import { fetchBlockchainStatus, fetchBlocks } from '~/api/explorer.server';
import { Link, useLoaderData } from '@remix-run/react';
import BlocksPagination from '~/components/BlocksPagination';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { Header } from '~/components/Header';
import { Hash } from '~/components/Hash';

const PAGE_SIZE = 10;

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const pageNumber = Number(url.searchParams.get("page") || "1");

  const blockchainStatus = await fetchBlockchainStatus();
  if (!blockchainStatus.latestBlock) {
    // No blocks are indexed yet.
    return json({
      blocks: [],
      blockchainStatus,
      pageNumber: 1
    })
  }
  const to = Math.max(1, blockchainStatus.latestBlock - (pageNumber - 1) * PAGE_SIZE);
  const from = Math.max(1, to - PAGE_SIZE + 1);
  const limit = to - from + 1;
  const blocks = await fetchBlocks(from, limit);
  const sortedBlocks = blocks.sort((b1, b2) => b2.number - b1.number);
  return json({ blocks: sortedBlocks, blockchainStatus, pageNumber });
}

export default function Index() {
  const { blocks, blockchainStatus, pageNumber } = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      <Header content='Blocks'/>
      <div className="mx-auto max-w-7xl flex flex-col justify-between">
        <div className="border border-grey-200 rounded-lg">
          {blocks.map((block, index) => (
            <Link
              key={block.hash}
              to={`/block/${block.number}`}
              className={classNames('px-6', 'rounded-lg', 'py-4', 'flex', 'flex-row', 'justify-between', 'items-center', {
                'bg-white': index % 2 === 0,
                'bg-gray-50': index % 2 !== 1,
              })}
            >
              <div className="w-12">
                #{block.number}
              </div>
              <div className="text-sm text-gray-500 w-32">{
                DateTime.fromMillis(block.timestamp).toRelative({ style: 'long', unit: ['days', 'hours', 'minutes'] })
              }</div>
              <div className="text-sm font-mono"><Hash hash={block.hash}/></div>
              <div
                className="text-gray-500">{block.transactions.length} transaction{block.transactions.length > 1 ? 's' : ''}</div>
            </Link>
          ))}
        </div>
      </div>
      {blockchainStatus.blocks === 0 && <Header content='No blocks are indexed yet'/>}
      {blockchainStatus.blocks > 0 && <BlocksPagination
        pageSize={PAGE_SIZE}
        totalBlocks={blockchainStatus.blocks}
        pageNumber={pageNumber}
        totalPages={Math.floor((blockchainStatus.blocks - 1) / PAGE_SIZE) + 1}
      />}
    </div>
  );
}