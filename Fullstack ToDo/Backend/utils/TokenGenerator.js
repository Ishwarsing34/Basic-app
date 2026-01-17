const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt")




const generateToken = (userId) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: jwtConfig.expiresIn }
  );

  return token;
};


module.exports = generateToken;