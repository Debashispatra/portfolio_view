import jwt from "jsonwebtoken";

export const jwtToken = (req, res, next) => {
    const token = req.headers["authorization"]

    console.log(`-token- ${token}`);

    if (!token) {
        console.log(`Token Error - no token`);
        return res.status(200).json({
            status: 1,
            dataObj: {
                responseMessage: "Token Error - no token",
            },
        });
    }
    const decoded = jwt.decode(token, {
        complete: true
    })
    
    const userName = decoded.payload.userName
    const role = decoded.payload.role

    console.log("username", userName);
    console.log("role", role);
    
    if (!userName) {
        console.log(`No username found`);
        return res.status(200).json({
            status: 1,
            dataObj: {
                responseMessage: "No username found",
            },
        });
    } else if (role == "admin") {
        req.userName = userName
        next()
    } else {
        var today = new Date()
        var curHr = today.getHours()
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
        // return res.status(200).json({
        //     status: 1,
        //     dataObj: {
        //         responseMessage: "You are not a admin",
        //     },
        // });
    }

    req.role = role

}