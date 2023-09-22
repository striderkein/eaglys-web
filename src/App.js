import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sql, setSql] = useState('');
  const [modifiedSql, setModifiedSql] = useState('');

  const handleSqlChange = (e) => {
    setSql(e.target.value);
  };

  const handleTransformChange = async () => {
    try {
      const response = await axios.post('http://localhost:13000/parse-sql', { sql });
      setModifiedSql(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("API-1 Error:", error);
    }
  };

  return (
    <div className="App">
      <section className="section">
        <h1>SQL Transformer</h1>
        <textarea 
          className="hoge"
          value={sql}
          onChange={handleSqlChange}
        />
        <button onClick={handleTransformChange}>Transform SQL</button>
      </section>
      <section className="section">
        <textarea readOnly value={modifiedSql} className="hoge"></textarea>
      </section>
    </div>
  );
}

export default App;
