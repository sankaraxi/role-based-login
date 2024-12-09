import { createBrowserRouter, Outlet } from "react-router-dom"
import Login from "./components/Login"
import RegisterUser from "./components/RegisterUser"
import NormalAdmin from "./components/NormalAdmin"
import Courses from "./components/Courses"
import SuperAdmin from "./components/SuperAdmin"
import OverallAdmin from "./components/OverallAdmin"

const App = () => {
    return (
        <div className="">
          <Outlet />
        </div>
    )
  }

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterUser />,
      },
      {
        path: "/admin",
        element: <NormalAdmin />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/superadmin",
        element: <SuperAdmin />,
      },
      {
        path: "/mainadmin",
        element: <OverallAdmin />,
      }
    ] 
  }
])