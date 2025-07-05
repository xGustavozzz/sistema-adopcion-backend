const db = require('../config/db');

//hace una consulta a la base de datos donde obtiene todos los empleados
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM employees');
    return result.rows;
};

exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
    return result.rows[0];
};

exports.create = async (employee) => {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = employee;
    const result = await db.query(
        'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id]
    );
    return result.rows[0];
};

exports.update = async (id, employee) => {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = employee;
    const result = await db.query(
        'UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_id = $6, salary = $7, commission_pct = $8, manager_id = $9, department_id = $10 WHERE employee_id = $11 RETURNING *',
        [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id, id]
    );
    return result.rows[0];
}

exports.delete = async (id) => {
    const result = await db.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
    return result.rows[0];
}