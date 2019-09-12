import React, { forwardRef } from 'react';

function SlidePort({ children }, ref) {
  return <div ref={ref}>{children}</div>;
}

export default forwardRef(SlidePort);
