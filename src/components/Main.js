import React, { useState } from 'react';
import axios from 'axios';

import Section1 from './Section1';
import Section2 from './Section2';

function Main() {
  const [sql, setSql] = useState('');
  const [ast, setAst] = useState('');

  const apiUrl = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  const handleSqlChange = (e) => {
    setSql(e.target.value);
  };

  const handleTransformChange = async () => {
    try {
      const response = await axios.post(`${apiUrl}/parse-sql`, { sql });
      setAst(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("API-1 Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>SQL Transformer</h1>
      <Section1
        sql={sql}
        handleSqlChange={handleSqlChange}
        handleTransformChange={handleTransformChange}
      />
      <Section2 ast={ast} />
    </div>
  );
}

export default Main;
