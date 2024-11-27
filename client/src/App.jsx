import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Import the Register component
import Register from './components/register';
// import Login from './components/login';

const App = () => {
    return (
        <div>
            <Router>
                <div className="App">
                    {/* Define Routes */}
                    <Routes>
                        {/* Redirect root path (/) to /register */}
                        <Route path="/" element={<Navigate to="/register" replace />} />
                        {/* Register route */}
                        <Route path="/register" element={<Register />} />
                        {/* Add more routes here as needed */}
                        {/* <Route path="/login" element={<Login />} /> */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
