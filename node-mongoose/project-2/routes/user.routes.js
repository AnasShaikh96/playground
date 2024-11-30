import { Router } from 'express'
import { createUser, getUsers, loginUser } from '../controllers/user.controllers.js';

const router = Router()

router.route('/create').post(createUser);
router.route('/find').get(getUsers);
router.route('/login').post(loginUser);

export default router