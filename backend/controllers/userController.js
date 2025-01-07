const db = require('../db');

// Get all users
const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new user
const createUser = (req, res) => {
    const { name, email,phone } = req.body;
    db.query('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', id: results.insertId });
    });
};

// Update a user
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email,phone } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email,phone, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated' });
    });
};

// Delete a user
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
