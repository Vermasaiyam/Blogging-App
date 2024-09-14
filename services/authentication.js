const JWT = require("jsonwebtoken");

const secret = "$aiyam-App@123";

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    if (!token) return null;
    try{
        return JWT.verify(token, secret);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
}