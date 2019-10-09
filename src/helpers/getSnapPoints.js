import getVisibleElements from './getVisibleElements';
import getInitialSnapPoint from './getInitialSnapoint';
import getLastSnapPoint from './getLastSnapPoint';

function getSnapPoints(props) {
  const {
    cellAlign,
    fullWidthPerSlide,
    marginGapsPerSlide,
    sliderWidth,
    slides,
    widthPerSlide
  } = props;

  if (slides.length < 1) return [];

  const isLeft = cellAlign === 'left';

  // The snapPoint will always start at 0 for ltr and rtl
  const snapPoints = [{ x: 0, damping: 0.62 }];

  // Margin gaps will be the in-between gaps of the slides
  const marginGaps = marginGapsPerSlide * 2;

  const elements = slides;

  /**
   * Check the visible elements inside the slider container.
   * If the visible elements are equal to the length of the slides
   * from our state. Meaning, we don't need to compute for
   * snapPoints as there are no excess elements overflowing in the
   * container.
   */
  const visibleElements = getVisibleElements(elements, widthPerSlide, sliderWidth);
  if (visibleElements.length === elements.length) return [];

  /**
   * See getInitialSnapPoints.js
   */
  const lastVisibleElement = elements[visibleElements.length];
  const initialSnapPoint = getInitialSnapPoint(
    lastVisibleElement,
    fullWidthPerSlide,
    sliderWidth,
    widthPerSlide
  );

  if (!fullWidthPerSlide)
    snapPoints.push({ x: isLeft ? -initialSnapPoint : initialSnapPoint, damping: 0.62 });

  /**
   * See getLastSnapPoint.js
   */
  const lastElement = elements[elements.length - 1];
  const lastSnapPoint = getLastSnapPoint(
    lastElement,
    lastVisibleElement,
    marginGaps,
    sliderWidth,
    widthPerSlide
  );

  /**
   * Computing the snapPoints based on the left offset of each element
   * in the slider. For full width it's fine to compute all the snapPoints.
   * Otherwise, we should stop until the last snapPoint.
   * See getLastSnapPoint.js for more information.
   */
  for (let i = 0, len = elements.length; i < len; i++) {
    const element = elements[i];
    let x = element.offsetLeft;

    if (!fullWidthPerSlide && (lastSnapPoint > 0 && lastSnapPoint > x) && x > 0) {
      x = x + initialSnapPoint;
      if (lastSnapPoint > x) {
        snapPoints.push({ x: isLeft ? -x : x, damping: 0.62 });
      }
    } else if (fullWidthPerSlide && x > 0) {
      x = sliderWidth * i;
      snapPoints.push({ x: isLeft ? -x : x, damping: 0.62 });
    }
  }

  return snapPoints;
}

export default getSnapPoints;
