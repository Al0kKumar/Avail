import { Router } from 'express';
import { getMe, getUserByPublicSlug } from './user.controller.js';
import { authMiddleware } from '../../common/authMiddleware.js';

const router = Router();

router.get('/public/slug/:slug', getUserByPublicSlug);

router.get('/me', authMiddleware, getMe);

export default router;
