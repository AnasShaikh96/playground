import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controllers.js';

const router = Router()

router.route('/create').post(createUser);
router.route('/find').get(getUsers);

export default router