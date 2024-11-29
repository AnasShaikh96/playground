import { Router } from 'express'
import { createBlog, findBlogs } from '../controllers/blog.controllers.js';

const router = Router()

router.route('/create').post(createBlog)
router.route('/find').get(findBlogs)

export default router;