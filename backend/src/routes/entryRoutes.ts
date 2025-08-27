import { Router } from 'express';
import {
  listEntriesForBaby,
  getEntryForBaby,
  createEntryForBabyHandler,
  updateEntryForBabyHandler,
  deleteEntryForBabyHandler,
  deleteAllEntriesForBabyHandler,
} from '../controllers/entryController';

const router = Router({ mergeParams: true });

// GET /babies/:babyId/entries
router.get('/', listEntriesForBaby);

// GET /babies/:babyId/entries/:entryId
router.get('/:entryId', getEntryForBaby);

// POST /babies/:babyId/entries
router.post('/', createEntryForBabyHandler);

// PUT /babies/:babyId/entries/:entryId
router.put('/:entryId', updateEntryForBabyHandler);

// DELETE /babies/:babyId/entries/:entryId
router.delete('/:entryId', deleteEntryForBabyHandler);

// DELETE /babies/:babyId/entries
router.delete('/', deleteAllEntriesForBabyHandler);

export default router;
