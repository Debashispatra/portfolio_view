import  express from 'express';
import {registerController,
        loginController,
        experienceController,
        getexperienceController,
        emailController} from '../controller/controller.js'
import { jwtToken } from "../middleware/index.js";

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/token',jwtToken)
router.post('/experience',jwtToken,experienceController)
router.get('/getexperience',getexperienceController)
router.post('/frgtpwdEmail',emailController)
export default router
