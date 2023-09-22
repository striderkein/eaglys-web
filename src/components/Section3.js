import React, { useEffect } from 'react';

function Section3({ columnMap }) {
  const adjustHeight = () => {
    const textarea = document.querySelector('.map-area');
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = (textarea.scrollHeight) + "px";
    }
  }

  useEffect(() => {
    adjustHeight();
  }, [columnMap]);

  return (
    <section className="section-2">
      <textarea
        value={columnMap}
        className="map-area"
        onChange={adjustHeight}
      />
    </section>
  );
}

export default Section3;
