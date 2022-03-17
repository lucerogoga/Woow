import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../Components/Login";
import { authContext, AuthProvider, useAuth} from "../../Components/Context/AuthContext";


// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login", () => {
  test("render content from Title Component", () => {
   
    const { getByPlaceholderText } = render(<Login />);

    const inputEmail = screen.getByPlaceholderText("User email");
    const inputPassword = screen.getByPlaceholderText("User password");

    fireEvent.change(inputEmail, { target: { value: "waiter@gamail.com" } });
    fireEvent.change(inputPassword, { target: { value: "123456" } });

    expect(screen.getByDisplayValue("waiter@gamail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123456")).toBeInTheDocument();

    // -----------
    const wrapper = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    const input = wrapper.find('input')

    input.simulate('change')
      // expect(wrapper.find('input'))
      
    //   screen.getByText(title);
    // const text = screen.getByTestId("title-text");
    //   expect(view.container).toHaveTextContent();
    //   expect(view.container).toHaveTextContent();
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
