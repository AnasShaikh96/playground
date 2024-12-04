import { Router } from 'express'
import { createUser, getUsers, loginUser, logoutUser, refreshAccessToken } from '../controllers/user.controllers.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/create').post(createUser);
router.route('/find').get(getUsers);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);

export default router