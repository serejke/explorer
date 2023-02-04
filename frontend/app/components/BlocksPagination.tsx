import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react';

export type BlocksPaginationProps = {
  pageSize: number;
  totalBlocks: number;
  pageNumber: number;
  totalPages: number;
}

export default function BlocksPagination({ pageNumber, totalPages }: BlocksPaginationProps) {
  return (
    <div
      className="mx-auto max-w-7xl m-1 flex items-center justify-between border rounded-lg border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {pageNumber > 1 && <Link
              to={`/?page=${pageNumber - 1}`}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>}
            <div
              className="relative z-10 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 focus:z-20">
              Page {pageNumber} of {totalPages}
            </div>
            {pageNumber < totalPages && <Link
              to={`/?page=${pageNumber + 1}`}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>}
          </nav>
        </div>
      </div>
    </div>
  )
}
