const APIError = require('../apiError/ApiError');
const {executeQuery} = require("../helpers");
const bcrypt = require("bcrypt");

const salt = process.env.SALT || 5;

module.exports = {
    all: async (req, res, next) => {
      const sql = 'SELECT `id`, `email`, `scope`, `created_at` FROM `user`';
      const [items, error] = await executeQuery(sql);
      if (error) {
        return next(error);
      }
      res.json(items);
    },
  
    single: async (req, res, next) => {
      const { id } = req.params;
      const sql = 'SELECT `id`, `email`, `scope`, `created_at` FROM user WHERE id=?';
      const [items, error] = await executeQuery(sql, [id]);
      if (error) {
        return next(error);
      }
      res.json(items[0]);
    },
  
    create: async (req, res, next) => {
      const { email, password, scope } = req.body;
      const passwordHash = bcrypt.hashSync(password, +salt);
      const sql = `INSERT INTO user (email, password, scope) VALUES (?, ?, ?)`;
      const [responseObject, error] = await executeQuery(sql, [email, passwordHash, scope]);
      if (error) {
        return next(error);
      }
      if (responseObject.affectedRows !== 1) {
        return next(new APIError('Something went wrong', 400));
      }
      res.status(201).json({
        id: responseObject.insertId,
        message: 'User created successfully!',
      });
    },
  
    update: async (req, res, next) => {
      const { id } = req.params;
      const { email, password, scope } = req.body;
      let data, sql;
      if (password !== '') {
        const passwordHash = bcrypt.hashSync(password, +salt);
        sql = `UPDATE user SET email=?, password=?, scope=? WHERE id=?`;
        data = [email, passwordHash, scope, id];
      } else {
        sql = `UPDATE user SET email=?, scope=? WHERE id=?`;
        data = [email, scope, id];
      }
  
      console.log('SQL === ', sql);
      console.log('Data === ', data);
  
      const [responseObject, error] = await executeQuery(sql, data);
  
      if (error) {
        return next(error);
      }
      if (responseObject.affectedRows !== 1) {
        return next(new APIError('Something went wrong', 400));
      }
  
      res.status(201).json({
        id: id,
        message: `User with id:${id} updated successfully`,
      });
    },
  
    delete: async (req, res, next) => {
      const { id } = req.params;
      const sql = 'DELETE FROM `user` WHERE id=?';
      const [responseObject, error] = await executeQuery(sql, [id]);
      if (error) {
        return next(error);
      }
  
      if (responseObject.affectedRows !== 1) {
        return next(new APIError('Something went wrong', 400));
      }
  
      res.status(200).json({
        message: 'User deleted successfully',
      });
    },
  };