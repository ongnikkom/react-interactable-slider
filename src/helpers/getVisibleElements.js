/**
 * Get the visible elements inside the slider
 * depending on the width of the slide (widthPerSlide)
 * and the container width (sliderWidth)
 * @param {*} elements
 * @param {*} widthPerSlide
 * @param {*} sliderWidth
 */
function getVisibleElements(elements, widthPerSlide, sliderWidth) {
  return elements.filter(elem => {
    let offsetLeft = elem.offsetLeft + widthPerSlide;
    return offsetLeft <= sliderWidth;
  });
}

export default getVisibleElements;
