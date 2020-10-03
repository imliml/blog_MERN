import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";
import Signup from "./layout/auth/Signup";
import Login from "./layout/auth/Login";
import Alert from "./layout/Alert"

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
            <section className="container">
                <Alert />
                <Switch>
                  <Route exact path="/register" component={Signup} />
                  <Route exact path="/login" component={Login} />
                </Switch>
            </section>
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
