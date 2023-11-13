import { Navigate, createBrowserRouter } from "react-router-dom";
import Activities from "../pages/Activities";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Comments from "../pages/Comments";

export const router = createBrowserRouter( [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts/:id",
      element: <Posts />,
    },
    {
      path: "/activities/:id",
      element: <Activities />,
    },
    {
      path: "/comments/:id",
      element: <Comments />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
);