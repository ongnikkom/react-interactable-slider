import React, { cloneElement, useCallback, useMemo } from 'react';
import useAppContext from '../../context';
import { arrow, dotsContainer, dot } from './styles';
import Arrow from './components/Arrow';

const arrows = ['left', 'right'];
function generateArrows(arrowProps, callback) {
  arrows.forEach(arrow => callback(arrow));
  return Object.keys(arrowProps).map(side => <Arrow key={side} {...arrowProps[side]} />);
}

function Navigation() {
  const {
    propsToState: [state],
  } = useAppContext();

  const { cellAlign, currentSnapPoint, customArrows, navigationType, snapPoints, view } = state;

  const snapTo = useCallback(index => view.current.snapTo({ index }), [view]);

  /**
   * Get the required props for both left
   * and right arrows
   *
   * We need to use the opposite function depending
   * on the cell alignment.
   */
  const getArrowsData = useCallback(() => {
    const isLeft = cellAlign === 'left';

    const navLeft = () =>
      currentSnapPoint !== snapPoints.length - 1 && snapTo(currentSnapPoint + 1);

    const navRight = () => currentSnapPoint !== 0 && snapTo(currentSnapPoint - 1);

    const leftDisabled = currentSnapPoint === snapPoints.length - 1;
    const rightDisabled = currentSnapPoint < 1;

    const leftArrowClickHandler = isLeft ? navRight : navLeft;
    const leftArrowDisabled = isLeft ? rightDisabled : leftDisabled;

    const rightArrowClickHandler = isLeft ? navLeft : navRight;
    const rightArrowDisabled = isLeft ? leftDisabled : rightDisabled;

    return {
      left: {
        disabled: leftArrowDisabled,
        onClick: leftArrowClickHandler,
      },
      right: {
        disabled: rightArrowDisabled,
        onClick: rightArrowClickHandler,
      },
    };
  }, [cellAlign, currentSnapPoint, snapPoints]);

  /**
   * Create a default or a custom arrows defined by the user
   */
  const createArrows = useCallback(() => {
    const arrowProps = { ...getArrowsData() };

    return customArrows
      ? generateArrows(arrowProps, side => {
          const $CustomArrow = customArrows[side];
          const currArrow = arrowProps[side];
          if ($CustomArrow) {
            currArrow.className = `custom-${side}-arrow`;
            currArrow.children = cloneElement($CustomArrow, {
              navigationType,
              disabled: currArrow.disabled,
            });
          }
        })
      : generateArrows(arrowProps, side => {
          const currArrow = arrowProps[side];
          currArrow.className = arrow(side, navigationType === 'both', currArrow.disabled);
        });
  }, [cellAlign, currentSnapPoint, customArrows, navigationType, snapPoints]);

  /**
   * OnClick handler for the dots navigation
   */
  const onDotClick = useCallback(
    e => {
      const { target } = e;
      const index = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
      if (currentSnapPoint !== index) snapTo(index);
    },
    [currentSnapPoint, view]
  );

  const createDots = useCallback(() => {
    const selectedDot = currentSnapPoint;

    return (
      <div className={dotsContainer(cellAlign)}>
        {snapPoints.map((v, i) => {
          return <div className={dot(i === selectedDot)} key={i} onClick={onDotClick} />;
        })}
      </div>
    );
  }, [currentSnapPoint, snapPoints]);

  const navigations = useMemo(
    () => ({
      arrows: createArrows(),
      dots: createDots(),
      both: (
        <>
          {createArrows()}
          {createDots()}
        </>
      ),
    }),
    [createArrows, createDots]
  );

  return navigations[navigationType] || null; // [null]: in case of unexpected `navigationType`
}

export default Navigation;
