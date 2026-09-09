import { Router } from 'express';
import { getCurrentAdmin, loginAdmin, logoutAdmin } from '@/controllers/admin';

const router = Router();

router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);
router.get('/admin/me', getCurrentAdmin);

export default router;
