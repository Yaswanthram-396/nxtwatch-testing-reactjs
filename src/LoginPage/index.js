import "./index.css";
import Cookies from "js-cookie";
import React from "react";
import ConfigurationContext from "../context";

class LoginPage extends React.Component {
  static contextType = ConfigurationContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPass: false,
      error: false,
    };
  }

  // navigate = useNavigate();

  handleChangeUsername = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  };

  handleChangePassword = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  handleShowPass = () => {
    const { showPass } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      showPass: !showPass,
    }));
  };

  handleSubmit = async () => {
    const { username, password, error } = this.state;
    try {
      const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      console.log(response);
      if (!response.ok) {
        console.log("try");
        this.setState((prevState) => ({
          ...prevState,
          error: !error,
        }));
        return;
      }

      const data = await response.json();
      const token = data.jwt_token;
      console.log(token);
      Cookies.set("jwt_token", token, { expires: 0.1 });

      console.log("Login successful! Token stored.");

      window.location.href = "/NxtWatch/Home";
    } catch (error) {
      console.log("There was a problem with the login request:", error);
      this.setState((prevState) => ({
        ...prevState,
        error: !error,
      }));
    }
  };
  render() {
    const { username, password, showPass, error } = this.state;
    return (
      <>
        <div className="nxwLogin">
          <div className="loginField">
            <div className="logoImageCon">
              {!this.context.mode ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                  className="logoImage"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="logo"
                  className="logoImage"
                />
              )}
            </div>
            <div className="loginInputFildsBtn">
              <div className="inputsWithbtn">
                <div className="inputs">
                  <div className="usernameCon">
                    <p className="usernameHeading">USERNAME</p>
                    <input
                      onChange={this.handleChangeUsername}
                      placeholder="Username"
                      className="userInput"
                      value={username}
                    />
                  </div>
                  <div className="passwordCon">
                    <p className="usernameHeading">PASSWORD</p>
                    <input
                      onChange={this.handleChangePassword}
                      placeholder="Password"
                      className="userInput"
                      type={showPass ? "text" : "password"}
                      value={password}
                    />
                  </div>
                </div>
                <form>
                  <input type="checkbox" onClick={this.handleShowPass} />
                  <label>Show password</label>
                </form>
              </div>
              <div className="btnCon">
                <button
                  type="button"
                  className="loginButton"
                  onClick={this.handleSubmit}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </button>
                {error && (
                  <p className="error">*Username or Password didn't match</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPage;
