import React, { Children, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import SlidePort from '../components/SlidePort';

function getSnapPoints(state) {
  const { cellAlign, children = [], fullWidthPerSlide, marginGapsPerSlide, widthPerSlide } = state;

  const snapPoints = [{ x: 0, id: 0 }];
  const isLeft = cellAlign === 'left';
  const marginReducer = marginGapsPerSlide * 2;

  for (let i = 0, len = children.length; i < len; i++) {
    const counter = i + 1;
    let x = widthPerSlide * counter;

    if (!fullWidthPerSlide) {
      const startingMargin = marginReducer;
      const margin = startingMargin * counter;
      x += margin;
    }

    snapPoints.push({
      x: isLeft ? x : -x,
      id: counter
    });
  }

  const lastPoint = Math.abs(snapPoints[snapPoints.length - 1].x);

  return [snapPoints, lastPoint - marginReducer];
}

function useSlider([state, setState], interactableRef) {
  let slidesRef = [];

  const {
    cellAlign,
    children,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    view,
    widthPerSlide
  } = state;

  /**
   * Set view
   */
  useEffect(() => {
    setState({ view: interactableRef });
  }, []);

  useEffect(() => {
    setState({ slides: slidesRef });
  }, []);

  useLayoutEffect(() => {
    setState({ widthPerSlide: fullWidthPerSlide ? sliderWidth : widthPerSlide });
  }, [fullWidthPerSlide, widthPerSlide]);

  const [snapPoints, lastPoint] = useMemo(() => {
    return getSnapPoints(state);
  }, [cellAlign, children, fullWidthPerSlide, marginGapsPerSlide, sliderWidth, widthPerSlide]);

  let excessWidth = lastPoint - sliderWidth;
  const memoizedFinalSnapPoints = useMemo(() => {
    let finalSnapPoints = [];

    if (!fullWidthPerSlide && lastPoint > sliderWidth) {
      finalSnapPoints = snapPoints.filter(point => excessWidth > Math.abs(point.x));
      excessWidth = cellAlign === 'left' ? excessWidth : -excessWidth;
      finalSnapPoints.push({ x: excessWidth, id: finalSnapPoints.length });
    } else if (fullWidthPerSlide) {
      finalSnapPoints = snapPoints.slice(0, -1);
    }

    return finalSnapPoints;
  }, [snapPoints]);

  useLayoutEffect(() => {
    setState({ snapPoints: memoizedFinalSnapPoints });
  }, [memoizedFinalSnapPoints]);

  const changePosition = useCallback(x => view && view.current.changePosition({ x, y: 0 }));
  useLayoutEffect(() => {
    let timer;

    if (!fullWidthPerSlide && lastPoint > sliderWidth) {
      timer = setTimeout(() => changePosition(excessWidth));
    } else if (fullWidthPerSlide) {
      timer = setTimeout(() => changePosition(cellAlign === 'left' ? lastPoint : -lastPoint));
    } else {
      timer = setTimeout(() => changePosition(cellAlign === 'left' ? 0 : sliderWidth - lastPoint));
    }

    return () => clearTimeout(timer);
  }, [cellAlign, marginGapsPerSlide, fullWidthPerSlide, sliderWidth, widthPerSlide]);

  const render = useCallback(children => {
    const count = Children.count(children);
    let margin;
    let width;

    return Children.map(children, (child, i) => {
      if (!fullWidthPerSlide) {
        width = widthPerSlide;
        switch (i) {
          case 0:
            margin = `0 ${marginGapsPerSlide}px 0 0`;
            break;
          case count - 1:
            margin = `0 0 0 ${marginGapsPerSlide}px`;
            break;
          default:
            margin = `0 ${marginGapsPerSlide}px`;
        }
      } else {
        width = sliderWidth;
        margin = 0;
      }

      return React.cloneElement(
        <SlidePort margin={margin} width={width}>
          {child}
        </SlidePort>,
        {
          ref: node => {
            if (!node) return;
            if (i < 1) slidesRef = [];
            slidesRef = [...slidesRef, node];
            const { ref } = child;
            if (typeof ref === 'function') {
              ref(node);
            }
          }
        }
      );
    });
  });

  return [render];
}

export default useSlider;
