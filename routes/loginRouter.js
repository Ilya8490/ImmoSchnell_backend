import express from 'express';
import { signup, login, logout, protect } from '../controllers/authController.js';

const router = express.Router();

router.post('/', login);

export default router;
