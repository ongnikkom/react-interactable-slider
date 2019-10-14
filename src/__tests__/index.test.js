import React from 'react';
import { render } from '@testing-library/react';
import ReactInteractableSlider from '../'

test('if the carousel renders all the children provided to it',  () => {
  
  const mockSlides = Array.from(Array(20).keys());

  const { container, debug } = render(
    <ReactInteractableSlider {...{ navigationType: 'arrows' }}>
      {mockSlides.map((mockSlide, index) => <div key={index}>{mockSlide}</div>)}
    </ReactInteractableSlider>
  );
  // debug();
  const sliderContainer = container.querySelector('.container-inner div');
  expect(sliderContainer.childNodes.length).toBe(20);
});

