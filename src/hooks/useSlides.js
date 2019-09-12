import { useEffect } from 'react';
import useLogger from './useLogger';

/**
 * Responsible for applying the styles from state
 * and computing the snap points based on the configuration
 * @param {*} sliderState
 * @param {*} setSliderState
 */
function useSlides(sliderState, setSliderState) {
  const {
    cellAlign,
    debug,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    view,
    widthPerSlide
  } = sliderState;

  useEffect(() => {
    if (slides.length < 1) return;

    // Always parse numeric values just in case they passed a number as a string
    const parsedMarginGapsPerSlide = fullWidthPerSlide ? 0 : parseInt(marginGapsPerSlide);
    const parsedWidthPerSlide = fullWidthPerSlide ? sliderWidth : parseInt(widthPerSlide);

    const marginReducer = parsedMarginGapsPerSlide * 2;

    const widthPerSlideCondition = !isNaN(parsedWidthPerSlide) && parsedWidthPerSlide > 0;

    const marginGapsPerSlideCondition =
      !isNaN(parsedMarginGapsPerSlide) && parsedMarginGapsPerSlide > -1;

    const canCalculate = widthPerSlideCondition && marginGapsPerSlideCondition;

    if (!canCalculate) return;

    let margin = 0;
    const points = [{ x: 0, id: 0 }];

    for (let i = 0, len = slides.length; i < len; i++) {
      const slide = slides[i];
      const incrementer = i + 1;
      let x = parsedWidthPerSlide * incrementer;

      const { style } = slide;

      style.width = `${parsedWidthPerSlide}px`;
      style.margin = `0 ${parsedMarginGapsPerSlide}px`;

      if (!fullWidthPerSlide) {
        if (i === 0) style.marginLeft = 0;
        if (i === len - 1) style.marginRight = 0;

        const startingMargin = marginReducer;
        margin = startingMargin * incrementer;
        x += margin;
      }

      points.push({
        x: cellAlign === 'left' ? x : -Math.abs(x),
        id: incrementer
      });
    }

    // remove last point margins
    points[points.length - 1].x =
      cellAlign === 'left'
        ? points[points.length - 1].x - marginReducer
        : points[points.length - 1].x + marginReducer;

    const lastPoint = Math.abs(points[points.length - 1].x);

    if (debug) useLogger(points, 'Original SnapPoints');

    let timer;

    if (!fullWidthPerSlide && lastPoint > sliderWidth) {
      let excessWidth = lastPoint - sliderWidth; // this will always be the last snap point
      const snapPoints = points.filter(point => excessWidth > Math.abs(point.x));

      excessWidth = cellAlign === 'left' ? Math.abs(excessWidth) : -Math.abs(excessWidth);
      snapPoints.push({ x: excessWidth, id: snapPoints.length });
      setSliderState({ snapPoints, dragEnabled: true });

      timer = setTimeout(() => view.current.changePosition({ x: excessWidth, y: 0 }));
    } else if (fullWidthPerSlide) {
      setSliderState({ snapPoints: points.slice(0, -1), dragEnabled: true });

      timer = setTimeout(() => {
        view.current.changePosition({
          x: cellAlign === 'left' ? Math.abs(lastPoint) : -Math.abs(lastPoint),
          y: 0
        });
      });
    } else {
      setSliderState({ snapPoints: [], dragEnabled: false });

      timer = setTimeout(() => {
        view.current.changePosition({
          x: cellAlign === 'left' ? 0 : Math.abs(lastPoint - sliderWidth),
          y: 0
        });
      });
    }

    return () => clearTimeout(timer);
  }, [sliderWidth, cellAlign, fullWidthPerSlide, marginGapsPerSlide, slides, widthPerSlide]);
}

export default useSlides;
