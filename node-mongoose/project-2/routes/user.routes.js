import { Router } from 'express'
import { createUser, getUsers, loginUser, logoutUser } from '../controllers/user.controllers.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/create').post(createUser);
router.route('/find').get(getUsers);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJwt, logoutUser);

export default router