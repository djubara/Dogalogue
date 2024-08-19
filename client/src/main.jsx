import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import DogFeed from "./pages/DogFeed.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import PetsPage from "./pages/PetsPage.jsx";
import PetPage from "./pages/PetPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DogFeed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/:id",
        element: <UserProfilePage />,
      },
      {
        path: "/pets",
        element: <PetsPage />,
      },
      {
        path: "/pets/:petId",
        element: <PetPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
