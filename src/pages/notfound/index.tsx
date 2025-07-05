import { Link } from "react-router-dom";


export function Notfound() {
  return (
    <div>
      <h1>Pafina não encontrada</h1>
      <Link to={"/"}>
      Ir para página Home
      </Link>
    </div>
  );
}
