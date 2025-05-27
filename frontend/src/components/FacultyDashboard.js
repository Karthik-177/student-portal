import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyDashboard = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [assessmentText, setAssessmentText] = useState({});
  const [grade, setGrade] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const handleAssessmentChange = (projectId, value) => {
    setAssessmentText(prev => ({ ...prev, [projectId]: value }));
  };

  const handleGradeChange = (projectId, value) => {
    setGrade(prev => ({ ...prev, [projectId]: value }));
  };

  const handleSubmitAssessment = async (projectId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      return;
    }
    setLoading(prev => ({ ...prev, [projectId]: true }));
    setError('');
    try {
      await axios.patch(`http://localhost:5000/api/projects/${projectId}/assess`, {
        assessmentText: assessmentText[projectId] || '',
        grade: grade[projectId] || ''
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state to reflect changes
      setProjects(prevProjects => prevProjects.map(proj => {
        if (proj._id === projectId) {
          return {
            ...proj,
            assessmentText: assessmentText[projectId] || '',
            grade: grade[projectId] || ''
          };
        }
        return proj;
      }));
    } catch (err) {
      setError('Failed to submit assessment');
    } finally {
      setLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {projects.map((proj) => (
          <li key={proj._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <p><strong>{proj.studentName}</strong> - {proj.projectTitle}</p>
            <p>File: {proj.filename}</p>
            <p>Assessment: {proj.assessmentText || 'Not assessed yet'}</p>
            <p>Grade: {proj.grade || 'Not graded yet'}</p>
            <textarea
              placeholder="Enter assessment"
              value={assessmentText[proj._id] || ''}
              onChange={(e) => handleAssessmentChange(proj._id, e.target.value)}
              rows={3}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <input
              type="text"
              placeholder="Enter grade"
              value={grade[proj._id] || ''}
              onChange={(e) => handleGradeChange(proj._id, e.target.value)}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <button
              onClick={() => handleSubmitAssessment(proj._id)}
              disabled={loading[proj._id]}
            >
              {loading[proj._id] ? 'Submitting...' : 'Submit Assessment'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyDashboard;
