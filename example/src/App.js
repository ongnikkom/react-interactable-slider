import React, { useEffect, useRef, useState } from 'react';
import useMergeState from './hooks/useMergeState';

import ReactInteractableSlider, { refresh } from '../../dist';
import Debugger from './components/Debugger';

const style = {
  border: '1px solid #323031',
  height: 300
};

function App() {
  const slider = useMergeState({
    cellAlign: 'left',
    debug: true,
    dragEnabled: true,
    fullWidthPerSlide: false,
    marginGapsPerSlide: 4,
    navigationType: 'both',
    widthPerSlide: 200
  });

  const [slides, setSlides] = useState(Array.from(Array(7).keys()));
  const [count, setCount] = useState(0);
  const ref = useRef(ref);

  return (
    <>
      <button onClick={() => setSlides([...slides, slides.length])}>Increment Slides</button>{' '}
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <div>&nbsp;</div>
      <div>
        Increment count (Making sure slider doesn't go back to slide 1 when using state from parent
        component changes): <b>{count}</b>
      </div>
      <div>&nbsp;</div>
      <ReactInteractableSlider {...slider[0]}>
        {slides.map(v => (
          <div style={style} key={v}>
            {v + 1}
          </div>
        ))}
      </ReactInteractableSlider>
      <Debugger slider={slider} />
    </>
  );
}

export default App;
