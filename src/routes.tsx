import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Notfound } from "./pages/notfound";

const Router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Notfound/>
      }
    ],
  },
]);

export { Router };
