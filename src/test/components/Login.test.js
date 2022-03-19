import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../Components/Login";
import {
  AuthProvider,
  AuthContext,
  useAuth,
} from "../../Components/Context/AuthContext";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// !--------Solicitar explicacion de este mock si esta bien o no?
jest.mock("../../Components/Context/AuthContext", () => ({
  useAuth: () => ({
    login: () => true,
    user: "useruid",
  }),
}));

describe("Login", () => {
  test("render content from Login Component", () => {
    const { getByPlaceholderText } = render(<Login />);

    const inputEmail = screen.getByPlaceholderText("User email");
    const inputPassword = screen.getByPlaceholderText("User password");

    fireEvent.change(inputEmail, { target: { value: "waiter@gamail.com" } });
    fireEvent.change(inputPassword, { target: { value: "123456" } });

    expect(screen.getByDisplayValue("waiter@gamail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123456")).toBeInTheDocument();

    // -----------
    // const wrapper = render(
    //   <AuthProvider>
    //     <Login />
    //   </AuthProvider>
    // )
    
    // const input = wrapper.find('input')
    
    // input.simulate('change')
    // -----------


      // expect(wrapper.find('input'))
      
    //   screen.getByText(title);
    // const text = screen.getByTestId("title-text");
    //   expect(view.container).toHaveTextContent();
    //   expect(view.container).toHaveTextContent();
  });

  test("render button Login from Login Component", () => {
    const { getByText } = render(<Login />);

    const button = screen.getByText("Login");

    fireEvent.click(button);

    // expect(button).toBeCalled('handleSubmit');
  });
});


// test('component handles button click', () => {
//     const {getByText} = render(
//       <MyComponent />
//     )
//     const button = getByText('Click me')
//     fireEvent.click(button)
//     expect...?
//   }
