const APIError = require('../apiError/ApiError');
const {executeQuery} = require("../helpers");

module.exports = {
    all: async (req, res, next) => {
        // Apsirasome SQL uzklausa
        const sql = `SELECT * FROM student`;

        // Ivykdome parasyta uzklausa
        const [items, error] = await executeQuery(sql);

        // Jei grizta klaida parodome ja
        if (error) {
            return next(error);
        }

        // Saraso grazinimas
        res.json(items);
    },
    single: async (req, res, next) => {
        const { id } = req.params;

        const sql = "SELECT * FROM student WHERE id=?";

        const [items, error] = await executeQuery(sql, [id]);

        if (error) {
            return next(error);
        }

        res.json(items[0]);
    },
    create: async (req, res, next) => {
        const { firstname, lastname, email } = req.body;

        const sql = `INSERT INTO student (firstname, lastname, email) VALUES (?,?,?)`;

        const [responseObject, error] = await executeQuery(sql, [firstname, lastname, email]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: responseObject.insertId,
            message: 'Student created successfully',
        });
    },
    update: async (req, res, next) => {
        const { id } = req.params;

        const { firstname, lastname, email } = req.body;

        const sql = `UPDATE student SET firstname=?, lastname=?, email=? WHERE id=?`

        const [responseObject, error] = await executeQuery(sql, [firstname, lastname, email, id]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: id,
            message: `Student with id:${id} updated successfully`,
        });
    },
    delete: async (req, res, next) => {
        const { id } = req.params;

        const sql = 'DELETE FROM `student` WHERE id=?';

        const [responseObject, error] = await executeQuery(sql, [id]);
        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(200).json({
            message: 'Student deleted successfully',
        });
    }
}
