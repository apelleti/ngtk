// This file was part of the v1 migration and is no longer imported anywhere

export function legacyFormatCurrency(amount: number): string {
  return '$' + amount.toFixed(2);
}

export function legacySlugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function legacyTruncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '...' : str;
}
