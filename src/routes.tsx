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

import { Private } from "./routes/private"

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
        element: <Private><Cart/></Private>
      },
      {
        path: "/dashboard",
        element: <Private><Deshboard/></Private>
      },
      {
        path: "/dashboard/buy/:id",
        element: <Private><Buy/></Private>
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
