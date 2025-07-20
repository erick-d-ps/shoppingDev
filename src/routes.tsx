import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Notfound } from "./pages/notfound";
import { Detail } from "./pages/detail";

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
        path: "*",
        element: <Notfound/>
      },
    
    ],
  },
]);

export { Router };
