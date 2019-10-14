import { renderHook, act } from '@testing-library/react-hooks';
import usePropsToState from "../../hooks/usePropsToState";
import { mockInternalProps, mockComponentProps } from '../__mocks__/mockProps';

test('usePropsToState', () => {
  // INITIAL RENDER
  const { result, rerender } = renderHook(usePropsToState, { initialProps: mockComponentProps });
  expect(result.current[0]).toEqual(Object.assign({}, mockInternalProps, mockComponentProps));

  // Changing one of the properties in the props
  rerender({ ...mockComponentProps, cellAlign: 'right'});
  expect(result.current[0]).toEqual(Object.assign({}, mockInternalProps, mockComponentProps, { cellAlign: 'right' }));

  // Firing 'setState' funtion
  act(() => result.current[1]({ ...mockComponentProps, marginGapsPerSlide: 8 }));
  expect(result.current[0]).toEqual(Object.assign({}, mockInternalProps, mockComponentProps, { marginGapsPerSlide: 8 }));
});
