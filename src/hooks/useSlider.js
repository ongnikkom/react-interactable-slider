import React, { Children, cloneElement, useCallback, useLayoutEffect, useMemo } from 'react';
import { useDidUpdate } from 'react-hooks-lib';
import getSliderPortPropsByIndex from '../helpers/getSliderPortPropsByIndex';
import getSnapPoints from '../helpers/getSnapPoints';
import SlidePort from '../components/SlidePort';

function useSlider([state, setState]) {
  let nodes = [];

  const {
    cellAlign,
    children,
    debug,
    marginGapsPerSlide,
    fullWidthPerSlide,
    sliderWidth,
    slides,
    view,
    widthPerSlide
  } = state;

  /**
   * Reset position of the interactable view depending on x position
   */
  const resetPosition = useCallback((x = 0) => view.current.changePosition({ x, y: 0 }), [view]);

  /**
   * Manage the array slides depending on the cell alignment.
   * The idea of the computation is that the snapPoints should
   * be the same for ltr or rtl direction. The only difference
   * is that the values for ltr should be negative and rtl should
   * be positive.
   *
   * ltr should be negative because starting from the left container we
   * want to create the snapPoints outside the container. Otherwise for
   * rtl, starting from the right container we also want to create
   * snapPoints outside the container. In this case, we will be able
   * to pull the slider in that direction.
   *
   * In case of rtl direction, we want to reverse it so we can have
   * the exact same computation for the ltr direction.
   */
  useLayoutEffect(() => {
    const refs = cellAlign === 'left' ? nodes : nodes.slice().reverse();
    setState({ slides: refs });
  }, [cellAlign, Children.count(children), fullWidthPerSlide, marginGapsPerSlide, widthPerSlide]);

  /**
   * Compute the snapPoints to create the slider behavior.
   */
  const snapPoints = useMemo(() => {
    return getSnapPoints(state);
  }, [slides, sliderWidth]);

  /**
   * If it doesn't have any snap points or the slides doesn't
   * overflow to the slider container. In this case, we
   * should disable the drag
   *
   * Will run twice on the first render when responsive is false
   * - The empty snapPoints []
   * - The sliderWidth we have from the internalProps which is 800
   *
   * Will run thrice on the first render when responsive is true
   * - Same 2 steps from above
   * - The sliderWidth from the resize event
   */
  useLayoutEffect(() => {
    setState({ snapPoints, dragEnabled: snapPoints.length > 0 });
  }, [snapPoints]);

  /**
   * Reset the position in case the following properties changed
   */
  useDidUpdate(() => {
    resetPosition();
  }, [cellAlign, fullWidthPerSlide, marginGapsPerSlide, sliderWidth, widthPerSlide]);

  /**
   * We need to create a Port Component so we can set the
   * width and margins of each slide. Because, we cannot directly
   * set these properties from the props.children especially
   * when we pass a React Component children instead of a
   * regular DOM.
   */
  const render = useMemo(() => {
    const count = Children.count(children);
    return Children.map(children, (child, i) => {
      const slidePortProps = getSliderPortPropsByIndex(state, i, count);
      return cloneElement(<SlidePort {...slidePortProps}>{child}</SlidePort>, {
        ref: node => {
          nodes = [...nodes, node];
          const { ref } = child;
          if (typeof ref === 'function') ref(node);
        }
      });
    });
  }, [
    cellAlign,
    Children.count(children),
    debug,
    marginGapsPerSlide,
    fullWidthPerSlide,
    sliderWidth,
    widthPerSlide
  ]);

  return [render];
}

export default useSlider;
