import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Section1 from './components/Section1';
import Section2 from './components/Section2';

function App() {
  const [sql, setSql] = useState('');
  const [modifiedSql, setModifiedSql] = useState('');

  const apiUrl = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  const adjustHeight = () => {
    const textarea = document.querySelector('.ast-area');
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = (textarea.scrollHeight) + "px";
    }
  }

  useEffect(() => {
    adjustHeight();
  }, [modifiedSql]);

  const handleSqlChange = (e) => {
    setSql(e.target.value);
  };

  const handleTransformChange = async () => {
    try {
      const response = await axios.post(`${apiUrl}/parse-sql`, { sql });
      setModifiedSql(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("API-1 Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>SQL Transformer</h1>
      <Section1 sql={sql} handleSqlChange={handleSqlChange} handleTransformChange={handleTransformChange} />
      <Section2 modifiedSql={modifiedSql} adjustHeight={adjustHeight} />
    </div>
  );
}

export default App;
