require('dotenv').config();
const bcrypt = require('bcrypt');
const {executeQuery, signJWTToken} = require("../helpers");
const APIError = require('../apiError/ApiError');

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log('Received login request:', email);
  
      const sql = 'SELECT * FROM `user` WHERE `email` = ? ';
      const [responseObject, error] = await executeQuery(sql, [email]);
  
      if (error) {
        console.error('Error fetching user:', error);
        return next(error);
      }
  
      if (responseObject.length === 0) {
        return next(new APIError('User not found or not verified', 400));
      }
  
      const userFound = responseObject[0];
      const hashPassword = userFound.password;
  
      if (!bcrypt.compareSync(password, hashPassword)) {
        return next(new APIError('Password or email not matched', 401));
      }
  
      const data = {
        sub: userFound.id,
        user: {
          id: userFound.id,
          email: userFound.email,
          scope: userFound.scope,
        },
      };
  
      const token = signJWTToken(data);
      console.log('Login Success. Generated Token:', token);
  
      return res.json({
        message: 'Login Success',
        token,
      });
    } catch (error) {
      console.error('Login Error:', error);
      return next(error);
    }
  };

const register = async (req, res, next) => {
    const {email, password} = req.body;
    const salt = process.env.SALT || 5;
    const passwordHash = bcrypt.hashSync(password, +salt);

    const sql = "INSERT INTO `user` (`email`, `password`, `scope`) VALUES (?, ?, 'manager')";

    const [responseObject, error] = await executeQuery(sql, [email, passwordHash]);

    if (error) {
        return next(error);
    }

    if (responseObject.affectedRows === 1) {
        res.status(201).json({
            message: 'User created successfully!',
            id: responseObject.insertId
        })
    }

    res.end();
}

module.exports = {
    register,
    login
}
