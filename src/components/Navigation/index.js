import React, { cloneElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Context from '../../context';
import { arrow, dotsContainer, dot } from './styles';
import Arrow from './components/Arrow';

function Navigation() {
  const {
    propsToState: [state]
  } = useContext(Context);

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
      leftArrow: {
        disabled: leftArrowDisabled,
        onClick: leftArrowClickHandler
      },
      rightArrow: {
        disabled: rightArrowDisabled,
        onClick: rightArrowClickHandler
      }
    };
  }, [cellAlign, currentSnapPoint, snapPoints]);

  /**
   * Create a default or a custom arrows defined by the user
   */
  const createArrows = useCallback(() => {
    const { leftArrow, rightArrow } = getArrowsData();

    if (customArrows) {
      const { left, right } = customArrows;

      const clonedLeftArrow = cloneElement(left, {
        navigationType,
        disabled: leftArrow.disabled
      });

      const clonedRightArrow = cloneElement(right, {
        navigationType,
        disabled: rightArrow.disabled
      });

      return (
        <>
          <Arrow className="custom-left-arrow" onClick={leftArrow.onClick}>
            {clonedLeftArrow}
          </Arrow>

          <Arrow className="custom-right-arrow" onClick={rightArrow.onClick}>
            {clonedRightArrow}
          </Arrow>
        </>
      );
    } else {
      const hasBothNav = navigationType === 'both';
      const leftArrowCx = arrow('left', hasBothNav, leftArrow.disabled);
      const rightArrowCx = arrow('right', hasBothNav, rightArrow.disabled);

      return (
        <>
          <Arrow className={leftArrowCx} onClick={leftArrow.onClick} />
          <Arrow className={rightArrowCx} onClick={rightArrow.onClick} />
        </>
      );
    }
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

  const arrows = useMemo(() => {
    if (snapPoints.length < 1) return null;

    switch (navigationType) {
      case 'arrows':
        return createArrows();
      case 'both':
        return (
          <>
            {createArrows()}
            {createDots()}
          </>
        );
      case 'dots':
        return createDots();
      default:
        return null;
    }
  }, [cellAlign, currentSnapPoint, customArrows, navigationType, snapPoints]);

  return arrows;
}

export default Navigation;
