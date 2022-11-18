const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token) {
            return res.status(401).json({message:'Need Token'})
        }else{
            const result = verifyToken(token);
            const user = await User.findByPk(result.id)
            if(user) {
                res.locals.user = result;
                next();
                return;
            }
            throw new Error("ada error");
        }
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token given'
        });
    }
}

module.exports = authentication;
