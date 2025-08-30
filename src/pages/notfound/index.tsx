import { Link } from "react-router-dom";

export function Notfound() {
  return (
    <main className="w-full  ">
      <div className="w-full max-w-6xl  flex items-center justify-center px-5 mx-auto mt-30 gap-1">
        <h1 className="font-mediun text-lg">Pagina não encontrada</h1>
        <Link className="text-lg hover:text-blue-600 text-purple-900" to={"/"}>Ir para página Home</Link>
      </div>
    </main>
  );
}
