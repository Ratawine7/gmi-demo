import { Router } from 'express';
import { deleteSubscriber, listSubscribers, subscribe, unsubscribe, updateSubscriber } from '@/controllers/subscriber';

const router = Router();

router.post('/subscribers', subscribe);
router.get('/subscribers', listSubscribers);
router.delete('/subscribers', unsubscribe);
router.patch('/subscribers/:id', updateSubscriber);
router.delete('/subscribers/:id', deleteSubscriber);

export default router;
