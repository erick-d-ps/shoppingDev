import { createContext, useState, type ReactNode } from "react";
import { type ProductProps } from "../pages/home";

interface shoppingContextData {
  cart: CardProps[];
  cartAmount: number;
  addItemcart: (newItem: ProductProps) => void;
  remuvItemCart: (newItem: ProductProps) => void; 
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

  return (
    <shoppingContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemcart,
        remuvItemCart,
      }}
    >
     {children}
    </shoppingContext.Provider>
  );
}

export default ShoppingProvider;
