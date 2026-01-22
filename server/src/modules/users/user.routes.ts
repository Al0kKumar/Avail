import { Router } from 'express';
import { getUserByPublicSlug } from './user.controller.js';

const router = Router();

router.get('/public/slug/:slug', getUserByPublicSlug);

export default router;
