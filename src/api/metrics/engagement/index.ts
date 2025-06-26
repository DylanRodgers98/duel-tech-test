import { Router } from 'express';
import { getEngagementPerPlatform } from './get-engagement-per-platform.js';
import { getEngagementForUser } from './get-engagement-for-user.js';

const router = Router();

router.get('/user/:userId', getEngagementForUser);

router.get('/platform/:platform', getEngagementPerPlatform);
router.get('/platform', getEngagementPerPlatform); // all platforms

export const engagementRouter = router;
