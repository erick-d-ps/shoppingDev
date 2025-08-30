import { Link } from "react-router-dom";
import { useContext } from "react";
import { shoppingContext } from "../../context";

export function Deshboard() {
  const { cartFinished } = useContext(shoppingContext);

  return (
    <main className="w-full">
      <div className="w-full flex flex-col max-w-6xl mt-30 px-4 mx-auto">
        <h1 className="w-full text-center my-4 text-2xl font-bold">
          Minhas ultimas compras
        </h1>
        {cartFinished.map((item) => (
          <section
            key={item.id}
            className="w-full flex items-center justify-center flex-col my-4"
          >
            <div className="w-10/12 flex flex-col bg-white rounded px-2 py-2">
              <div className="flex w-full items-center justify-center gap-2 my-2">
                <strong>Compra finalizada no dia:</strong>
                <p>{item.date.toLocaleDateString("pt-br")}</p>
              </div>
              <div className="w-full flex flex-col md:flex-row md:gap-6 items-center justify-center my-2">
                <div className="flex gap-2">
                  <strong>Quantidades de itens:</strong>
                  <p>{item.items.length}</p>
                </div>
                <div className="flex gap-2">
                  <strong>Valor final da compra:</strong>
                  <p>
                    {item.total.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="w-10/12 h-11 bg-purple-500 text-white font-bold rounded-2xl my-2">
                  <Link to={`/dashboard/buy/${item.id}`}>Ver compra</Link>
                </button>
              </div>
            </div>
          </section>
        ))}

        {cartFinished.length < 1 && (
          <div className="w-full">
            <h2 className=" w-full flex items-center justify-center text-xl font-medium mt-12">
              Você ainda não tem nenhum histórico de compras :( 
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
