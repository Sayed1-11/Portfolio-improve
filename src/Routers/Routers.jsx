import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../Layout/HomeLayout";
import About from "../Components/About";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout/>,
    },
  ]);

