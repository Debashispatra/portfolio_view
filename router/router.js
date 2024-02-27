import  express from 'express';
import {registerController,
        loginController,
        experienceController,
        getexperienceController,
        emailController,
        projectController} from '../controller/controller.js'
import { jwtToken } from "../middleware/index.js";
import multer from "multer";
import { promises as fs } from 'fs';
import Project from '../model/projectmodel.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const router = express.Router()

const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads')
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)      //file.originalname is used to name the file to be stored
                                            //you can give any file name with extension must
        }
});
const upload = multer({ storage: storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/token',jwtToken)
router.post('/experience',jwtToken,experienceController)
router.get('/getexperience',getexperienceController)
router.post('/frgtpwdEmail',emailController)
router.post('/projects',upload.single('image'),async(req,res,next)=>{
        try {
                const { title, desc, githurl,tech } = req.body
                const fileName = req.file.filename;
                const filePath = join(__dirname, '..', 'uploads', fileName);
                const data =new Project({
                    title, desc, githurl,tech,
                    img:{
                        data:await fs.readFile(filePath),
                        contentType: req.file.mimetype
                    }
                })
                const user = await data.save()
                req.user=user
                next()
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "user didn't added"
            })
        }
},projectController)

export default router
