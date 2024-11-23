const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Register student
router.post('/api/register', async(req, res) => {
    const { name, email, password } = req.body;
    const newStudent = new Student({ name, email, password });
    try {
        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to register student' });
    }
});

// Login student
router.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }
    if (student.password === password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;