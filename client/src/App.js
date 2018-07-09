import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reduxStore";
import Navbar from "./components/layouts/Navbar";
import HeroSection from "./components/layouts/Hero";
import Footer from "./components/layouts/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import "./App.css";

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
