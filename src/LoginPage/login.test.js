import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index"; // Import your LoginPage component
import Cookies from "js-cookie";
// import { json } from "react-router-dom";

// Mock window.location to prevent actual navigation
delete window.location;
window.location = { href: "" };

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("LoginPgeRender", () => {
  test("rendering the login component", () => {
    render(<LoginPage />);
    const getUsername = screen.getByPlaceholderText("Username");
    const getPassword = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(getUsername).toBeInTheDocument();
    expect(getPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test("changing userName and password", () => {
    render(<LoginPage />);
    const getUsername = screen.getByPlaceholderText("Username");
    const getPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(getUsername, { target: { value: "rahul" } });
    fireEvent.change(getPassword, { target: { value: "rahul@2021" } });
    expect(getUsername.value).toBe("rahul");
    expect(getPassword.value).toBe("rahul@2021");
  });
  test("Check show password click", () => {
    render(<LoginPage />);
    const getPassword = screen.getByPlaceholderText("Password");
    const showpassText = screen.getByRole("checkbox");

    expect(getPassword.type).toBe("password");
    fireEvent.click(showpassText);
    expect(getPassword.type).toBe("text");
    fireEvent.click(showpassText);
    expect(getPassword.type).toBe("password");
  });
  test("showing an ERROR mesage when user mismatched", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: Promise.resolve({}),
      })
    );
    render(<LoginPage />);
    const getUsername = screen.getByPlaceholderText("Username");
    const getPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(getUsername, { target: { value: "test" } });
    fireEvent.change(getPassword, { target: { value: "testpass" } });
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("*Username or Password didn't match")
      ).toBeInTheDocument();
    });
  });
  test("User logged in successfully after clicking login button", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ jwt_token: "wtoken" }), // Ensure correct mock response
      })
    );

    render(<LoginPage />);
    const getUsername = screen.getByPlaceholderText("Username");
    const getPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(getUsername, { target: { value: "test" } });
    fireEvent.change(getPassword, { target: { value: "test@2021" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "wtoken", {
        expires: 0.1,
      });
    });

    await waitFor(() => {
      expect(window.location.href).toBe("/NxtWatch/Home");
    });
  });
});
