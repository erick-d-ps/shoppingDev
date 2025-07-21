import { createContext, useState, type ReactNode } from "react";
import { type ProductProps } from "../pages/home";

interface shoppingContextData {
  cart: CardProps[];
  cartAmount: number;
  addItemcart: (newItem: ProductProps) => void; //tenho que informar o que ele vai receber
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

export const shoppingContext = createContext({} as shoppingContextData);

function ShoppingProvider({ children }: shoppingProviderProps) {
  const [cart, setCart] = useState<CardProps[]>([]);

  function addItemcart(newItem: ProductProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // se entrou aqui apenas somamos + 1 na quantidade e calculamos o total desse carrinho.
      let cartList = cart;

      cartList[indexItem].amount += 1;
      // então aqui estou pegando a quantidade de items que tenho no carrinho e somando com amis 1
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
      // para fazer o total  pego a quantidade de itens que tenho no carrinho e multiplico pelo preço

      setCart(cartList)
      return;
    }
    // adicionar esse item na nossa lista
    let data = {
       ...newItem,
       amount: 1,
       total: newItem.price 
    };

    setCart(products => [...products, data])
    //caso ja tenha um item dentro da lista ele vai pegar o que ja tem e colocar o novo item que no caso é o data 
  }

  return (
    <shoppingContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemcart 
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
}

export default ShoppingProvider;
