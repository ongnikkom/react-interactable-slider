import React, { useRef, useState } from 'react';
import useMergeState from './hooks/useMergeState';

import ReactInteractableSlider from '../../dist';
import Debugger from './components/Debugger';

import LeftArrow from './components/Arrows/LeftArrow';
import RightArrow from './components/Arrows/RightArrow';

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

  const addSlide = () => setSlides([...slides, slides.length]);

  const removeSlide = () => setSlides(slides.slice(0, -1));

  const incrementCount = () => setCount(count + 1);

  const toggleCustomArrows = () => {
    const [state, setState] = slider;
    setState(
      state.customArrows
        ? { customArrows: null }
        : {
            customArrows: {
              left: <LeftArrow navigationType={state.navigationType} />,
              right: <RightArrow navigationType={state.navigationType} />
            }
          }
    );
  };

  return (
    <>
      <button onClick={addSlide}>Add Slide</button>{' '}
      <button onClick={removeSlide}>RemoveSlide</button>
      <br />
      <br />
      <button onClick={incrementCount}>Increment Count</button>{' '}
      <button onClick={toggleCustomArrows}>Toggle Custom Arrows</button>
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
