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
import Login from './pages/Login/Login.jsx';
import AddJob from './pages/AddJob/AddJob.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import MyAcceptedTask from './pages/MyAcceptedTask/MyAcceptedTask.jsx';
import MyAddedTask from './pages/MyAddedTask/MyAddedTask.jsx';
import UpdateJob from './components/UpdateJob/UpdateJob.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/AllJob",
        Component: AllJob,
      },
      {
        path: "/jobs/:id",
        Component: ViewDetails,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/addjobs",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-accepted-task",
        element: (
          <PrivateRoute>
            <MyAcceptedTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-jobs",
        element: (
          <PrivateRoute>
            <MyAddedTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-jobs/:id",
        element:<PrivateRoute>
          <UpdateJob/>
        </PrivateRoute>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
