import { Router } from 'express';
import { setAvailability } from './availability.controller.js';
import { availabilitySchema } from './availability.schema.js';
import { validate } from '../../common/validate.js';
import { getPublicAvailability } from './availability.controller.js';
import { authMiddleware } from '../../common/authMiddleware.js';
const router = Router();

router.get('/public/:userId', getPublicAvailability);

router.post('/',authMiddleware, validate(availabilitySchema) ,setAvailability);

export default router;
