import { json } from '@remix-run/node';

export async function loader() {
  return json({  });
}

export default function Index() {
  return <div>Block</div>;
}