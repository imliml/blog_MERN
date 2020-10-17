import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";
import Signup from "./layout/auth/Signup";
import Login from "./layout/auth/Login";
import Alert from "./layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";

import { Provider } from "react-redux";
import store from "./store";

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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
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
