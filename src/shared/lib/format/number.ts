export function formatCompactNumber(num: number, fractionDigits = 3): string {
  const sign = num < 0 ? '-' : '';
  const n = Math.abs(num);

  const format = (val: number) =>
    val
      .toFixed(fractionDigits)
      .replace(/(\.\d*?[1-9])0+$/, '$1')
      .replace(/\.0+$/, '');

  if (n >= 1_000_000_000) {
    return `${sign}${format(n / 1_000_000_000)}B`;
  }
  if (n >= 1_000_000) {
    return `${sign}${format(n / 1_000_000)}M`;
  }
  if (n >= 1_000) {
    return `${sign}${format(n / 1_000)}K`;
  }
  return sign + n.toString();
}
