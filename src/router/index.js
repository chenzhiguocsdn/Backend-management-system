import * as React from "react";
import { createBrowserRouter,Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mall from "../pages/mall";
import User from "../pages/user";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";
import Login from "../pages/login";
import Register from "../pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element:<Navigate to="/home" replace={true} />
          },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "mall",
        element: <Mall />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "other",
        children: [
            {
                path: "pageOne",
                element: <PageOne />, 
            },
            {
                path: "pageTwo",
                element: <PageTwo />, 
            }
        ]
      },
    ],
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
]);
export default router;
