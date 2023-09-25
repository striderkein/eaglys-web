import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

type Props = {
  sql: string,
}

function Section2({
  sql
}: Props) {
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
