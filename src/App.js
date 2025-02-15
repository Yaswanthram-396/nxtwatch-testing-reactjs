import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import VideosInHome from "../src/Home/Sidebar/sidebarSideContent";
import VideoPlayer from "./videoplayer";
import Trending from "./Trending";
import Gaming from "./Gaming";
import { useState, useEffect } from "react";
import ConfigurationContext from "./context";
import Saved from "./saved";
import Cookies from "js-cookie";

export default function App() {
  const navigate = useNavigate();

  const [mode, SetMode] = useState(false);

  const [pagein, setPage] = useState("Home");
  const [savedList, setSavedList] = useState(() => {
    const savedItems = localStorage.getItem("savedList");
    try {
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (e) {
      console.error("Error parsing savedList:", e);
      return [];
    }
  });
  useEffect(() => {
    const cookieToken = Cookies.get("jwt_token");
    console.log();
    if (!cookieToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleSavedList = (newItem) => {
    console.log(savedList);
    const isAlreadySaved = savedList.some((item) => item.id === newItem.id);

    if (!isAlreadySaved) {
      const updatedList = [...savedList, newItem];
      setSavedList(updatedList);
      localStorage.setItem("savedList", JSON.stringify(updatedList));
    } else {
      const updatedList = savedList.filter((item) => item.id !== newItem.id);
      setSavedList(updatedList);
      localStorage.setItem("savedList", JSON.stringify(updatedList));
      console.log("Item removed from the saved list.");
    }
  };

  const handleMode = () => {
    SetMode((prevMode) => {
      return !prevMode;
    });
  };
  const handlePage = (newItem) => {
    localStorage.setItem("pagein", newItem);
    setPage(newItem);
  };

  return (
    <ConfigurationContext.Provider
      value={{
        savedList,
        mode,
        pagein,
        handleSavedList,
        handleMode,
        handlePage,
      }}
    >
      <div className={`App ${mode ? "dark-mode" : "light-mode"}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/NxtWatch/Home"
            element={<Home Num={<VideosInHome />} />}
          />
          <Route path="/video/:id" element={<Home Num={<VideoPlayer />} />} />
          <Route
            path="/NxtWatch/Trending"
            element={<Home Num={<Trending />} />}
          />
          <Route path="/NxtWatch/Gaming" element={<Home Num={<Gaming />} />} />
          <Route path="/NxtWatch/Saved" element={<Home Num={<Saved />} />} />
        </Routes>
      </div>
    </ConfigurationContext.Provider>
  );
}
