import React from "react";
import "./index.css";
import { FaTimes } from "react-icons/fa";
import GetApiRes from "../videosAnSearch";
import ConfigurationContext from "../../../context";
class VideosInHome extends React.Component {
  static contextType = ConfigurationContext;
  constructor(props) {
    super(props);
    this.state = { banner: true };
  }
  darkMode = {
    backgroundColor: "white",
  };
  light = {
    backgroundColor: "black",
  };
  handleCloseBanner = () => {
    const { banner } = this.state;
    this.setState({ banner: !banner });
  };
  render() {
    const { banner } = this.state;
    return (
      <div
        className="sidebarSideContent"
        style={!this.context.mode ? this.darkMode : this.light}
        data-testid="sidebar-content"
      >
        {banner && (
          <div className="SideContentbanner">
            <div className="innerContainer">
              <div className="adContent">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                  className="logoNavbar"
                />
                <p style={{ color: "#000" }}>
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button className="AdBtn">GET IT NOW</button>
              </div>

              <FaTimes
                data-testid="close-icon"
                className="closeIcon"
                alt="Close"
                style={{ color: "#000" }}
                onClick={this.handleCloseBanner}
              />
            </div>
          </div>
        )}
        <GetApiRes />
      </div>
    );
  }
}
export default VideosInHome;
