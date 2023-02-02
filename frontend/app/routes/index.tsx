import { json } from '@remix-run/node';
import { fetchBlocks } from '~/api/explorer.server';
import { Link, useLoaderData } from '@remix-run/react';

const latestBlocksLimit = 50;

export async function loader() {
  const blocks = await fetchBlocks(latestBlocksLimit);
  return json({ blocks });
}

export default function Index() {
  const { blocks } = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Blocks</p>
      {blocks.map((block) => (
        <div key={block.hash}>
          <p>Number</p>
          <Link to={`/block/${block.number}`}>{block.number}</Link>

          <p>Hash</p>
          <Link to={`/block/${block.hash}`}>{block.hash}</Link>
        </div>
      ))}
    </div>
  );
}