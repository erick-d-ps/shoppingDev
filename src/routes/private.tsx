import { type ReactNode, useContext } from "react";
import { shoppingContext } from "../context";
import { FiLoader } from "react-icons/fi";
import { Navigate } from "react-router-dom";

interface PrivatProp {
  children: ReactNode;
}

export function Private({ children }: PrivatProp): any {
  const { loadingAuth, signed } = useContext(shoppingContext);

  if (loadingAuth) {
    return (
      <div className="w-full h-screen">
        <div className="flex justify-center items-center">
          <FiLoader 
          className="animate-spin"
          size={55} 
          color="#121212"/>
        </div>
      </div>
    );
  }

  if(!signed){
    return <Navigate to="/login" />
  }

  return children;
}
