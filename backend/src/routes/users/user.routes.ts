import { Router } from "express";
import * as userCtrl from './users.controller'
const router = Router()

router.post('/user',userCtrl.registerUser);
router.post('/user/login',userCtrl.authUser);
export default router;