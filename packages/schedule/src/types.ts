/** Times of day a dose can be taken, in the order they appear in 1-0-1 notation. */
export const SLOTS = ['morning', 'afternoon', 'evening', 'night'] as const;
export type Slot = (typeof SLOTS)[number];

/** How many units (tablets, capsules) to take in each slot. 0 means no dose in that slot. */
export type SlotDoses = Record<Slot, number>;

/** A wall-clock time in 24-hour `HH:MM` form, such as `08:30`. */
export type WallClockTime = string;

export type FoodRelation = 'before_food' | 'after_food' | 'with_food' | 'any';

export type DoseStatus = 'pending' | 'taken' | 'skipped' | 'missed' | 'no_response';

export interface Schedule {
  id: string;
  medicationId: string;
  doses: SlotDoses;
  /** When each slot's reminder fires, in the schedule's own timezone. */
  times: Record<Slot, WallClockTime>;
  foodRelation: FoodRelation;
  /** First day of the course, `YYYY-MM-DD`. */
  startDate: string;
  /** Last day of the course, `YYYY-MM-DD`, or null for an ongoing medicine. */
  endDate: string | null;
  /** IANA timezone, such as `Asia/Kolkata`. Times are stored as wall-clock times, never UTC. */
  timezone: string;
}

export const DEFAULT_SLOT_TIMES: Record<Slot, WallClockTime> = {
  morning: '08:00',
  afternoon: '14:00',
  evening: '18:00',
  night: '21:00',
};
