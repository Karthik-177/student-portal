import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FacultyLogin from './components/FacultyLogin';
import FacultyDashboard from './components/FacultyDashboard';
import LandingPage from './components/LandingPage';
import StudentDetailsForm from './components/StudentDetailsForm';
import StudentUpload from './components/StudentUpload';
import StudentForm from './components/StudentForm';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/faculty/login"
          element={
            user ? (
              <Navigate to="/faculty/dashboard" replace />
            ) : (
              <FacultyLogin onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/faculty/dashboard"
          element={
            user ? (
              <FacultyDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/faculty/login" replace />
            )
          }
        />
        <Route path="/student/details" element={<StudentDetailsForm />} />
        <Route path="/student/upload" element={<StudentUpload />} />
        <Route path="/student/form" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
