import { React } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Homepage";
import Contact from "./components/Contact";
import Adminpage from "./components/Adminpage";
import AdminQueryview from "./components/AdminQueryview";
import Userpage from "./components/StudentComponents/UserProfile";
import Complaints from "./components/StudentComponents/Complaints";
import Fine from "./components/StudentComponents/Fine";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminFineView from "./components/AdminFineView";

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
