import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Gaming from "./index";
import ConfigurationContext from "../context";

describe("Gaming Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            videos: [
              {
                id: "b214dc8a-b126-4d15-8523-d37404318347",
                thumbnail_url:
                  "https://assets.ccbp.in/frontend/react-js/nxt-watch/drop-stack-ball-img.png",
                title: "Drop Stack Ball",
                view_count: "44K",
              },
            ],
          }),
      })
    );
  });

  test("renders Gaming text and applies theme mode correctly", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{ mode: false }}>
          <Gaming />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Gaming")).toBeInTheDocument();

    let container = screen.getByTestId("Gaming-mode");
    expect(container).toHaveStyle({ backgroundColor: "rgb(241,241,241)" });

    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{ mode: true }}>
          <Gaming />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    container = screen.getByTestId("Gaming-mode");
    expect(container).toHaveStyle({ backgroundColor: "rgb(24,24,24)" });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Drop Stack Ball")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/44K/i)).toBeInTheDocument();
    });
  });

  test("renders gaming-videos container after data loads", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{ mode: false }}>
          <Gaming />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    // Wait for data to be fetched
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    const gamingVideosContainer = screen.getByTestId("gaming-videos");
    expect(gamingVideosContainer).toBeInTheDocument();

    // Check light mode style
    expect(gamingVideosContainer).toHaveStyle({
      backgroundColor: "rgb(255,255,255)",
    });
  });

  test("applies dark mode styles to gaming-videos correctly", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{ mode: true }}>
          <Gaming />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("gaming-videos")).toBeInTheDocument();
    });

    expect(screen.getByTestId("gaming-videos")).toHaveStyle({
      backgroundColor: "rgb(0,0,0)",
    });
  });

  test("handle API error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{ mode: false }}>
          <Gaming />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again!")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("gaming-videos")).not.toBeInTheDocument();
    });
  });
});
