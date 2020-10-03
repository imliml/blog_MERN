import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";
import Signup from "./layout/auth/Signup";
import Login from "./layout/auth/Login";

import {Provider} from 'react-redux';
import store from "./store"

import "./App.css";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/register" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    // <div>
    //   <Navbar />
    //   <Landing />
    //   <Footer />
    // </div>
  );
}

export default App;
