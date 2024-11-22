// import { NotFound } from "./components/not-found/NotFound";
import { Layout } from "./components/common/layout/Layout";
import { Errorpage } from "./components/error-page/Errorpage";
import { Homepage } from "./components/homepage/Homepage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      // {
      //   path: "*",
      //   element: <NotFound />,
      // },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
