import { z } from 'zod';

/**
 * Bumped whenever the local database or API shape changes. Phase 1b uses it to refuse sync
 * with app versions that are too old.
 */
export const SCHEMA_VERSION = 1;

/**
 * Columns every stored row has, so Phase 1b can sync rows to the server without a rewrite.
 * Timestamps are ISO 8601 strings in UTC. `deletedAt` marks a soft delete.
 */
export const baseRowSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
});

export type BaseRow = z.infer<typeof baseRowSchema>;
