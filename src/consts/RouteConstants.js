import RequireNoAuth from "../hooks/RequireNoAuth";
import RequireAuth from "../hooks/RequireAuth";
import RequireAdmin from "../hooks/RequireAdmin";
import Account from "../pages/Auth/Account";
import Login from "../pages/Auth/Login";
import PageNotFound from "../pages/Error/PageNotFound";
import Home from "../pages/Home/Home";
import Pricing from "../pages/Pricing/Pricing";
import Classes from "../pages/Classes/Classes";
import Admin from "../pages/Admin/Admin";
import ViewClass from "../pages/Classes/ViewClass";

export const PATHS = {
  root: "/",
  login: "/login",
  account: "/account",
  pricing: "/pricing",
  classes: "/classes",
  class: "/classes/:id",
  admin: "/admin",
  matchAll: "*",
};

export const ROUTES = [
  {
    title: "Home",
    path: PATHS.root,
    description: "Home page",
    element: <Home />,
  },
  {
    title: "Login",
    path: PATHS.login,
    description: "Login page",
    element: (
      <RequireNoAuth>
        <Login />
      </RequireNoAuth>
    ),
  },
  {
    title: "Account",
    path: PATHS.account,
    description: "Account page",
    element: (
      <RequireAuth>
        <Account />
      </RequireAuth>
    ),
  },
  {
    title: "Classes",
    path: PATHS.classes,
    description: "Class page",
    element: (
      <RequireAuth>
        <Classes />
      </RequireAuth>
    ),
  },
  {
    title: "Class",
    path: PATHS.class,
    description: "View Class page",
    element: (
      <RequireAuth>
        <ViewClass />
      </RequireAuth>
    ),
  },
  {
    title: "Admin screen",
    path: PATHS.admin,
    description: "Admin page",
    element: (
      <RequireAdmin>
        <Admin />
      </RequireAdmin>
    ),
  },
  {
    title: "Pricing",
    path: PATHS.pricing,
    description: "Pricing page",
    element: <Pricing />,
  },
  {
    title: "Page Not Found",
    path: PATHS.matchAll,
    description: "Pricing page",
    element: <PageNotFound />,
  },
];
