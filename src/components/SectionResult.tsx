import React from 'react';

import Section2 from './Section2';
import Section3 from './Section3';

type Props = {
  sql: string,
  columnMap: string,
}

function SectionResult({
  sql,
  columnMap,
}: Props) {
  return (
    <>
      <Section2 sql={sql} />
      <Section3 columnMap={columnMap} />
    </>
  );
}

export default SectionResult;
