import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './Register';  // Import the Register component
import Register from './components/register';
// import Login from './components/login';
const App = () => {
    return ( <div >
         <Router>
 <div className="App">
        {/* <h1>Welcome to the Student Registration System</h1> */}

        {/* Define Routes */}
        <Routes>
          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* You can add more routes here for other components */}
        </Routes>
      </div>
      </Router>
        </div>
    )
}

export default App