import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '../css/app.css';
import './echo';

const root = createRoot(document.getElementById("app")!);

window.CHAT_CHANNEL = window.Echo.join(`chat`)

root.render( <App />);

