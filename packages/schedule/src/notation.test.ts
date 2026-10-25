import { describe, expect, it } from 'vitest';
import {
  activeSlots,
  formatNotation,
  parseNotation,
  totalUnitsPerDay,
  type SlotDoses,
} from './index';

const doses = (morning: number, afternoon: number, evening: number, night: number): SlotDoses => ({
  morning,
  afternoon,
  evening,
  night,
});

describe('parseNotation', () => {
  it.each([
    ['1-0-1', doses(1, 0, 0, 1)],
    ['1-1-1', doses(1, 1, 0, 1)],
    ['0-0-1', doses(0, 0, 0, 1)],
    ['2-0-2', doses(2, 0, 0, 2)],
    ['1-1-1-1', doses(1, 1, 1, 1)],
    ['1-0-1-0', doses(1, 0, 1, 0)],
  ])('reads %s', (input, expected) => {
    expect(parseNotation(input)).toEqual({ ok: true, doses: expected });
  });

  it('reads half and quarter tablets in every written form', () => {
    for (const input of ['½-0-1', '0.5-0-1', '1/2-0-1', '.5-0-1']) {
      expect(parseNotation(input)).toEqual({ ok: true, doses: doses(0.5, 0, 0, 1) });
    }
    expect(parseNotation('1½-0-¼')).toEqual({ ok: true, doses: doses(1.5, 0, 0, 0.25) });
    expect(parseNotation('1.5-0-0.75')).toEqual({ ok: true, doses: doses(1.5, 0, 0, 0.75) });
  });

  it('accepts spaces and dash variants', () => {
    for (const input of [' 1 - 0 - 1 ', '1–0–1', '1—0—1']) {
      expect(parseNotation(input)).toEqual({ ok: true, doses: doses(1, 0, 0, 1) });
    }
  });

  it('reads Devanagari and Kannada digits', () => {
    expect(parseNotation('१-०-१')).toEqual({ ok: true, doses: doses(1, 0, 0, 1) });
    expect(parseNotation('೧-೧-೧')).toEqual({ ok: true, doses: doses(1, 1, 0, 1) });
  });

  it.each([
    ['', 'empty'],
    ['   ', 'empty'],
    ['1', 'wrong_part_count'],
    ['1-0', 'wrong_part_count'],
    ['1-0-1-0-1', 'wrong_part_count'],
    ['1--1', 'invalid_quantity'],
    ['a-0-1', 'invalid_quantity'],
    ['-1-0-1', 'invalid_quantity'],
    ['1-0-0.3', 'invalid_quantity'],
    ['1/3-0-1', 'invalid_quantity'],
    ['1/0-0-1', 'invalid_quantity'],
    ['11-0-1', 'invalid_quantity'],
    ['0-0-0', 'no_doses'],
    ['0-0-0-0', 'no_doses'],
  ])('rejects %j with %s', (input, error) => {
    expect(parseNotation(input)).toEqual({ ok: false, error });
  });
});

describe('formatNotation', () => {
  it('uses three parts without an evening dose', () => {
    expect(formatNotation(doses(1, 0, 0, 1))).toBe('1-0-1');
  });

  it('uses four parts with an evening dose', () => {
    expect(formatNotation(doses(1, 1, 1, 1))).toBe('1-1-1-1');
  });

  it('writes fractions as glyphs', () => {
    expect(formatNotation(doses(0.5, 0, 0, 1.5))).toBe('½-0-1½');
    expect(formatNotation(doses(0.25, 0.75, 0, 0))).toBe('¼-¾-0');
  });

  it('round-trips through parseNotation', () => {
    for (const input of ['1-0-1', '½-1-0', '1-1-1-1', '2-0-1½', '0-0-¼']) {
      const parsed = parseNotation(input);
      if (!parsed.ok) throw new Error(`failed to parse ${input}`);
      expect(formatNotation(parsed.doses)).toBe(input);
    }
  });
});

describe('helpers', () => {
  it('lists active slots in day order', () => {
    expect(activeSlots(doses(1, 0, 1, 1))).toEqual(['morning', 'evening', 'night']);
  });

  it('sums units per day', () => {
    expect(totalUnitsPerDay(doses(1, 0.5, 0, 2))).toBe(3.5);
  });
});
