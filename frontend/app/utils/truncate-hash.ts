export function truncateHash(hash: string) {
  return hash.substring(0, 20) + '...'
}