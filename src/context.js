import React, { useMemo, useContext } from 'react';

const Context = React.createContext({});

export const AppProvider = ({ state, setState, userProps, ...rest }) => {
  /**
   * Create an object for our propsToState and userProps
   * so we can be able to check difference easily
   */
  const contextValue = useMemo(
    () => ({
      propsToState: [state, setState],
      userProps,
    }),
    [state, setState, userProps]
  );

  return <Context.Provider value={contextValue} {...rest} />;
};

const useAppContext = () => useContext(Context);

export default useAppContext;
