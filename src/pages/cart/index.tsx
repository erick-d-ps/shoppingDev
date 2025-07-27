import imagem from "../../../public/vite.svg";
import { FiTrash2, FiTrash, FiCheck } from "react-icons/fi"

export function Cart() {
  return (
    <main className="w-full">
      <div className="w-full flex flex-col max-w-6xl gap-2 mt-10 px-4 mx-auto">
        <section className="w-full bg-white px-4 py-4 flex flex-row rounded-xl items-center justify-around">
          <div className="flex flex-col items-center gap-2">
            <img className="w-30 h-20" src={imagem} alt="imagem do produto" />
            <strong>R$100.00</strong>
          </div>
          <div className="flex flex-row items-center gap-4">
            <button className="w-5 h-5 flex items-center justify-center rounded-xs bg-blue-500 text-white">
              +
            </button>
            <p>4</p>
            <button className="w-5 h-5 flex items-center justify-center rounded-xs bg-blue-500 text-white">
              -
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <button className="w-7 bg-blue-500 px-1 py-1 flex items-center justify-center rounded-sm">
                <FiTrash2 size={20} color="#fff" />
            </button>
            <div className="flex flex-col items-center justify-center w-30 h-15 bg-gray-200 rounded-md ">
                <strong>Valor total:</strong>
                <p>R$400.00</p>
            </div>
          </div>
        </section>
        <div className="w-full min-h-20 bg-white rounded-xl mt-10">
           <div className="flex flex-col gap-2 mt-2 items-center ">
            <h1 className="text-2xl font-bold">Total do carrinho</h1>
            <div className="flex gap-1.5">
               <strong>Quatidade de itens:</strong>
               <p>4</p>
            </div>
            <div className="flex gap-1.5">
               <strong>Valor Total:</strong>
               <p>R$ 400.00</p>
            </div>
            <div className="flex gap-1.5">
               <strong>Frete:</strong>
               <p>R$ 60.00</p>
            </div>
            <div className="flex gap-1.5 ">
               <strong>Total com frete:</strong>
               <p>R$ 460.00</p>
            </div>
            <button className="w-4/5 h-10 flex items-center justify-center gap-2 rounded-2xl bg-blue-500 my-2 font-bold text-white ">
                <FiCheck size={24} color="#fff"/>
                Finalizar compra
            </button>
            <button className="w-4/5 h-10 flex items-center justify-center gap-2 rounded-2xl bg-red-500 mb-4 font-bold text-white ">
                <FiTrash size={24} color="#fff"/>
                Limpar carrinho
            </button>
           </div>
        </div>
      </div>
    </main>
  );
}
