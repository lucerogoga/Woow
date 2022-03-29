import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Cart from "../../Components/Cart";

jest.mock("../../Components/Context/AuthContext", () => ({
  useAuth: () => ({
    login: () => true,
    user: "useruid",
  }),
}));

jest.mock("../../Components/Context/CartContext", () => ({
  useCart: () => ({
    cart: [],
    setCart: [],
  }),
}));

describe("Cart", () => {
  test("render content from Login Component", () => {
    const mockedHandleGoCart = jest.fn();
    const { getByPlaceholderText } = render(
      <Cart handleGoCart={mockedHandleGoCart} />
    );
  });
});
