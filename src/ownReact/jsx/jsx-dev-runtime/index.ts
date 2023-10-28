import { nanoid } from "nanoid";
import { jsx as _jsx } from "react/jsx-runtime";

export class InvalidChildError extends Error {}

export function jsxDEV(...args) {
  const element = _jsx(...args);

  if (typeof element?.props?.children === "string") {
    return {
      ...element,
      props: {
        ...element.props,
        children: [
          {
            type: "TEXT ELEMENT",
            props: {
              nodeValue: element.props.children
            },
            __id: nanoid(),
          }
        ],
      },
      __id: nanoid(),
    };
  }


  return {
    ...element,
    __id: nanoid(),
  };
}