import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import SidePanel, { Panel } from "./index";
import ConfigurationContext from "../../context";

describe("SidePanel", () => {
  test("Navigates to all pages in sidebar by clicking the links", async () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <ConfigurationContext.Provider
          value={{ pagein: "Home", handlePage: () => {} }}
        >
          <SidePanel />
        </ConfigurationContext.Provider>
      </HistoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-sidebar"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Home");
    });

    fireEvent.click(screen.getByTestId("home-trending"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Trending");
    });

    fireEvent.click(screen.getByTestId("home-gaming"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Gaming");
    });

    fireEvent.click(screen.getByTestId("home-saved"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Saved");
    });
  });
  test("Navigates to all pages in panel in mobile by clicking the links", async () => {
    const history = createMemoryHistory();
    const mockSetting = jest.fn();
    render(
      <HistoryRouter history={history}>
        <ConfigurationContext.Provider
          value={{ pagein: "Home", handlePage: () => {} }}
        >
          <Panel props={{}} setting={mockSetting} />
        </ConfigurationContext.Provider>
      </HistoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-panel"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Home");
    });

    fireEvent.click(screen.getByTestId("home-trending-panel"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Trending");
    });

    fireEvent.click(screen.getByTestId("home-gaming-panel"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Gaming");
    });

    fireEvent.click(screen.getByTestId("home-saved-panel"));
    await waitFor(() => {
      expect(history.location.pathname).toBe("/NxtWatch/Saved");
    });
  });
});
