/**
 * Reset position of the interactable view depending on x position
*/
export const resetPosition = (view, x = 0) => view.current.changePosition({ x, y: 0 })