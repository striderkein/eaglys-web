import React, { useEffect } from 'react';

function Section2({ ast }) {
  const adjustHeight = () => {
    const textarea = document.querySelector('.ast-area');
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = (textarea.scrollHeight) + "px";
    }
  }

  useEffect(() => {
    adjustHeight();
  }, [ast]);

  return (
    <section className="section-2">
      <textarea
        value={ast}
        className="ast-area"
        onChange={adjustHeight}
      />
    </section>
  );
}

export default Section2;
