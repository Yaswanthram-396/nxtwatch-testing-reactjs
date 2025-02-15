import "./index.css";
import { FaMoon, FaSun } from "react-icons/fa";
import ConfigurationContext from "../../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom
import { Panel } from "../Sidebar";
import Cookies from "js-cookie";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { mode, handleMode } = useContext(ConfigurationContext);
  const [showpop, setpop] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  const handleSet = () => {
    handleMode();
  };
  const handleRemove = () => {
    Cookies.remove("jwt_token");
    navigate("/");
  };
  const [StateStyle, setStateStyle] = useState({ display: "none" });

  const handleProfile = () => {
    setStateStyle({
      display: "block",
      position: "absolute",
      zIndex: 2,
      top: "0",
      left: "0",
      backgroundColor: !mode ? "#fff" : "#000",
    });
  };
  return (
    <>
      {showpop ? (
        <div className="entirePop">
          <div
            className="poper"
            style={{
              position: "fixed",
              zIndex: "999",
              height: "200px",
              width: "32%",
              top: "40%",
              left: "36%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: !mode ? "#fff" : "rgb(33,33,33)",
              borderRadius: "10px",
            }}
          >
            <h3>Are you sure you want to logout?</h3>
            <div className="pop-btn">
              <button className="Cancel-btn" onClick={() => setpop(false)}>
                Cancel
              </button>
              <button className="Confirm-btn" onClick={handleRemove}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <nav>
        <Link to="/NxtWatch/Home">
          {mode ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="darkmodelogo"
              className="logoNavbar"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="lightmodelogo"
              className="logoNavbar"
            />
          )}
        </Link>
        <Panel props={StateStyle} setting={setStateStyle} />
        <div className="navbarList">
          <li onClick={handleSet}>
            {mode ? (
              <FaSun
                data-testid="darkMode"
                className="lightModeIcon"
                title="Sun Icon"
              />
            ) : (
              <FaMoon
                className="darkMoon"
                data-testid="lightMode"
                title="Moon Icon"
              />
            )}
          </li>
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="logo"
              className="poffile"
            />
            <FaBars
              className="logoutSVG"
              style={{ fontSize: "24px" }}
              onClick={handleProfile}
            />
          </li>
          <button
            className={`logoutBtn ${mode ? "num" : null}`}
            onClick={() => setpop(true)}
          >
            Log out
          </button>
          <FaSignOutAlt
            className="logoutSVG"
            style={{ fontSize: "24px" }}
            title="logout"
            onClick={() => setpop(true)}
          />
        </div>
      </nav>
    </>
  );
};
export default Navbar;
