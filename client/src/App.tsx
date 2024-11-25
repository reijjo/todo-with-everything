import { Layout } from "./components/common/layout/Layout";
import { Errorpage } from "./components/error-page/Errorpage";
import { Homepage } from "./components/homepage/Homepage";
import { NotFound } from "./components/not-found/NotFound";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <Errorpage />,
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export const App = () => (
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
);
