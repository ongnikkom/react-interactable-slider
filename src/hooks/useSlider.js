import React, { Children, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import SlidePort from '../components/SlidePort';

function getSnapPoints(state) {
  const {
    cellAlign,
    children = [],
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    widthPerSlide
  } = state;

  if (slides.length < 1) return [[], 0];

  const snapPoints = [{ x: 0 }];
  const mask = [{ x: 0 }];
  const isLeft = cellAlign === 'left';
  const marginGaps = marginGapsPerSlide * 2;
  const conditionalSlides = isLeft ? slides : slides.slice().reverse();
  // const lastSlide = conditionalSlides[conditionalSlides.length - 1];
  const filteredSlides = conditionalSlides.filter(slide => slide.offsetLeft < sliderWidth);

  if (filteredSlides.length > 0) {
    const lastVisibleSlide = filteredSlides[filteredSlides.length - 1];
    const spacer = fullWidthPerSlide ? 0 : sliderWidth - lastVisibleSlide.offsetLeft;

    for (let i = 0, len = children.length; i < len; i++) {
      const counter = i + 1;
      let x = widthPerSlide * counter;
      let y = widthPerSlide * counter;

      if (!fullWidthPerSlide) {
        const diff = x - spacer;
        if (diff) x = Math.abs(diff);
        const margin = marginGaps * i;
        x += margin;

        const marginY = marginGaps * counter;
        y += marginY;
      }

      snapPoints.push({
        x: isLeft ? -x : x
      });

      mask.push({
        x: y
      });
    }

    const lastPoint = Math.abs(mask[mask.length - 1].x);

    return [snapPoints, lastPoint - sliderWidth];
  }

  return [[], 0];
}

function useSlider([state, setState], interactableRef) {
  let slidesRef = [];

  const {
    cellAlign,
    children,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
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
  }, [children]);

  useLayoutEffect(() => {
    setState({ widthPerSlide: fullWidthPerSlide ? sliderWidth : widthPerSlide });
  }, [fullWidthPerSlide, widthPerSlide]);

  const [snapPoints, excessWidth] = useMemo(() => {
    return getSnapPoints(state);
  }, [
    cellAlign,
    children,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    widthPerSlide
  ]);

  useLayoutEffect(() => {
    const filteredSnapPoints = snapPoints.filter(snapPoint => excessWidth >= Math.abs(snapPoint.x));
    if (filteredSnapPoints.length > 1) {
      setState({ snapPoints: filteredSnapPoints });
    } else {
      setState({ snapPoints: [], dragEnabled: false });
    }
  }, [snapPoints]);

  const snapTo = useCallback(() => view && view.current.snapTo({ index: 0 }));
  useLayoutEffect(() => {
    snapTo();
  }, [cellAlign, sliderWidth]);

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
