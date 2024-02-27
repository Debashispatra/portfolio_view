import User from '../model/mongodbmodel.js';
import Exp from '../model/experiencemodel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from"crypto";


const secretKey = 'encryptedPassword';
const algorithm = 'aes-256-cbc';

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, secretKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decrypt(encryptedText) {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
  
export const registerService = async (data) => {
    try {
        console.log("inside register service");
        const { userName, email, password } = data

        const encryptedPassword = encrypt(password);
        console.log('Encrypted Data:', encryptedPassword);

        // const passwordhash = await bcrypt.hash(password, 10);
        // console.log("encryptedpassword", passwordhash);

        const isData = await User.findOne({ email: email })
        if (isData == null) {
            const data = new User({ userName, email, password: encryptedPassword })
            const user = data.save()
            console.log("inserting data", data);
            const obj = {
                status: 0,
                message: "Successfully Registered!!",
                data: data
            }
            return obj
        } else {
            const errorobj = {
                status: 1,
                message: "Exists EmailId",
                data: isData
            }
            return errorobj
        }
    } catch (error) {
        console.log(error);
    }
}

export const loginService = async (data) => {
    try {
        const { email, password } = data
        const userData = await User.findOne({ email: email })
        console.log("Getting user data-->", userData);
        if (userData) {
            const decryptedData = decrypt(userData.password);
            console.log('Decrypted Data:', decryptedData);
            // const passwordMatch = await bcrypt.compare(password, userData.password)
            if (password===decryptedData) {
                let getdata = {
                    userName: userData.userName,
                    role: userData.role
                }
                let secretkey = "jwt"
                const token = jwt.sign(getdata, secretkey)
                let str=`${getdata.userName}`
                let yourname=str.toUpperCase()
                const responseData = {
                    status: 0,
                    message: `Hii ${yourname} you have LogedIn Successfully!!`,
                    authToken: token,
                    data:getdata
                }
                return responseData
            }else{
                const errorResponse = {
                    status: 1,
                    message: "Wrong password entered",
                }
                return errorResponse
            }
        } else {
            const errorResponse = {
                status: 1,
                message: "Your Email is invalid",
            }
            return errorResponse
        }
    } catch (error) {
        return error
    }
}

export const experienceService = async (data) => {
    try {
        console.log("inside experience service");
        const { company, location, timeline, role, work } = data
        if (data) {
            const data = new Exp({ company, location, timeline, role, work })
            const user = data.save()
            console.log("inserting data", data);
            const obj = {
                status: 0,
                message: "Your experienced company details Addded!",
                data: data
            }
            return obj
        }else {
            const errorobj = {
                status: 1,
                message: "Your experienced company details Failed",
                data: error
            }
            return errorobj
        }
    } catch (error) {
        console.log(error);
    }
}

export const getexperienceService=async(data)=>{
    try {
        console.log("inside getexperience service");
        const data=await Exp.find()
        if (data) {
            console.log("getting data", JSON.stringify(data));
            const obj = {
                status: 0,
                message: "Getting your experienced companies!",
                data: data
            }
            return obj
        }else {
            const errorobj = {
                status: 1,
                message: "Didn't getting your experienced companies!",
                data: error
            }
            return errorobj
        }
    } catch (error) {
        console.log(error);
    }
}

export const emailService=async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'debasishpatra133@gmail.com',
          pass: 'coaoguhrwtjfwcow',
        },
      });
    const {email}=data
    try {
        const user=await User.findOne({email:email})
        console.log("email found",user);
        const decryptedPassword = decrypt(user.password);
        console.log('Decrypted password:', decryptedPassword);
        await user.save();
        const mailOptions = {
            from: 'debasishpatra133@gmail.com',
            to: email,
            subject: 'Forget Password',
            text: `Hyy your password is: ${decryptedPassword}`,
          };
      
        const send=await transporter.sendMail(mailOptions);
        console.log("Email send successfully");
        const obj={
            status: 0,
            message: "Email send successfully",
            email:email
        }
        return obj
    } catch (error) {
        console.log(error);
    }
}

export const projectService=async(data,user)=>{
    try {
        let data = user
        console.log('data----', data);
        const obj = {
            message: 'file uploaded',
            data: data
        }
        return obj
    } catch (error) {
        console.log(error);
    }
}