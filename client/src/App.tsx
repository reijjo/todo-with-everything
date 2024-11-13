import { NotFound } from "./components/not-found/NotFound";
import { Homepage } from "./components/homepage/Homepage";
import { Layout } from "./components/common/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
