import bigDecimal from 'js-big-decimal';

export function formatGas(gas: string): string {
  return new bigDecimal(gas).getPrettyValue(3, ',');
}