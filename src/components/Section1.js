import React from 'react';

function Section1({ sql, handleSqlChange, handleTransformChange }) {
  return (
    <section className="section-1">
      <h2>SQL</h2>
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
