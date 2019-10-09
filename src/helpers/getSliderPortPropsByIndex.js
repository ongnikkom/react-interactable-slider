/**
 * Computes the required width and margins for each slide in the slider
 * @param {*} param0
 * @param {*} index
 * @param {*} length
 */
function getSliderPortPropsByIndex(
  { cellAlign, marginGapsPerSlide, fullWidthPerSlide, sliderWidth, widthPerSlide },
  index,
  length
) {
  if (fullWidthPerSlide) return { width: sliderWidth, margin: 0 };

  const gaps = `${marginGapsPerSlide}px`;
  const margins = [`0 ${gaps}`, `0 ${gaps} 0 0`, `0 0 0 ${gaps}`];
  const isLeft = cellAlign === 'left';
  const obj = { width: widthPerSlide };

  switch (index) {
    case 0:
      return { ...obj, margin: margins[isLeft ? 1 : 2] };
    case length - 1:
      return { ...obj, margin: margins[isLeft ? 2 : 1] };
    default:
      return { ...obj, margin: margins[0] };
  }
}

export default getSliderPortPropsByIndex;
