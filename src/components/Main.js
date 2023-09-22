import React, { useState } from 'react';
import axios from 'axios';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

function Main() {
  const [sql, setSql] = useState('');
  const [modifiedSql, setModifiedSql] = useState('');
  const [columnMap, setColumnMap] = useState('');

  const apiUrl = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  const handleSqlChange = (e) => {
    setSql(e.target.value);
  };

  const handleTransformChange = async () => {
    try {
      const ast = await axios.post(`${apiUrl}/parse-sql`, { sql })
      console.log("API-1 Response:", ast);
      const modifiedAst = await axios.post(`${apiUrl}/modify-ast`, ast.data );
      console.log("API-2 Response:", modifiedAst);
      const rebuiltQuery = await axios.post(`${apiUrl}/rebuild-sql`, modifiedAst.data );
      console.log("API-3 Response:", rebuiltQuery);
      setModifiedSql(JSON.stringify(rebuiltQuery.data.query, null, 2).replace(/^"|"$|`/g, ''));
      setColumnMap(JSON.stringify(modifiedAst.data.columnMap, null, 2));
    } catch (error) {
      console.error("API Error:", error);
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
      <Section2 sql={modifiedSql} />
      <Section3 columnMap={columnMap} />
    </div>
  );
}

export default Main;
