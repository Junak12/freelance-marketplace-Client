import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import Root from './pages/Root/Root.jsx';
import Home from './pages/Home/Home.jsx';
import "./index.css";
import AllJob from './pages/AllJob/AllJob.jsx';
import ViewDetails from './pages/ViewDetails/ViewDetails.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    Component:Root,
    children : [
      {
        index:true,
        Component:Home,
      },
      {
        path:'/AllJob',
        Component:AllJob,
      },
      {
        path:'/jobs/:id',
        Component: ViewDetails,
      },
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
