import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "../Components/PrivateRoute/Index.jsx";
import NotFound from "../Pages/404/Index.jsx";
import Home from "../Pages/Home/Index.jsx";
import LandingPage from "../Pages/LandingPage/Index.jsx";
import Login from "../Pages/Login/Login.jsx";
import DetailProfile from "../Pages/Profile/DetailProfile.jsx";
import EditProfile from "../Pages/Profile/EditProfile.jsx";
import AddRecipe from "../Pages/Recipes/AddRecipes.jsx";
import DetailRecipe from "../Pages/Recipes/DetailRecipes.jsx";
import UpdateRecipe from "../Pages/Recipes/UpdateRecipes.jsx";
import Register from "../Pages/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/add_Recipe",
    element: (
      <PrivateRoute>
        <AddRecipe />
      </PrivateRoute>
    ),
  },
  {
    path: "/detail_profile",
    element: (
      <PrivateRoute>
        <DetailProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/update_recipe/:menuId",
    element: <UpdateRecipe />,
  },
  {
    path: "/detail_recipe/:menuId",
    element: <DetailRecipe />,
  },
  {
    path: "/edit_profile/:userId",
    element: <EditProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
