import { Router } from 'express';
import {
  createNewsPost,
  deleteNewsPost,
  getNewsPost,
  listNewsPosts,
  updateNewsPost,
} from '@/controllers/news';

const router = Router();

router.get('/news', listNewsPosts);
router.post('/news', createNewsPost);
router.get('/news/:slug', getNewsPost);
router.patch('/news/:slug', updateNewsPost);
router.delete('/news/:slug', deleteNewsPost);

export default router;
