import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Title from "../../Components/Title";

test("render content from Title Component", () => {
  const title = "Title";
  const qty = 3;

  const { getByTestId } = render(<Title title={title} quantity={qty} />);

  const text = screen.getByTestId("title-text");
  expect(text).toHaveTextContent(title);
});
