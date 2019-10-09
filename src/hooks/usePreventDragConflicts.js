import { useCallback } from 'react';
import useEventListener from './useEventListener';

const elementsToPrevent = ['a', 'img'];

/**
 * This will ensure that it will prevent the
 * normal behaviour dragging of images and links
 * inside the slider container
 * @param {*} ref
 */
function usePreventDragConflicts(ref) {
  const handleDragInside = useCallback(
    e => {
      const { target } = e;
      if (ref.current && ref.current.contains(target)) {
        elementsToPrevent.indexOf(target.tagName.toLowerCase()) && e.preventDefault();
      }
    },
    [ref]
  );

  useEventListener('dragstart', handleDragInside);
}

export default usePreventDragConflicts;
