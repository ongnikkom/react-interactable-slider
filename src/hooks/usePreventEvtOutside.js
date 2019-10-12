import { useCallback, useEffect, useRef } from 'react';
import useEventListener from './useEventListener';

function usePreventEvtOuside(element, evtName, cb) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = cb;
  }, [cb, element]);

  const handler = useCallback(
    e => {
      const { target } = e;
      if (element && element.contains(target)) cb(e);
    },
    [cb, element]
  );

  useEventListener(evtName, handler);
}

export default usePreventEvtOuside;
