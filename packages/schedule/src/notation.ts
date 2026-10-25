import { SLOTS, type Slot, type SlotDoses } from './types';

/** The largest number of units allowed in one slot. Anything above is almost certainly a typo. */
export const MAX_UNITS_PER_SLOT = 10;

export type NotationError = 'empty' | 'wrong_part_count' | 'invalid_quantity' | 'no_doses';

export type ParseResult = { ok: true; doses: SlotDoses } | { ok: false; error: NotationError };

const THREE_PART_SLOTS: readonly Slot[] = ['morning', 'afternoon', 'night'];

const FRACTIONS: Record<string, number> = { '¼': 0.25, '½': 0.5, '¾': 0.75 };
const FRACTION_GLYPHS: [number, string][] = [
  [0.25, '¼'],
  [0.5, '½'],
  [0.75, '¾'],
];

// Devanagari (०-९) and Kannada (೦-೯) digits, so notation typed on a Hindi or Kannada keyboard works.
const NATIVE_DIGIT_ZEROS = [0x0966, 0x0ce6];

function toAsciiDigits(input: string): string {
  return input.replace(/[०-९೦-೯]/g, (ch) => {
    const code = ch.charCodeAt(0);
    const zero = NATIVE_DIGIT_ZEROS.find((z) => code >= z && code <= z + 9)!;
    return String(code - zero);
  });
}

function parseQuantity(part: string): number | null {
  const match = /^(\d+)?(?:([¼½¾])|\.(\d+)|\s*(\d+)\/(\d+))?$/.exec(part);
  if (!match || part === '') return null;
  const [, whole, glyph, decimals, num, den] = match;
  let value = whole ? Number(whole) : 0;
  if (glyph) value += FRACTIONS[glyph]!;
  if (decimals) value += Number(`0.${decimals}`);
  if (num && den) {
    if (Number(den) === 0) return null;
    value += Number(num) / Number(den);
  }
  // Only whole units and quarter tablets can be taken.
  if (!Number.isInteger(value * 4)) return null;
  if (value > MAX_UNITS_PER_SLOT) return null;
  return value;
}

/**
 * Parses Indian prescription notation such as `1-0-1` (morning and night) or `1-1-1-1`
 * (morning, afternoon, evening and night). Three parts mean morning, afternoon and night; four
 * parts add evening. Each part is a quantity, which can be a quarter, half or whole tablet:
 * `½-0-1`, `0.5-0-1` and `1/2-0-1` are the same.
 */
export function parseNotation(input: string): ParseResult {
  const normalized = toAsciiDigits(input.trim());
  if (normalized === '') return { ok: false, error: 'empty' };

  const parts = normalized.split(/\s*[-–—]\s*/);
  if (parts.length !== 3 && parts.length !== 4) return { ok: false, error: 'wrong_part_count' };

  const slots = parts.length === 3 ? THREE_PART_SLOTS : SLOTS;
  const doses: SlotDoses = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  for (const [i, part] of parts.entries()) {
    const quantity = parseQuantity(part);
    if (quantity === null) return { ok: false, error: 'invalid_quantity' };
    doses[slots[i]!] = quantity;
  }

  if (totalUnitsPerDay(doses) === 0) return { ok: false, error: 'no_doses' };
  return { ok: true, doses };
}

function formatQuantity(value: number): string {
  const whole = Math.floor(value);
  const glyph = FRACTION_GLYPHS.find(([fraction]) => fraction === value - whole)?.[1];
  if (!glyph) return String(value);
  return whole === 0 ? glyph : `${whole}${glyph}`;
}

/**
 * Formats doses back into notation. Uses three parts unless there is an evening dose.
 * `parseNotation(formatNotation(doses))` returns the same doses.
 */
export function formatNotation(doses: SlotDoses): string {
  const slots = doses.evening > 0 ? SLOTS : THREE_PART_SLOTS;
  return slots.map((slot) => formatQuantity(doses[slot])).join('-');
}

/** The slots with a dose, in the order of the day. */
export function activeSlots(doses: SlotDoses): Slot[] {
  return SLOTS.filter((slot) => doses[slot] > 0);
}

export function totalUnitsPerDay(doses: SlotDoses): number {
  return SLOTS.reduce((sum, slot) => sum + doses[slot], 0);
}
