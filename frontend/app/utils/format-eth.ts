import bigDecimal from 'js-big-decimal';

export function formatEth(valueString: string): string {
  const oneEth = new bigDecimal('1000000000000000000');
  const value = new bigDecimal(valueString).divide(oneEth, 18).getValue();
  if (value === '0') {
    return '0 ETH';
  }
  let lastNonZero = value.length;
  while (lastNonZero > 0 && value[lastNonZero - 1] === '0') {
    lastNonZero--;
  }
  return value.substring(0, lastNonZero) + ' ETH';
}