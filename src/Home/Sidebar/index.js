import "./index.css";
import { FaHome, FaGamepad, FaFire } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import ConfigurationContext from "../../context";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export function Panel({ props, setting }) {
  //      <=---------    mobile devices    ---------=>
  const { mode, handlePage, pagein } = useContext(ConfigurationContext);
  const darkMode = { color: "white" };
  const light = { color: "black" };
  const location = useLocation();

  // useEffect(() => {
  //   const savedPage = localStorage.getItem("pagein");
  //   if (savedPage) {
  //     handlePage(savedPage);
  //   }
  // }, [handlePage]);
  useEffect(() => {
    const currentPath = location;
    const num = currentPath.pathname.split("/").pop();
    handlePage(num);
  }, []);
  const Num = (word) => {
    handlePage(word);
    setting({ display: "none" });
  };

  return (
    <div className="sidePanel" style={props}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "end", paddingRight: "5%", paddingTop: "3%" }}>
          <FaTimes
            className="closeIcon"
            onClick={() => setting({ display: "none" })}
          />
        </div>
        <div className="entireside">
          <div className="sidePanelOptionsContainer">
            <Link to="/NxtWatch/Home">
              <div
                className={`sidePanelOptions ${
                  pagein === "Home" ? (mode ? "Clicked" : "lightClick") : null
                }`}
                onClick={() => Num("Home")}
              >
                <FaHome
                  title="Home Icon"
                  className={
                    pagein === "Home"
                      ? "iconStyle"
                      : !mode
                      ? "DarkIcon"
                      : "whiteIcon"
                  }
                />
                <h4 style={mode ? darkMode : light} data-testid="home-panel">
                  Home
                </h4>
              </div>
            </Link>
            <Link to="/NxtWatch/Trending">
              <div
                className={`sidePanelOptions ${
                  pagein === "Trending"
                    ? mode
                      ? "Clicked"
                      : "lightClick"
                    : null
                }`}
                onClick={() => Num("Trending")}
              >
                <FaFire
                  title="Trending Icon"
                  className={
                    pagein === "Trending"
                      ? "iconStyle"
                      : !mode
                      ? "DarkIcon"
                      : "whiteIcon"
                  }
                />
                <h4
                  style={mode ? darkMode : light}
                  data-testid="home-trending-panel"
                >
                  Trending
                </h4>
              </div>
            </Link>
            <Link to="/NxtWatch/Gaming">
              <div
                className={`sidePanelOptions ${
                  pagein === "Gaming" ? (mode ? "Clicked" : "lightClick") : null
                }`}
                onClick={() => Num("Gaming")}
              >
                <FaGamepad
                  title="Gaming Icon"
                  className={
                    pagein === "Gaming"
                      ? "iconStyle"
                      : !mode
                      ? "DarkIcon"
                      : "whiteIcon"
                  }
                />
                <h4
                  style={mode ? darkMode : light}
                  data-testid="home-gaming-panel"
                >
                  Gaming
                </h4>
              </div>
            </Link>
            <Link to="/NxtWatch/Saved">
              <div
                className={`sidePanelOptions ${
                  pagein === "Saved" ? (mode ? "Clicked" : "lightClick") : null
                }`}
                onClick={() => Num("Saved")}
              >
                <MdVideoLibrary
                  title="Saved Videos Icon"
                  className={
                    pagein === "Saved"
                      ? "iconStyle"
                      : !mode
                      ? "DarkIcon"
                      : "whiteIcon"
                  }
                />
                <h4
                  style={mode ? darkMode : light}
                  data-testid="home-saved-panel"
                >
                  Saved videos
                </h4>
              </div>
            </Link>
          </div>
          <div className="sidePanelFooter">
            <h2 style={mode ? darkMode : light}>CONTACT US</h2>
            <div className="iconsContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                className="icon"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                alt="twitter logo"
                className="icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="icon"
              />
            </div>
            <p style={mode ? darkMode : light}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidePanel({ Num }) {
  //      <=---------    Laptop devices    ---------=>
  const { mode, handlePage, pagein } = useContext(ConfigurationContext);
  const darkMode = { color: "white" };
  const light = { color: "black" };
  const location = useLocation();

  useEffect(() => {
    const currentPath = location;
    const num = currentPath.pathname.split("/").pop();
    handlePage(num);
  }, []);

  return (
    <div className="contentWithPanel">
      <div className="sidePanel">
        <div className="sidePanelOptionsContainer">
          <Link to="/NxtWatch/Home">
            <div
              className={`sidePanelOptions ${
                pagein === "Home" ? (mode ? "Clicked" : "lightClick") : null
              }`}
              onClick={() => handlePage("Home")}
            >
              <FaHome
                title="Home Icon"
                className={
                  pagein === "Home"
                    ? "iconStyle"
                    : !mode
                    ? "DarkIcon"
                    : "whiteIcon"
                }
              />
              <Link to="/NxtWatch/Home">
                <h4 style={mode ? darkMode : light} data-testid="home-sidebar">
                  Home
                </h4>
              </Link>
            </div>
          </Link>
          <Link to="/NxtWatch/Trending">
            <div
              className={`sidePanelOptions ${
                pagein === "Trending" ? (mode ? "Clicked" : "lightClick") : null
              }`}
              onClick={() => handlePage("Trending")}
            >
              <FaFire
                title="Trending Icon"
                className={
                  pagein === "Trending"
                    ? "iconStyle"
                    : !mode
                    ? "DarkIcon"
                    : "whiteIcon"
                }
              />
              <h4 style={mode ? darkMode : light} data-testid="home-trending">
                Trending
              </h4>
            </div>
          </Link>
          <Link to="/NxtWatch/Gaming">
            <div
              className={`sidePanelOptions ${
                pagein === "Gaming" ? (mode ? "Clicked" : "lightClick") : null
              }`}
              onClick={() => handlePage("Gaming")}
            >
              <FaGamepad
                title="Gaming Icon"
                className={
                  pagein === "Gaming"
                    ? "iconStyle"
                    : !mode
                    ? "DarkIcon"
                    : "whiteIcon"
                }
              />
              <h4 style={mode ? darkMode : light} data-testid="home-gaming">
                Gaming
              </h4>
            </div>
          </Link>
          <Link to="/NxtWatch/Saved">
            <div
              className={`sidePanelOptions ${
                pagein === "Saved" ? (mode ? "Clicked" : "lightClick") : null
              }`}
              onClick={() => handlePage("Saved")}
            >
              <MdVideoLibrary
                title="Saved Videos Icon"
                className={
                  pagein === "Saved"
                    ? "iconStyle"
                    : !mode
                    ? "DarkIcon"
                    : "whiteIcon"
                }
              />
              <h4 style={mode ? darkMode : light} data-testid="home-saved">
                Saved videos
              </h4>
            </div>
          </Link>
        </div>
        <div className="sidePanelFooter">
          <h2 style={mode ? darkMode : light}>CONTACT US</h2>
          <div className="iconsContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              className="icon"
              alt="facebook logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
              alt="twitter logo"
              className="icon"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="icon"
            />
          </div>
          <p style={mode ? darkMode : light}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
      {Num}
    </div>
  );
}

export default SidePanel;
