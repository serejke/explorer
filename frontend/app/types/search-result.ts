export type SearchResult =
  'invalidSearch' | 'notFound'
  | {
  type: 'block',
  blockHash: string
} | {
  type: 'transaction',
  transactionHash: string
}