const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/user-model");


const userAuth = async (req, res, next) => {


    try {


        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")

        ) {
            token = req.headers.authorization.split(" ")[1];
        }


        if (!token) return res.status(401).json({
            message: "token Unauthorized"
        })


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user) return res.status(401).json({
            message: "user Unauthorized"
        })

        req.user = user;
        next();

    } catch (error) {


        res.status(401).json({
            message: error.message 
          
        })
    }
}



module.exports = {
    userAuth
}