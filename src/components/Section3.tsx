import React, { useEffect } from 'react';

type Props = {
  columnMap: string,
}

function Section3({
  columnMap
}: Props) {
  const adjustHeight = () => {
    const textarea = document.querySelector('.map-area') as HTMLTextAreaElement;
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
      <h2>Column Map</h2>
      <textarea
        value={columnMap}
        className="map-area"
        onChange={adjustHeight}
      />
    </section>
  );
}

export default Section3;
