import { createContext, useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth"
import { type ProductProps } from "../pages/home";
import { auth } from "../services/firebase/firebaseConection";

interface shoppingContextData {
  cart: CardProps[];
  cartFinished: buyPorps[];
  totalGeral: number;
  totalFrete: number;
  cartAmount: number;
  addItemcart: (newItem: ProductProps) => void;
  remuvItemCart: (newItem: ProductProps) => void; 
  deletItemCard: (newItem: ProductProps) => void;
  cleanCart: () => void;
  finishedCart: () => void;
  user: Userprops | null;
  loadingAuth: boolean;
  handleInfoUser: (newUser: Userprops) => void;  
}

type shoppingProviderProps = {
  children: ReactNode;
};

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  amount: number;
  total: number;
}

interface buyPorps{
  id: string;
  date: Date;
  items: CardProps[];
  total: number
}

interface Userprops{
  uid: string;
  nome: string | null;
  email: string | null;
}

export const shoppingContext = createContext({} as shoppingContextData);



function ShoppingProvider({ children }: shoppingProviderProps) {
  const [cart, setCart] = useState<CardProps[]>([]);
  const [cartFinished, setCartFinished] = useState<buyPorps[]>([]);
  const [totalGeral, setTotalGeral] = useState(0)
  const [totalFrete, setTotalFrete] = useState(0)

  const [user, setUser] = useState<Userprops | null>(null)
  const [loadingAuth, setLoadinAuth] =useState(true)

  useEffect(() => {
    function totalResultCart(){
      let frete = 60;
      const result = cart.reduce((acc, obj) => acc + obj.total, 0);
      const FretResult = frete + result
  
      setTotalGeral(result);
      setTotalFrete(FretResult);
    }
    totalResultCart();
  }, [cart])

  useEffect(() => {
    if(cartFinished.length > 0){
      console.log(cartFinished)
    }
  }, [cartFinished])

  useEffect(() => {
    const search = onAuthStateChanged(auth, (user) =>{
      if(user){
        setUser({
          uid: user.uid,
          nome: user?.displayName,
          email: user?.email
        })
        setLoadinAuth(false)
      }else{
        setUser(null)
        setLoadinAuth(false)
      }
    })

    search()
  }, [])

  function addItemcart(newItem: ProductProps) {

    setCart((response) => {
      const itemId = response.find((item) => item.id === newItem.id);

      if (itemId) {
       
        return response.map(
          (item) =>
            item.id === newItem.id
              ? {
                  ...item, 
                  amount: item.amount + 1, 
                  total: item.price * (item.amount + 1), 
                }
              : item 
        );
      } else {
       
        const newCartItem: CardProps = {
          ...newItem,
          amount: 1,
          total: newItem.price,
        };
        return [...response, newCartItem];
      }
    });
  }

  function remuvItemCart(newItem: ProductProps){
    
    setCart((response) => {
      const itemId = response.find((item) => item.id === newItem.id);

      if(!itemId || itemId.amount <= 1){
        return response.filter((item) => item.id !== newItem.id)
      }

      if( itemId ){
        return response.map((item => item.id === newItem.id ?
          {
            ...item,
            amount: item.amount - 1,
            total: item.price * (item.amount - 1)
          }
          :item
        ));
      }else {
        return response.filter((item) => item.id !== newItem.id)
      }
    })
  }

  function deletItemCard(newItem: ProductProps){
    const remuvItem = cart.filter(produto => produto.id !== newItem.id)
    setCart(remuvItem);
   
  }

  function cleanCart(){
    alert("Carrinho foi limpo!")
    setCart([])
  }

  function finishedCart(){
    if(cart.length === 0){
      return;
    }

    const newBuy: buyPorps = {
      id: String(new Date().getTime()),
      date: new Date(),
      items:cart,
      total: totalFrete,
    };

    setCartFinished((prev) => [...prev, newBuy])

    alert("Compra finalizada com sucesso!")
    setCart([]);
  }

  function handleInfoUser(newUser: Userprops){
    const user= newUser

    setUser(user)
  }
  return (
    <shoppingContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemcart,
        remuvItemCart,
        deletItemCard,
        totalFrete,
        totalGeral,
        cleanCart,
        cartFinished,
        finishedCart,
        user,
        loadingAuth,
        handleInfoUser
      }}
    >
     {children}
    </shoppingContext.Provider>
  );
}

export default ShoppingProvider;
