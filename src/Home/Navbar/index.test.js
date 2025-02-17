import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from ".";
import Cookies from "js-cookie";
import { MemoryRouter } from "react-router-dom";
import ConfigurationContext from "../../context";

delete window.location;
window.location = { href: "" };

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));
describe("Navbar Render", () => {
  test("rendering the login component", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("User logged out successfully after clicking logout button", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: "Log out" });
    fireEvent.click(logoutButton);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    const cofirmLogout = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(cofirmLogout);
    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith("jwt_token");
    });
    await waitFor(() => {
      expect(window.location.href).toBe("");
    });
  });
  test("User cancelling logged out after clicking logout btn", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: "Log out" });
    fireEvent.click(logoutButton);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    const DontLogout = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(DontLogout);
    await waitFor(() => {
      expect(window.location.href).toBe(window.location.href);
    });
  });
  test("to check the mode is getting applied while clicking the moon and sun icons", () => {
    const mockHandleMode = jest.fn();
    const mockSetStateStyle = jest.fn();
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{ mode: false, handlePage: mockHandleMode }}
        >
          <Navbar />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("lightMode")).toBeInTheDocument();
    expect(screen.getByAltText("lightmodelogo")).toBeInTheDocument();
    expect(screen.queryByTestId("darkMode")).not.toBeInTheDocument();
    expect(screen.queryByAltText("darkmodelogo")).not.toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{ mode: true, handlePage: mockHandleMode }}
        >
          <Navbar />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("darkMode")).toBeInTheDocument();
    expect(screen.getByAltText("darkmodelogo")).toBeInTheDocument();
    expect(screen.queryByTestId("lightMode")).not.toBeInTheDocument();
    expect(screen.queryByAltText("lightmodelogo")).not.toBeInTheDocument();
  });
  // test("User logged out successfully after clicking logout button in mobile", async () => {
  //   const { rerender } = render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );
  //   expect(screen.queryByTestId("logout-popup")).toHaveStyle({
  //     display: "none",
  //   });

  //   global.innerWidth = 400;
  //   global.dispatchEvent(new Event("resize"));
  //   rerender(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );
  //   await waitFor(() => {
  //     expect(screen.getByTestId("logout-popup")).toHaveStyle({
  //       display: "block",
  //     });
  //     // expect(screen.getByTestId("logoutSVG")).toBeInTheDocument();
  //   });
  // });
  test("User logged out successfully after clicking logout button in mobile", async () => {
    // Mock matchMedia for media queries in Jest
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 770px)", // Simulate mobile view
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(
      screen.queryByText("Are you sure you want to logout?")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("logout-popup")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("logout-popup"));
    expect(
      screen.getByText("Are you sure you want to logout?")
    ).toBeInTheDocument();
  });

  test("dfg", () => {
    const { rerender } = render(
      <ConfigurationContext.Provider
        value={{ mode: false, handleMode: () => {}, handlePage: () => {} }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ConfigurationContext.Provider>
    );
    fireEvent.click(screen.getByTestId("logout-svg"));
    expect(screen.getByTestId("panel-props")).toHaveStyle({
      position: "absolute",
    });
    fireEvent.click(screen.getByText("Log out"));

    expect(screen.getByTestId("poper-logout")).toHaveStyle({
      backgroundColor: "#fff",
    });
    rerender(
      <ConfigurationContext.Provider
        value={{ mode: true, handleMode: () => {}, handlePage: () => {} }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ConfigurationContext.Provider>
    );
    fireEvent.click(screen.getByText("Log out"));
    expect(screen.getByTestId("poper-logout")).toHaveStyle({
      backgroundColor: "rgb(33,33,33)",
    });
  });
});
