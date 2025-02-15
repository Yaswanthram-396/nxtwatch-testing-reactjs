import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index"; // Import your LoginPage component
import Cookies from "js-cookie";
import VideosInHome from "./index";
import ConfigurationContext from "../../../context";
// import { json } from "react-router-dom";

// Mock window.location to prevent actual navigation
delete window.location;
window.location = { href: "" };

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

Cookies.get.mockImplementation(() => "mocked_jwt_token");

describe("Render the sidebar in home in the sidebarSidecontext render", () => {
  // beforeEach(() => {

  //   });

  test("rendering the login component", () => {
    render(<VideosInHome />);
    expect(
      screen.getByText("Buy Nxt Watch Premium prepaid plans with UPI")
    ).toBeInTheDocument();
  });
  test("When clicking the banner, the banner should close", () => {
    render(<VideosInHome />);
    const closebtn = screen.getByTestId("close-icon");
    fireEvent.click(closebtn);
    expect(
      screen.queryByText("Buy Nxt Watch Premium prepaid plans with UPI")
    ).not.toBeInTheDocument();
  });
  test("to check the mode is getting applied (light mode)", () => {
    const { rerender } = render(
      <ConfigurationContext.Provider value={{ mode: false }}>
        <VideosInHome />
      </ConfigurationContext.Provider>
    );
    const sidebar = screen.getByTestId("sidebar-content");
    expect(sidebar).toHaveStyle({ backgroundColor: "white" });
    rerender(
      <ConfigurationContext.Provider value={{ mode: true }}>
        <VideosInHome />
      </ConfigurationContext.Provider>
    );
    // const sidebar = screen.getByTestId("sidebar-content");
    expect(sidebar).toHaveStyle({ backgroundColor: "black" });
  });
  test("Testing Videos", () => {
    render(<VideosInHome />);
    expect(screen.getByTestId("api-response")).toBeInTheDocument();
  });
});
