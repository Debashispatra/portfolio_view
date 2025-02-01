import { registerService, 
        loginService, 
        experienceService,
        getexperienceService,
        emailService,
        projectService,
        getprojectService} from '../service/index.js'

export const registerController = async (req, res) => {
    const register = await registerService(req.body)
    try {
        if (register.status == 0) {
            res.status(200).json({
                status: register.status,
                message: register.message,
                data: register.data
            })
        } else if (register.status == 1) {
            res.status(200).json({
                status: register.status,
                message: register.message,
                data: register.data
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const loginController = async (req, res) => {
    const login = await loginService(req.body)
    try {
        if (login.status == 0) {
            res.status(200).json({
                status: login.status,
                message: login.message,
                data: login.data,
                generatedToken: login.authToken,
            })
        } else if (login.status == 1) {
            res.status(200).json({
                status: login.status,
                message: login.message
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }

}

export const tokendataController = async (req, res) => {
    const userName = req.userName
    console.log('>>>>>>', userName);
    // let objController={
    //     userName
    // }
    // const getaAll = await getalluser(req, res,objController)
    var today = new Date()
    var curHr = today.getHours()
    try {
        if (userName) {
            if (curHr < 12) {
                const obj = {
                    greeting_message: 'Good Morning',
                }
                res.status(200).json({
                    message: 'get',
                    username: userName,
                    greeting_message: obj.greeting_message
                })
            } else if (curHr < 18) {
                const obj = {
                    greeting_message: 'Good Afternoon',
                }
                res.status(200).json({
                    message: 'get',
                    username: userName,
                    greeting_message: obj.greeting_message
                })
            } else if (curHr < 21) {
                const obj = {
                    greeting_message: 'Good Evening',
                }
                res.status(200).json({
                    message: 'get',
                    username: userName,
                    greeting_message: obj.greeting_message
                })
            } else {
                const obj = {
                    greeting_message: 'Good Night'
                }
                res.status(200).json({
                    message: 'get',
                    username: userName,
                    greeting_message: obj.greeting_message
                })
            }
        }else {
            res.status(500).json({
                message: "User didn't get"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const experienceController = async (req, res) => {
    console.log("inside experience controller");
    const register = await experienceService(req.body)
    try {
        if (register.status == 0) {
            res.status(200).json({
                status: register.status,
                message: register.message,
                data: register.data
            })
        } else if (register.status == 1) {
            res.status(200).json({
                status: register.status,
                message: register.message,
                data: register.data
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const getexperienceController=async(req,res)=>{
    console.log("inside getexperience controller");
    const get = await getexperienceService(req.body)
    try {
        if (get.status == 0) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                data: get.data
            })
        } else if (get.status == 1) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                data: get.data
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const emailController=async(req,res)=>{
    const get = await emailService(req.body)
    try {
        if (get.status == 0) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                email:get.email
            })
        } else if (get.status == 1) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                data: get.data
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const projectController=async(req,res)=>{
    const user=req.user;
    const project =await projectService(req.body,user)
    try {
        if (project) {
            res.status(200).json({
                message: 'User data added',
                data: project.data
            })
        } else {
            res.status(500).json({
                message: "user didn't added"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const getprojectController=async(req,res)=>{
    console.log("inside getprojects controller");
    const get = await getprojectService(req.body)
    try {
        if (get.status == 0) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                data: get.data
            })
        } else if (get.status == 1) {
            res.status(200).json({
                status: get.status,
                message: get.message,
                data: get.data
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}