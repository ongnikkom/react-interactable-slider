import React, { forwardRef } from 'react';

function SlidePort({ children, margin, width }, ref) {
  const style = { width, margin };
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

export default forwardRef(SlidePort);
