import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const { values, dispatch } = useContext(AuthContext);

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg font-roboto ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
          >
            The GYM Room
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            //  onClick="toggleNavbar('example-collapse-navbar')"
          >
            <i className="text-white fas fa-bars" />
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none hidden"
          id="example-collapse-navbar"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <Link
                to="/"
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/pricing"
              >
                {" "}
                Pricing{" "}
              </Link>
            </li>

            {values?.user?.token ? (
              <>
                <Link
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/account"
                >
                  Account
                </Link>
                <Link
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/classes"
                >
                  Classes
                </Link>

                {values?.user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  >
                    Admin
                  </Link>
                )}

                <li
                  className="flex items-center lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 text-xs uppercase font-bold cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </>
            ) : (
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/login"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
