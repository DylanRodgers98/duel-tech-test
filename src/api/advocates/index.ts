import { Router } from 'express';
import { getAdvocates } from './get-advocates.js';
import { searchAdvocates } from './search.js';

const router = Router();

router.get('/', getAdvocates);
router.get('/search', searchAdvocates);

export const advocatesRouter = router;
