import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";
import Signup from "./layout/auth/Signup";
import Login from "./layout/auth/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>

    // <div>
    //   <Navbar />
    //   <Landing />
    //   <Footer />
    // </div>
  );
}

export default App;
