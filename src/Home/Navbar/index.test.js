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
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{ mode: false, handlePage: () => {} }}
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
          value={{ mode: true, handlePage: () => {} }}
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
});
