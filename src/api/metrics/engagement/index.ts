import { Router } from 'express';
import { getEngagementPerPlatform } from './get-engagement-per-platform.js';
import { getEngagementForAdvocate } from './get-engagement-for-advocate.js';

const router = Router();

router.get('/advocate/:advocateId', getEngagementForAdvocate);

router.get('/platform/:platform', getEngagementPerPlatform);
router.get('/platform', getEngagementPerPlatform); // all platforms

export const engagementRouter = router;
