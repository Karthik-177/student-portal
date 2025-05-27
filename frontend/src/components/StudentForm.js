import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/projects/submit', formData);
      setSuccess('Project submitted successfully!');
      setName('');
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error(error);
      setError('Error submitting project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '450px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Submit Project</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={{ marginBottom: '20px' }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '18px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => !loading && (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseLeave={e => !loading && (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{success}</p>}
    </form>
  );
};

export default StudentForm;
