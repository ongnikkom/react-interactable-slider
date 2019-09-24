import { useEffect, useState } from 'react';

function getVisibility() {
  if (typeof document === 'undefined') return true;
  return document.visibilityState;
}

function useDocumentVisibility() {
  let [documentVisibility, setDocumentVisibility] = useState(getVisibility());

  function handleVisibilityChange() {
    setDocumentVisibility(getVisibility());
  }

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return documentVisibility;
}

export default useDocumentVisibility;
