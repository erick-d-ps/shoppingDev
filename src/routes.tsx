import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Notfound } from "./pages/notfound";
import { Detail } from "./pages/detail";
import { Cart } from "./pages/cart"
import { Deshboard } from "./pages/dashboard"
import { Buy } from "./pages/buy"

import { Login } from "./pages/login"
import { Register } from "./pages/register"

const Router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element:<Detail/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/dashboard",
        element: <Deshboard/>
      },
      {
        path: "/dashboard/buy/:id",
        element: <Buy/>
      },
      {
        path: "*",
        element: <Notfound/>
      },
    
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

export { Router };
