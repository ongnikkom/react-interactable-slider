import React, { Children, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import useDocumentVisibility from './useDocumentVisibility';
import SlidePort from '../components/SlidePort';

function useSlider([state, setState], interactableRef, forceDragEnabled) {
  const documentVisibility = useDocumentVisibility();
  let slidesRef = [];

  const {
    cellAlign,
    children,
    currentSnapPoint,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    view,
    widthPerSlide
  } = state;

  const recalculateOnChange = useMemo(() => [
    cellAlign,
    documentVisibility,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    widthPerSlide
  ]);

  const resetPosition = useCallback(() => view && view.current.changePosition({ x: 0, y: 0 }));
  const snapTo = useCallback(index => view && view.current.snapTo({ index }));

  const getSnapPoints = useCallback(() => {
    if (slides.length < 1) return;

    const snapPoints = [{ x: 0 }];
    const marginGaps = marginGapsPerSlide * 2;
    const isLTR = cellAlign === 'left';

    const elements = isLTR ? slides : slides.slice().reverse();
    const visibleElements = elements.filter(e => {
      let offsetLeft = e.offsetLeft + widthPerSlide;
      return offsetLeft <= sliderWidth;
    });

    if (visibleElements.length === slides.length) {
      // nothing to do all elements are visible within the container
      return;
    }

    const lastVisibleElement = elements[visibleElements.length];

    let initialSnapPoint = !fullWidthPerSlide
      ? widthPerSlide - (sliderWidth - lastVisibleElement.offsetLeft)
      : 0;

    if (!fullWidthPerSlide) snapPoints.push({ x: isLTR ? -initialSnapPoint : initialSnapPoint });

    const lastElement = elements[elements.length - 1];

    const lastPoint =
      lastVisibleElement !== lastElement ? lastElement.offsetLeft + widthPerSlide + marginGaps : 0;

    const excessWidth = Math.abs(lastPoint > 0 ? lastPoint - sliderWidth : 0);

    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      let x = element.offsetLeft;

      if (!fullWidthPerSlide && (excessWidth > 0 && excessWidth > x) && x > 0) {
        x = x + initialSnapPoint;
        if (excessWidth > x) {
          snapPoints.push({ x: isLTR ? -x : x });
        }
      } else if (fullWidthPerSlide && x > 0) {
        x = sliderWidth * i;
        snapPoints.push({ x: isLTR ? -x : x, damping: 0.62 });
      }
    }

    return snapPoints;
  }, recalculateOnChange);

  useEffect(() => {
    setState({ view: interactableRef });
  }, []);

  useEffect(() => {
    setState({ slides: slidesRef });
  }, [children]);

  const snapPoints = useMemo(() => {
    return (documentVisibility === 'hidden' ? [] : getSnapPoints()) || [];
  }, recalculateOnChange);

  useLayoutEffect(() => {
    if (snapPoints.length < 1) {
      setState({ snapPoints, dragEnabled: false });
      resetPosition();
    } else {
      setState({ snapPoints, dragEnabled: forceDragEnabled !== null ? forceDragEnabled : true });
    }
  }, [snapPoints]);

  useLayoutEffect(() => {
    resetPosition();
  }, [cellAlign, fullWidthPerSlide, marginGapsPerSlide, sliderWidth, widthPerSlide]);

  useLayoutEffect(() => {
    const lastSnapPoint = snapPoints.filter((v, i) => i === currentSnapPoint);
    if (lastSnapPoint.length < 1) snapTo(currentSnapPoint - 1);
  }, [currentSnapPoint, slides]);

  const render = useCallback(children => {
    const count = Children.count(children);
    let margin;
    let width;

    return Children.map(children, (child, i) => {
      if (!fullWidthPerSlide) {
        width = widthPerSlide;
        switch (i) {
          case 0:
            margin =
              cellAlign === 'left'
                ? `0 ${marginGapsPerSlide}px 0 0`
                : `0 0 0  ${marginGapsPerSlide}px`;
            break;
          case count - 1:
            margin =
              cellAlign === 'left'
                ? `0 0 0 ${marginGapsPerSlide}px`
                : `0 ${marginGapsPerSlide}px 0 0`;
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
