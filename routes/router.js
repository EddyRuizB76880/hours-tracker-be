import express from 'express';

import studentRoutes from './students.js';
import professorRoutes from './professors.js';
import projectRoutes from './projects.js';
import taskRoutes from './tasks.js';
import authRoutes from './auth.js';

import index from '../controllers/index.js';

const router = express.Router();

router.get('/', index)

router.use(studentRoutes);
router.use(professorRoutes);
router.use(projectRoutes);
router.use(taskRoutes);
router.use(authRoutes);

export default router;