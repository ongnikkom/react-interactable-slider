/**
 * If lastVisibleElement is not equal to lastElement.
 * We want to get the total offsetLeft of the element
 * plus the widthPerSlide and marginGaps so that we can ensure
 * that we don't create whitespaces when sliding to the last
 * element.
 *
 * We don't want to create snapPoints for all the slides as this
 * will result in whitespaces when we loop through it. So, when
 * we compute and create the snapPoints in the loop we just want
 * to stop until this lastSnapPoint
 *
 * @param {*} lastElement
 * @param {*} lastVisibleElement
 * @param {*} marginGaps
 * @param {*} sliderWidth
 * @param {*} widthPerSlide
 */
const getLastSnapPoint = (
  lastElement,
  lastVisibleElement,
  marginGaps,
  sliderWidth,
  widthPerSlide
) => {
  const lastPoint =
    lastVisibleElement !== lastElement ? lastElement.offsetLeft + widthPerSlide + marginGaps : 0;
  return Math.abs(lastPoint > 0 ? lastPoint - sliderWidth : 0);
};

export default getLastSnapPoint;
