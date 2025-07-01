// routes/user.routes.ts
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { authorizeRole } from '../middlewares/authorizeRole';

const router = express.Router();

router.post('/', protect, authorizeRole("superadmin"), validate(createUserSchema), UserController.createUser);
router.get('/:id', protect, UserController.getUserById);
router.get('/', protect, UserController.getUserByEmail); // ?email=user@example.com
router.put('/:id', protect, validate(updateUserSchema), UserController.updateUser);
router.delete('/:id', protect, UserController.deleteUser);
router.patch('/:id/promote', protect, UserController.promoteUser);
router.patch('/:id/demote', protect, UserController.demoteUser);

export default router;
