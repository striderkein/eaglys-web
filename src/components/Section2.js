import React, { useEffect } from 'react';

function Section2({ modifiedSql }) {
  const adjustHeight = () => {
    const textarea = document.querySelector('.ast-area');
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = (textarea.scrollHeight) + "px";
    }
  }

  useEffect(() => {
    adjustHeight();
  }, [modifiedSql]);

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
