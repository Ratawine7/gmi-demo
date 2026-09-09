import { Router } from 'express';
import { listVolunteers, registerVolunteer, updateVolunteer } from '@/controllers/volunteer';

const router = Router();

router.post('/volunteers', registerVolunteer);
router.get('/volunteers', listVolunteers);
router.patch('/volunteers/:id', updateVolunteer);

export default router;