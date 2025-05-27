import React, { useState } from 'react';
import axios from 'axios';

const FacultyLogin = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
      fontSize: '1.8rem',
      fontWeight: '600',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '12px 15px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007BFF',
    },
    toggleText: {
      textAlign: 'center',
      color: '#007BFF',
      cursor: 'pointer',
      marginTop: '10px',
      userSelect: 'none',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center',
    },
    button: {
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/faculty/login', { email, password });
      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, role: 'faculty' });
      if (response.data.success) {
        setIsRegister(false);
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isRegister ? 'Faculty Registration' : 'Faculty Login'}</h2>
      {isRegister ? (
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={focusedInput === 'name' ? { ...styles.input, ...styles.inputFocus } : styles.input}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={focusedInput === 'email' ? { ...styles.input, ...styles.inputFocus } : styles.input}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={focusedInput === 'password' ? { ...styles.input, ...styles.inputFocus } : styles.input}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Register</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={focusedInput === 'email' ? { ...styles.input, ...styles.inputFocus } : styles.input}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={focusedInput === 'password' ? { ...styles.input, ...styles.inputFocus } : styles.input}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
      )}
      <p style={styles.toggleText} onClick={() => { setIsRegister(!isRegister); setError(''); }}>
        {isRegister ? 'Already have an account? Login' : 'Create new account'}
      </p>
    </div>
  );
};

export default FacultyLogin;
