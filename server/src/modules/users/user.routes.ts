import { Router } from 'express';
import { createUser } from './user.controller.js';
import { createUserSchema } from './user.schema.js';
import { validate } from '../../common/validate.js';

const router = Router();

router.post('/', validate(createUserSchema) ,createUser);

export default router;
