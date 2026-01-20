import { Router } from 'express';
import { setAvailability } from './availability.controller.js';

const router = Router();

router.post('/', setAvailability);

export default router;
