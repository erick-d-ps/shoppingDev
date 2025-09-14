import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

import { db } from "../../services/firebase/firebaseConection";
import { getDoc, doc } from "firebase/firestore"

import toast from "react-hot-toast";

interface CardFinishedProps{
  id: string;
  date: string;
  total: string;
  items: ItemsFinishedProps[];
}

interface ItemsFinishedProps{
  amount: number;
  description: string;
  id: number;
  price: number;
  title: string;
  total: number;
  image: string;
}

export function Buy() {
  const { id } = useParams();
  const [products, setProducts] = useState<CardFinishedProps>();

  const navigat = useNavigate()

  useEffect(() => {
    if(!id){
      toast.error("Produto não encontrado!")
      navigat("/dashboard")
      return;
    }

    const docRef = doc(db, "finishedCart", id)
    getDoc(docRef)
    .then((snapshot) => {

      if(!snapshot.data()){
        navigat("/")
        console.log("snapshot Não encontrado!")
      }

      const data = snapshot.data();

      if (!data) {
        return;
      }
    
      setProducts({
        id: snapshot.id,
        date: data.date?.toDate().toLocaleDateString("pt-BR") ?? "Data inválida",
        total: String(data.total ?? 0),
        items: (data.items as ItemsFinishedProps[]) ?? [],
      });   
    })    

  }, [id])


  return (
    <main className="w-full mt">
      <div className="w-full flex flex-col max-w-6xl gap-2 mt-30 px-4 mx-auto">
        <h1 className="w-full flex items-center justify-center mb-4 text-2xl font-bold">
          Compra do dia: {products?.date}
        </h1>
        <div className="grid p-5 gap-6 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
          {products?.items.map((item) => (
            <section key={item.id} className="flex flex-col bg-white rounded p-2">
            <strong className="w-full text-center">{item.title}</strong>

            <div className="flex items-center justify-center-safe gap-10 ">
              <div className="flex flex-col items-center gap-1">
                <img src={item.image} alt="logo do produto" className="h-20 w-25" />
                <strong>{item.price}</strong>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <strong>Qantidade: </strong>
                  <p>{item.amount}</p>
                </div>
                <div className="flex gap-2">
                  <strong>Valor total:</strong>
                  <p>R${item.total}</p>
                </div>
              </div>
            </div>
          </section>
          ))}
        </div>
      </div>
    </main>
  );
}
