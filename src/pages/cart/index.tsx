import { Link } from "react-router-dom";
import { FiTrash2, FiTrash, FiCheck, FiShoppingBag } from "react-icons/fi";
import { shoppingContext } from "../../context";
import { useContext } from "react";
import { type ProductProps } from "../home";

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  amount: number;
  total: number;
}

export function Cart() {
  const { 
    cart, 
    addItemcart, 
    remuvItemCart, 
    deletItemCard, 
    cartAmount,
    totalFrete,
    totalGeral,
    cleanCart,
    finishedCart 
  } = useContext(shoppingContext);

  function handleAddMore(item: CardProps) {
    const product: ProductProps = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
      categori: "",
    };
    addItemcart(product);
  }
  function handhleDecreaseItem(item: CardProps) {
    const product: ProductProps = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
      categori: "",
    };
    remuvItemCart(product);
  }
  function handhleRemuvItem(item: CardProps) {
    const product: ProductProps = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
      categori: "",
    };
    deletItemCard(product);
  }

  return (
    <main className="w-full">
      <div className="w-full flex flex-col max-w-6xl gap-2 mt-30 px-4 mx-auto">
        {cart.length > 0 &&
          cart.map((item) => (
            <section
              key={item.id}
              className="w-full bg-white px-4 py-4 flex flex-row rounded-xl items-center justify-around"
            >
              <div className="flex flex-col items-center gap-2">
                <img className="w-20 h-20" src={item.image} alt={item.title} />
                <strong>R${item.price}</strong>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button
                  className="w-5 h-5 flex items-center justify-center rounded-xs bg-blue-500 text-white"
                  onClick={() => handleAddMore(item)}
                >
                  +
                </button>
                <p>{item.amount}</p>
                <button
                  className="w-5 h-5 flex items-center justify-center rounded-xs bg-blue-500 text-white"
                  onClick={() => handhleDecreaseItem(item)}
                >
                  -
                </button>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5">
                <button
                  onClick={() => handhleRemuvItem(item)}
                  className="w-7 bg-blue-500 px-1 py-1 flex items-center justify-center rounded-sm"
                >
                  <FiTrash2 size={20} color="#fff" />
                </button>
                <div className="flex flex-col items-center justify-center w-30 h-15 bg-gray-200 rounded-md ">
                  <strong>Valor total:</strong>
                  <p>R${item.total}</p>
                </div>
              </div>
            </section>
          ))}
        {cart.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <h1 className="font-medium flex gap-1">
              Você ainda não itens no carrinho!{" "}
              <Link to="/">
                <span className="text-indigo-500 flex gap-1">
                  Vamos as compras <FiShoppingBag color="#121212" size={24} />
                </span>
              </Link>
            </h1>
          </div>
        )}
        {cart.length > 0 && (
          <div className="w-full min-h-20 bg-white rounded-xl mt-10">
            <div className="flex flex-col gap-2 mt-2 items-center ">
              <h1 className="text-2xl font-bold">Total do carrinho</h1>
              <div className="flex gap-1.5">
                <strong>Quatidade de itens:</strong>
                <p>{cartAmount}</p>
              </div>
              <div className="flex gap-1.5">
                <strong>Valor Total:</strong>
                <p>{totalGeral.toLocaleString("pt-BR", {style: "currency", currency: "BRL" })}</p>
              </div>
              <div className="flex gap-1.5">
                <strong>Frete:</strong>
                <p>R$ 60.00</p>
              </div>
              <div className="flex gap-1.5 ">
                <strong>Total com frete:</strong>
                <p>{totalFrete.toLocaleString("pt-BR", {style: "currency", currency: "BRL" })}</p>
              </div>
              <button 
                onClick={finishedCart}
                className="w-4/5 h-10 flex items-center justify-center gap-2 rounded-2xl bg-blue-500 my-2 font-bold text-white ">
                <FiCheck size={24} color="#fff" />
                Finalizar compra
              </button>
              <button 
                onClick={cleanCart}
                className="w-4/5 h-10 flex items-center justify-center gap-2 rounded-2xl bg-red-500 mb-4 font-bold text-white ">
                <FiTrash size={24} color="#fff" />
                Limpar carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
