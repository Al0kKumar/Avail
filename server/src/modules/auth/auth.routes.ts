import { Router } from 'express';
import { googleAuthWithCode } from './googleAuth.controller.js';

const router = Router();

router.post('/google/code', googleAuthWithCode);

export default router;
