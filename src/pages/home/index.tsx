import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { FiShoppingCart } from 'react-icons/fi'

interface ProductPrps {
  id: number;
  title: string;
  price: number;
  description: string;
  categori: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function Home() {
  const [product, setProduct] = useState<ProductPrps[]>([]);

  useEffect(() => {
    async function addProducts() {
      const res = await api.get("/products");
      setProduct(res.data);
    }
    addProducts();
  }, []);

  return (
    <div className="w-full">
      <main className="w-full max-w-6xl mt-10 px-4 mx-auto">
        <h1 className="text-2xl flex items-center justify-center font-bold w-full mb-5 ">
          Produtos em alta
        </h1>
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
                <strong className="absolute bottom-1 left-2">R$ {item.price}</strong>
                <button className="fixe absolute bottom-1 right-2">
                  <FiShoppingCart
                    size={25}
                    color="#7f24ac"
                  />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
