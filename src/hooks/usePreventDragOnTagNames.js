import useEventListener from './useEventListener';

/**
 * Prevent conflicts when dragging through
 * specified tag names
 * @param {*} e
 */
function handler(e) {
  const {
    target: { tagName }
  } = e;

  const name = tagName.toLowerCase();

  this.indexOf(name) > -1 && e.preventDefault();
}

/**
 * usePreventDragOnElements hook
 */
const usePreventDragOnElements = (tagNames = []) =>
  useEventListener('dragstart', handler.bind(tagNames));

export default usePreventDragOnElements;
