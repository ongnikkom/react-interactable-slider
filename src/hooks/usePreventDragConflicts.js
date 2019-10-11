import { useCallback } from 'react';
import usePreventEvtOutside from './usePreventEvtOutside';

const elementsToPrevent = ['a', 'img'];

/**
 * This will ensure that it will prevent the
 * normal behaviour dragging of images and links
 * inside the slider container
 * @param {*} ref
 */
function usePreventDragConflicts(ref) {
  const handler = useCallback(
    e => {
      const { target } = e;
      elementsToPrevent.indexOf(target.tagName.toLowerCase()) > -1 && e.preventDefault();
    },
    [ref]
  );

  usePreventEvtOutside(ref.current, 'dragstart', handler);
}

export default usePreventDragConflicts;
