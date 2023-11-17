const pool = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const result = require('../../helpers/response');
require('dotenv').config();
const httpstatus = require('http-status');
const logger = require('../../helpers/logger');

exports.createUser = async (req, res,next) => {
  try {
    const { name, email, username, password, address } = req.body;
    const existingUserEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUserEmail.rows.length > 0) {
      return result(res, httpstatus.CONFLICT, false, 'User with this email already exists.', null);
    }

    const existingUserUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUserUsername.rows.length > 0) {
      return result(res, httpstatus.CONFLICT, false, 'Username already exists', null);
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, username, password, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, username, bcryptedPassword, address]
    );

    const payload = {
      
      username: newUser.rows[0].username
      
    };
    const token = jwt.sign(payload, process.env.jwtsecret, { expiresIn: '1hr' });

    return result(res, httpstatus.CREATED, true, 'User created successfully.', { user: newUser.rows[0], token });
  } catch (error) {
    
    next(error);
    logger.error(error.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userExist = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExist.rows.length === 0) {
      return result(res, httpstatus.UNAUTHORIZED, false, 'Password or username is incorrect.', null);
    }

    const validPassword = await bcrypt.compare(password, userExist.rows[0].password);

    if (validPassword) {
      const payload = {
       username: userExist.rows[0].username
      };
      const token = jwt.sign(payload, process.env.jwtsecret, { expiresIn: '1hr' });
      return result(res, httpstatus.OK, true, "User login Successfull.", { Token: token });
    }

    return result(res, httpstatus.UNAUTHORIZED, false, 'Password or username is incorrect', null);
  } catch (error) {
    next(error)
    logger.error(error.message);

  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
  const { page, limit } = req.query;
  let pageNumber = parseInt(page) || 1;
  let pageLimit = parseInt(limit) || 10;

  
    const offset = (pageNumber - 1) * pageLimit;
    const userQuery = await pool.query("SELECT * FROM users ORDER BY id OFFSET $1 LIMIT $2", [offset, pageLimit]);

    if (userQuery.rows.length === 0) {
      return result(res, httpstatus.NOT_FOUND, false, 'Users Not Found.', null);
    }

    const userQueryResult = userQuery.rows;

    const countUser = await pool.query("SELECT COUNT(*) FROM users");
    const totalCount = parseInt(countUser.rows[0].count);

    

    for (const user of userQueryResult) {
      delete user.password;
    }

    const response = { userQueryResult, totalCount, pageNumber};
    return result(res, httpstatus.OK, true, 'Users retrieved', response);
  } catch (error) {
    next(error)
    logger.error(error.message);

    
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (userExists.rows.length === 0) {
      return result(res, httpstatus.NOT_FOUND, false, 'User with the id not found.', null);
    } else {
      const user = userExists.rows[0];
      delete user.password;
      return result(res, httpstatus.OK, true, 'User with the id retrieved.', user);
    }
  } catch (error) {
    next(error)
    

    logger.error(error.message);

    
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address } = req.body;
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (userExists.rows.length === 0) {
      return result(res, httpstatus.NOT_FOUND, false, 'User with the id not found.', null);
    } else {
      const updateUser = await pool.query(
        "UPDATE users SET name = $1, email = $2, address = $3 WHERE id = $4 RETURNING *",
        [name, email, address, id]
      );

      if (updateUser.rows.length > 0) {
        const updatedUserResult = updateUser.rows[0];
        delete updatedUserResult.password;
        return result(res, httpstatus.OK, true, 'User updated successfully', updatedUserResult);
      } else {
        return result(res, httpstatus.EXPECTATION_FAILED, false, 'Failed to update user', null);
      }
    }
  } catch (error) {
    next(error)

    logger.error(error.message);

    
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (userExists.rows.length === 0) {
      return result(res, httpstatus.NOT_FOUND, false, `User with the ${id} not found.`, null);
    } else {
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
      return result(res, httpstatus.OK, true, 'User deleted successfully.', null);
    }
  } catch (error) {
    next(error)

    logger.error(error.message);

    
  }
};
