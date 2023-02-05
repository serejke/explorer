export function Hash({ hash, truncated }: { hash: string, truncated?: boolean }) {
  if (truncated) {
    return <span><span className='text-sm text-cyan-700 font-mono'>{hash.substring(0, 20)}</span>...</span>
  }
  return <span className='text-sm text-cyan-700 font-mono'>{hash}</span>;
}