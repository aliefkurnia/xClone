import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import Communities from "./components/Communities";
import PostDetail from "./components/PostDetail";
import UserProfile from "./components/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import AuthRedirect from "./components/AuthRedirect";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<AuthRedirect />} />
        <Route path="/login/sso-callback" element={<AuthenticateWithRedirectCallback redirectUrl="/home" afterSignInUrl="/home" afterSignUpUrl="/home" />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
        <Route path="/communities" element={<PrivateRoute><Communities /></PrivateRoute>} />
        <Route path="/grok" element={<PrivateRoute><Explore /></PrivateRoute>} />
        <Route path="/premium" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/post/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        <Route path="/:username" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
