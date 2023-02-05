export type SearchResult =
  {
    type: 'invalidSearch',
  }
  | {
  type: 'notFound'
} | {
  type: 'block',
  blockHash: string
} | {
  type: 'transaction',
  transactionHash: string
}