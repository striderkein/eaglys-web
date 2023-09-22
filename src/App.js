import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import Main from './components/Main';

function App() {
  const [sql, setSql] = useState('');
  const [modifiedSql, setModifiedSql] = useState('');

  const apiUrl = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

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
      <Main
        sql={sql}
        handleSqlChange={handleSqlChange}
        handleTransformChange={handleTransformChange}
        modifiedSql={modifiedSql}
      />
    </div>
  );
}

export default App;
