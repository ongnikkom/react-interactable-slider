import React, { forwardRef } from 'react';

function SlidePort(props, ref) {
  return <div ref={ref} {...props} />;
}

export default forwardRef(SlidePort);
