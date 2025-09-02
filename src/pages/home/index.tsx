import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import { shoppingContext } from "../../context";
import { Search } from "lucide-react";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  categori: string;
  image: string;
}

export function Home() {
  const { addItemcart, signed, loadingAuth } = useContext(shoppingContext);
  const [product, setProduct] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function addProducts() {
      const res = await api.get("/products");
      setProduct(res.data);
    }
    addProducts();
  }, []);

  function handleAttItemCart(item: ProductProps) {
    addItemcart(item);
  }

  return (
    <div className="w-full">
      <main className="w-full max-w-6xl mt-30 px-4 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-2xl flex items-center justify-center font-bold w-full mb-5 ">
              Produtos em alta
            </h1>
          </div>
          <div className="flex items-center w-full max-w-md relative">
            <input
              className="px-4 py-2 w-full outline-none bg-white rounded-2xl pr-10 text-sm"
              placeholder="Digite o nome do produto"
              type="text"
            />
            <Search
              size={20}
              color="#000000"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="grid p-5 gap-6 grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
          {product.map((item) => (
            <section
              key={item.id}
              className=" h-56 bg-white rounded-xl relative"
            >
              <div className="w-full flex flex-col items-center justify-center">
                <strong>{item.title}</strong>
                <Link to={`/detail/${item.id}`}>
                  <img
                    className="max-h-30 max-w-40 py-2 object-center flex justify-center items-center"
                    src={item.image}
                    alt={item.title}
                  />
                </Link>
                <strong className="absolute bottom-1 left-2">
                  R$ {item.price}
                </strong>
                {!loadingAuth && signed ? (
                  <button
                    className="fixe absolute bottom-1 right-2"
                    onClick={() => handleAttItemCart(item)}
                  >
                    <FiShoppingCart size={25} color="#7f24ac" />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
