let lastId = 0;

function useId(prefix = 'id') {
  lastId++;
  return `${prefix}-${lastId}`;
}

export default useId;
