import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '../css/app.css';
import './echo';

import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()

const root = createRoot(document.getElementById("app")!);
root.render( <App />);

