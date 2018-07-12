import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reduxStore";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layouts/Navbar";
import HeroSection from "./components/layouts/Hero";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import Footer from "./components/layouts/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import "./App.css";

// check for jwt token on every page refresh
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // store user data or info in the localStorage
  store.dispatch(setCurrentUser(decoded));

  // check for expired tokens
  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime) {
    // logout the user
    store.dispatch(logoutUser());

    // redirect user to login page
    window.location.href = '/Login'
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={HeroSection} />
            <div className="container">
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
