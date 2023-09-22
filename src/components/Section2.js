import React from 'react';

function Section2({ sql }) {
  return (
    <section className="section-2">
      <h2>Transformed SQL</h2>
      <textarea
        readOnly
        value={sql}
        className="sql-area"
      />
    </section>
  );
}

export default Section2;
