import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useSlider from "../../hooks/useSlider";
import usePropsToState from "../../hooks/usePropsToState";
import { mockComponentProps } from "../__mocks__/mockProps";
import { isReactElement } from '../utils';

test("returns `render` value", () => {
  const mockProps = {
    ...mockComponentProps,
    children: [...Array(1).keys()].map((slide, index) =>
      React.createElement("div", { key: index }, slide)
    )
  };
  const {
    result: { current: usePropsToStateReturnValue }
  } = renderHook(usePropsToState, { initialProps: mockProps });

  const { result: { current } } = renderHook(useSlider, {
    initialProps: usePropsToStateReturnValue
  });

  const reactElementObject = current[0][0];

  // Test if it's an object
  expect(typeof reactElementObject).toBe('object');

  // Test if it's not an empty object
  expect(Object.keys(reactElementObject).length).toBeGreaterThan(0);

  // Test if it's a valid react element
  expect(isReactElement(reactElementObject)).toBeTruthy();
});
