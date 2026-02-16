import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import Root from './pages/Root/Root.jsx';
import Home from './pages/Home/Home.jsx';
import "./index.css";

const router = createBrowserRouter([
  {
    path:"/",
    Component:Root,
    children : [
      {
        index:true,
        Component:Home,
      },

    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
