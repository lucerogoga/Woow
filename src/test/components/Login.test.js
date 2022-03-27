import React from "react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Login from "../../Components/Login";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// !--------Solicitar explicacion de este mock si esta bien o no?
const mockedLogin = jest.fn();

jest.mock("../../Components/Context/AuthContext", () => ({
  useAuth: () => ({
    login: mockedLogin,
    user: "useruid",
  }),
}));

const testEmailValid = "waiter@gamail.com";
const testEmailInvalid = "badformatcom";
const testPasswordValid = "12345678";
function fillLoginFormWithValidData(email, password) {
  const inputEmail = screen.getByPlaceholderText("User email");
  const inputPassword = screen.getByPlaceholderText("User password");

  fireEvent.change(inputEmail, { target: { value: email } });
  fireEvent.change(inputPassword, { target: { value: password } });
}

describe("Login", () => {
  test("render content from Login Component", async () => {
    const { getByPlaceholderText } = render(<Login />);

    fillLoginFormWithValidData(testEmailValid, testPasswordValid);
    expect(screen.getByDisplayValue(testEmailValid)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testPasswordValid)).toBeInTheDocument();

    const button = screen.getByText("Login");

    user.click(button);

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledTimes(1);
    });
  });

  test("render content from Login Component 2", async () => {
    const { getByPlaceholderText } = render(<Login />);

    fillLoginFormWithValidData(testEmailInvalid, testPasswordValid);

    expect(screen.getByDisplayValue(testEmailInvalid)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testPasswordValid)).toBeInTheDocument();

    const button = screen.getByText("Login");

    user.click(button);

    expect(
      await screen.findByRole("heading", {
        name: /Please enter your email addres in format yourname@example.com/i,
      })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledTimes(0);
    });
  });

  test.only("error", async () => {
    mockedLogin.mockRejectedValueOnce(
      new Error("Firebase: Error (auth/user-not-found).")
    );
    render(<Login />);
    fillLoginFormWithValidData(testEmailValid, testPasswordValid);

    const button = screen.getByText("Login");
    user.click(button);

    expect(
      await screen.findByRole("heading", {
        name: /User not found./i,
      })
    ).toBeInTheDocument();
  });

  test("show error when form is not complete", async () => {
    render(<Login />);
    const button = screen.getByText("Login");
    user.click(button);

    expect(
      await screen.findByRole("heading", {
        name: /fields must be filled/i,
      })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledTimes(0);
    });
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
