
import { Router } from 'express';

import exampleRoutes from './exampleRoutes.js';



const router = Router();

router.use('/', exampleRoutes);

export default router;
