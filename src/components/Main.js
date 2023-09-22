import React from 'react';
import Section1 from './Section1';
import Section2 from './Section2';

function Main({ sql, handleSqlChange, handleTransformChange, modifiedSql, adjustHeight }) {
  return (
    <div className="App">
      <h1>SQL Transformer</h1>
      <Section1 sql={sql} handleSqlChange={handleSqlChange} handleTransformChange={handleTransformChange} />
      <Section2 modifiedSql={modifiedSql} adjustHeight={adjustHeight} />
    </div>
  );
}

export default Main;
