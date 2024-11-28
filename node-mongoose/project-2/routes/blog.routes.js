import { Router } from 'express'
import { createBlog } from '../controllers/blog.controllers.js';

const router = Router()

router.route('/create').post(createBlog)

export default router;