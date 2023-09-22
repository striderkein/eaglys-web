import React, { useState } from 'react';

function Section1({ sql, handleSqlChange, handleTransformChange }) {
  const [selectedSqlType, setSelectedSqlType] = useState('SELECT');

  const handleSqlTypeChange = event => {
    const sqlType = event.target.value;
    let initialSql = '';

    switch (sqlType) {
      case 'SELECT':
        initialSql = 'SELECT * FROM my_table';
        break;
      case 'INSERT':
        initialSql = 'INSERT INTO my_table (column1, column2) VALUES (value1, value2)';
        break;
      case 'UPDATE':
        initialSql = 'UPDATE my_table SET column1 = value1 WHERE condition';
        break;
      case 'DELETE':
        initialSql = 'DELETE FROM my_table WHERE condition';
        break;
      default:
        break;
    }

    setSelectedSqlType(sqlType);
    handleSqlChange({ target: { value: initialSql } });
  };

  return (
    <section className="section-1">
      <h2>SQL</h2>
      <select value={selectedSqlType} onChange={handleSqlTypeChange}>
        <option value="SELECT">SELECT</option>
        <option value="INSERT">INSERT</option>
        <option value="UPDATE">UPDATE</option>
        <option value="DELETE">DELETE</option>
      </select>
      <textarea
        className="hoge"
        value={sql}
        onChange={handleSqlChange}
      />
      <div className="button-area">
        <button onClick={handleTransformChange}>Transform SQL</button>
      </div>
    </section>
  );
}

export default Section1;
