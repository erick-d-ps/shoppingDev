import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart,} from "lucide-react";

import { signOut } from "firebase/auth"
import { auth } from "../../services/firebase/firebaseConection"

import { shoppingContext } from "../../context/";

import { FiLogOut } from "react-icons/fi";

export function Header() {
  const { cartAmount, loadingAuth, signed} = useContext(shoppingContext);
  const [isMenuOpen, setIsMenuOpen,] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className="w-full px-1 bg-slate-100 z-50 fixed top-0 shadow-md">
      <nav className="w-full max-w-6xl h-20 flex items-center justify-between px-5 mx-auto relative">
        <div className="flex items-center gap-12 flex-shrink-0">
          <div>
            <Link className="text-2xl font-bold text-purple-700" to={"/"}>
              ShoppingDev
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-full right-0 w-full md:w-auto bg-slate-100 md:bg-transparent p-5 md:p-0 space-y-4 md:space-y-0 md:space-x-4 items-center z-10 rounded-b-lg md:rounded-none`}
          >
            <div className=" w-full md:w-auto lg:w-40 h-10 flex justify-center items-center px-4 py-1 rounded-2xl bg-white hover:bg-purple-700 hover:text-white transition-all duration-300 transform hover:scale-105">
              {!loadingAuth && signed ? (
                <Link
                  className=" font-medium flex items-center"
                  to={"/dashboard"}
                  onClick={closeMenu}
                >
                  Minhas compras
                </Link>
              ) : (
                <Link
                  className=" font-medium flex items-center"
                  to={"/login"}
                  onClick={closeMenu}
                >
                  Fazer login
                </Link>
              )}
            </div>
          </div>

          {!loadingAuth && signed ? (
            <div className="relative w-8 sm:w-full h-10 flex justify-center items-center px-1 py-1 mx-2 rounded-2xl bg-white hover:bg-purple-700 hover:text-white transition-all duration-300 transform hover:scale-105">
              <Link
                className="text-base font-medium flex items-center"
                to={"/cart"}
                onClick={closeMenu}
              >
                <ShoppingCart size={24} />
                {cartAmount > 0 && (
                  <span className="absolute -right-2 -top-2 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex justify-center items-center text-white text-xs font-bold">
                    {cartAmount}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
          {!loadingAuth && signed && (
            <div>
              <button 
                className="mx-2"
                onClick={handleLogout}
              >
                <FiLogOut size={24} color="#ef4444" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
