// React 18 dengan createRoot
import React from "react";
import ReactDOM from "react-dom/client"; // Import dari react-dom/client
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Gunakan createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
