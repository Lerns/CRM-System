import { createBrowserRouter } from "react-router-dom";
import { TodoListPage } from "../pages/TodoListPage/TodoListPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TodoListPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
