const jwt = require("jsonwebtoken");
const pool = require("../config/database");
require("dotenv").config() 

exports.jwtAuthentication = async (req, res, next) => {
  const userToken = req.header("Authorization");

  if (!userToken) {
    return res.status(401).json({ error: "Unauthorized: Token is Missing" });
  }

  try {
    const token = userToken.split(" ")[1]; 
    
    if (!userToken) {
      return res.status(401).send("Access denied. No token provided");
    }

    const decoded = jwt.verify(token, process.env.jwtsecret);
    const { username } = decoded;

    const userFromDatabase = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (!userFromDatabase) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User does not exist" });
    }

    req.user = userFromDatabase;
    next();
  } catch (error) {
    return res.status(401).json({ error: "error: Invalid Token" });
  }
};


