function useLogger(value, groupName = '') {
  if (!groupName) console.log(value);

  console.groupCollapsed(groupName);
  console.log(value);
  console.groupEnd();
}

export default useLogger;
