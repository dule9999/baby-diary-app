import { Router } from 'express';
import {
  listEntries,
  getEntry,
  createEntryHandler,
  updateEntryHandler,
  deleteEntryHandler,
  deleteAllEntriesHandler,
} from '../controllers/entryController';

const router = Router();

router.get('/entries', listEntries);
router.get('/entries/:id', getEntry);
router.post('/entries', createEntryHandler);
router.put('/entries/:id', updateEntryHandler);
router.delete('/entries/:id', deleteEntryHandler);
router.delete('/entries', deleteAllEntriesHandler)

export default router;
