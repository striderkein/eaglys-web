import React from 'react';

function Section2({ modifiedSql, adjustHeight }) {
  return (
    <section className="section-2">
      <textarea
        value={modifiedSql}
        className="ast-area"
        onChange={adjustHeight}
      />
    </section>
  );
}

export default Section2;
