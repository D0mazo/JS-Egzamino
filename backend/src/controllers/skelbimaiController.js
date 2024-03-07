const APIError = require('../apiError/ApiError');
const { executeQuery } = require('../helpers');

module.exports = {
  all: async (req, res, next) => {
    const sql = 'SELECT * FROM skelbimas';

    const [items, error] = await executeQuery(sql);

    if (error) {
      return next(error);
    }

    res.json(items);
  },
  single: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM skelbimas WHERE id=?';

    const [items, error] = await executeQuery(sql, [id]);

    if (error) {
      return next(error);
    }

    res.json(items[0]);
  },
  create: async (req, res, next) => {
    const { title, category, discription, price, url } = req.body;

    const sql =
      'INSERT INTO skelbimas (title, category, discription, price, url) VALUES (?,?,?,?,?)';

    const [responseObject, error] = await executeQuery(sql, [
      title,
      category,
      discription,
      price,
      url,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something went wrong', 400));
    }

    res.status(201).json({
      id: responseObject.insertId,
      message: 'Listing created successfully',
    });
  },
  update: async (req, res, next) => {
    const { id } = req.params;

    const { title, category, description, price, url } = req.body;

    const sql =
      'UPDATE skelbimas SET title=?, category=?, discription=?, price=?, url=? WHERE id=?';

    const [responseObject, error] = await executeQuery(sql, [
      title,
      category,
      discription,
      price,
      url,
      id,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something went wrong', 400));
    }

    res.status(201).json({
      id: id,
      message: `Listing with id:${id} updated successfully`,
    });
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'DELETE FROM `skelbimas` WHERE id=?';

    const [responseObject, error] = await executeQuery(sql, [id]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something went wrong', 400));
    }

    res.status(200).json({
      message: 'Listing deleted successfully',
    });
  },
};