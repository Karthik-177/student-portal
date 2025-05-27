import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Submitted Projects</h2>
      <ul>
        {projects.map((proj, idx) => (
          <li key={idx}>
            {proj.studentName} - {proj.projectTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
