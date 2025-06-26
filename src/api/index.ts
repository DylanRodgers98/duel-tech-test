import { Router } from 'express';
import { advocatesRouter } from './advocates/index.js';
import { metricsRouter } from './metrics/index.js';

const router = Router();

router.use('/advocates', advocatesRouter);
router.use('/metrics', metricsRouter);

export const api = router;
