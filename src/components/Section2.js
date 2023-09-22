import React from 'react';

function Section2({ sql }) {
  return (
    <section className="section-2">
      <textarea
        value={sql}
        className="sql-area"
      />
    </section>
  );
}

export default Section2;
