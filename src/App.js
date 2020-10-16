import axios from "axios";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LoginSignup from "./auth/LoginSignup";
import SingUpYup from "./auth/SingUpYup";
import Header from "./common/Header";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
// import Profile from "./page/Profile";
import ProfilePage from "./page/ProfilePage";

// axios.defaults.baseURL = 'http://localhost:3500/api';
function App() {
  return (
    <div>
      {/* <LoginSignup /> */}
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              let token = localStorage.getItem("token");
              if (token !== null) {
                return <Home />;
              } else return <LoginSignup />;
            }}
          />
          <Route path="/loginSignup" component={LoginSignup} />
          <Route path="/signUp" component={SingUpYup} />
          {/* <Route path="/profile" component={Profile} /> */}
          <Route path="/profile" component={ProfilePage} />
          <Route path="/header" component={Header} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
