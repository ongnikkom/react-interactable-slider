import React, { useState } from 'react';
import ReactInteractableSlider from '../../dist';

const style = {
  border: '1px solid #ddd',
  height: 300
};

function App() {
  const [slides, setSlides] = useState(Array.from(Array(10).keys()));
  return (
    <>
      <button onClick={() => setSlides([...slides, slides.length])}>Add 1 slide</button>
      <button onClick={() => setSlides(slides.slice(0, -1))}>Remove 1 slide</button>

      <div>&nbsp;</div>

      <ReactInteractableSlider debug={true} navigationType={'both'}>
        {slides.map(v => (
          <div style={style} key={v}>
            {v + 1}
          </div>
        ))}
      </ReactInteractableSlider>
    </>
  );
}

export default App;
