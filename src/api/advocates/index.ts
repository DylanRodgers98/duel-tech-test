import { Router } from 'express';
import { getAdvocates } from './get-advocates.js';

const router = Router();

router.get('/', getAdvocates);

export const advocatesRouter = router;
