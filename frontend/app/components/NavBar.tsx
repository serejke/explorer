import { Form, Link } from '@remix-run/react';

export default function NavBar() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to='/'>
                <img
                  className="h-8 w-auto"
                  src="/images/explorer_logo.png"
                  alt="Explorer Logo"
                />
              </Link>
            </div>
            <div className="ml-6 w-1/2">
              <Form method="post">
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="search-string"
                    className="block bg-gray-800 text-white w-full rounded-md border-gray-600 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search a block by number, hash or a transaction by hash"
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
