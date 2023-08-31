import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ExampleContext from "../ExampleContext";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogOut() {
    appDispatch({ type: "logOut" });
    /*
    localStorage.removeItem("complexAppToken");
    localStorage.removeItem("complexAppUsername");
    localStorage.removeItem("complexAppAvatar");
    */
  }

  return (
    <>
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} alt="User Avatar" />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </>
  );
}

export default HeaderLoggedIn;
