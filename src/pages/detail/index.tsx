import { useParams, useNavigate, Link } from "react-router-dom";

import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { FiShoppingCart } from "react-icons/fi";
import { type ProductProps } from "../home";
import { shoppingContext } from "../../context";

interface IdProdutoPrps {
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

export function Detail() {
  const navigate = useNavigate();
  const { addItemcart, loadingAuth, signed } = useContext(shoppingContext);
  const { id } = useParams();
  const [produtoId, setProdutoIp] = useState<IdProdutoPrps>();

  useEffect(() => {
    async function getDetail() {
      const res = await api.get(`/products/${id}`);
      setProdutoIp(res.data);
    }

    getDetail();
  }, [id]);

  function handleaddcard(produtoId: ProductProps) {
    addItemcart(produtoId);
    navigate("/cart");
  }

  return (
    <main className="w-full">
      <section className="w-full max-w-6xl mt-30 px-4 mx-auto">
        <h1 className="text-2xl font-bold flex mb-6 justify-center">
          {produtoId?.title}
        </h1>
        <div className="flex mx-auto max-w-4xl min-h-130 bg-white rounded-lg px-4 py-4">
          <div className="w-full flex items-center flex-col">
            <img
              className="max-w-90 max-h-85"
              src={produtoId?.image}
              alt={produtoId?.title}
            />
            <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between px-6 items-center mt-12">
              <div>
                <h2 className="flex items-center justify-center mb-4 font-medium text-xl">
                  Description
                </h2>
                <p className="max-w-150">{produtoId?.description}</p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <strong className="text-2xl">R$ {produtoId?.price}</strong>
                <div className="w-full">
                  {!loadingAuth && signed ? (
                    <button
                      onClick={() => handleaddcard(produtoId as ProductProps)}
                      className="flex flex-row w-full py-2 px-22 bg-gray-200 rounded-xl items-center justify-center gap-2  hover:bg-purple-700 hover:text-white transition-all duration-300 "
                    >
                      <strong>Comprar</strong>
                      <FiShoppingCart size={25} />
                    </button>
                  ) : (
                    <button
                      className="flex flex-row w-full py-1 px-2 bg-gray-200 rounded-xl  hover:bg-purple-700 hover:text-white transition-all duration-300 "
                    >
                      <Link to="/login"><strong>Fazer login</strong></Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
