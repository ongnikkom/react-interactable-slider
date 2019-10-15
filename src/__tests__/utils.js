/**
 * This method checks if the provided obj is a valid React element
 * @param {Object} obj Object returned by React.createElement method
 */
export const isReactElement = obj => 
  (obj['$$typeof']).toString() === Symbol('react.element').toString()
