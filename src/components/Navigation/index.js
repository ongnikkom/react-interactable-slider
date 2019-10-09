import React, { cloneElement, useContext, useMemo } from 'react';
import { arrow, dotsContainer, dot } from './styles';
import Context from '../../context';

function Navigation() {
  const [state] = useContext(Context);
  const { cellAlign, currentSnapPoint, customArrows, navigationType, snapPoints, view } = state;
  return null;
}

export default Navigation;
