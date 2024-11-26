// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require("path")
//     // Initialize environment variables
// dotenv.config();

// // Create an Express app
// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON request bodies
// const _dirname = path.dirname("")
// const buildpath = path.join(_dirname, "../client/build")
// app.use(express.static(buildpath));
// app.use(cors({ "origin": "*" })); // Enable Cross-Origin Resource Sharing

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ashankaidevify:idevify%40gmail.com@cluster0.ijmsuse.mongodb.net/DK';
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// // User Schema
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// // Routes
// app.post('/api/register', async(req, res) => {
//     const { name, email, password } = req.body;

//     // Input validation
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }

//         // Create and save a new user
//         const newUser = new User({ name, email, password });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.error('Error during registration:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Server setup
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${8000}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ashankaidevify:idevify%40gmail.com@cluster0.ijmsuse.mongodb.net/DK';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Routes
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve React static files
const buildPath = path.join(__dirname, 'client/build');
app.use(express.static(buildPath));

// Catch-all route to serve React frontend for any unknown requests
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});