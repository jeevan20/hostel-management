import { React } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Homepage";
import Contact from "./Components/Contact";
import Adminpage from "./Components/Adminpage";
import AdminQueryview from "./Components/AdminQueryview";
import Userpage from "./Components/StudentComponents/UserProfile";
import Complaints from "./Components/StudentComponents/Complaints";
import Fine from "./Components/StudentComponents/Fine";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminFineView from "./Components/AdminFineView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/admin/student-details",
    element: <Adminpage />,
  },
  {
    path: "/admin/compliants",
    element: <AdminQueryview />,
  },
  {
    path: "/admin/fine",
    element: <AdminFineView />,
  },

  {
    path: "/contact",
    element: <Contact />,
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
    path: "/user",
    element: <Userpage />,
  },
  {
    path: "/Complaints",
    element: <Complaints />,
  },
  {
    path: "/Fine",
    element: <Fine />,
  },
]);
const App = () => {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
