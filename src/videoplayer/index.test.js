import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VideoPlayer from "./index";
import ConfigurationContext from "../context";

const mockContextValue = {
  handleSavedList: jest.fn(),
  mode: false,
};
describe("VideoPlayer", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            video_details: {
              id: "video1",
              title: "Sample Video",
              video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              view_count: "1M",
              published_at: "2 days ago",
              channel: {
                profile_image_url: "https://test.com/profile.jpg",
                name: "Test Channel",
                subscriber_count: "500K",
              },
              description: "This is a test video description.",
            },
          }),
      });
    });
  });
  test("checks if video elements exist", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={mockContextValue}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );

    await expect(screen.getByText("Like")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Like"));

    await expect(screen.getByText("Dislike")).toBeInTheDocument();
    await expect(screen.getByText("Save")).toBeInTheDocument();

    await screen.findByTestId("channel-profile-image");

    await screen.findByTestId("channel-name");
    await screen.findByTestId("video-description");
    await screen.findByTestId("view-count");
  });
  test("checks if video details of elements added", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={mockContextValue}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
    expect(await screen.findByText("Sample Video")).toBeInTheDocument();
    expect(await screen.findByText("Test Channel")).toBeInTheDocument();
    expect(await screen.findByText("1M views")).toBeInTheDocument();
    expect(await screen.findByText("2 days ago")).toBeInTheDocument();
    expect(
      await screen.findByText("This is a test video description.")
    ).toBeInTheDocument();
  });
});
