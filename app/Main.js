import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8080";

// My Components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import About from "./components/About";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexAppToken"),

      avatar: localStorage.getItem("complexAppAvatar"),
      username: localStorage.getItem("ComplexAppUsername"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "logIn":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      // ...
      case "logOut":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexAppToken", state.user.token);
      localStorage.setItem("complexAppUsername", state.user.username);
      localStorage.setItem("complexAppAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("complexAppToken");
      localStorage.removeItem("complexAppUsername");
      localStorage.removeItem("complexAppAvatar");
    }
  }, [state.loggedIn]);

  function addFlashMessage(msg) {
    dispatch({ type: "flashMessage", value: msg });
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
