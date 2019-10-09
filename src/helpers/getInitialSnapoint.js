/**
 * Get the initial snap point based on the last visible element
 * to ensure that if the last visible element is cut or overflowing
 * in the container. We will snap to that slide to show its full
 * content.
 * @param {*} lastVisibleElement
 * @param {*} fullWidthPerSlide
 * @param {*} sliderWidth
 * @param {*} widthPerSlide
 */
const getInitialSnapPoint = (lastVisibleElement, fullWidthPerSlide, sliderWidth, widthPerSlide) => {
  return !fullWidthPerSlide ? widthPerSlide - (sliderWidth - lastVisibleElement.offsetLeft) : 0;
};

export default getInitialSnapPoint;
