import { Link } from "react-router-dom";
import { Input } from "../../components/input";

export function Login() {
  return (
    <main className="w-full h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex-shrink-0">
          <Link className="text-3xl font-bold text-purple-700 mb-4" to={"/"}>
            ShoppingDev
          </Link>
        </div>
        <form className=" flex flex-col w-full items-center justify-center max-w-xl bg-white mt-5 p-2 rounded-md">
          <div className="w-full">
            <Input/>
          </div>
        </form>
      </div>
    </main>
  );
}
