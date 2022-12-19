import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RoomChat from "./components/RoomChat";
import AuthProvider from "./components/Context/AuthProvider";
import AppProvider from "./components/Context/AppProvider";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <RoomChat />
              </Route>
            </Switch>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
