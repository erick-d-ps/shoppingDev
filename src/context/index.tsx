import { createContext, useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { type ProductProps } from "../pages/home";

import { auth, db } from "../services/firebase/firebaseConection";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

interface shoppingContextData {
  cart: CardProps[];
  cartFinished: buyProps[];
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
  signed: boolean;
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

interface buyProps {
  id: string;
  date: Date;
  items: CardProps[];
  total: number;
}

interface Userprops {
  uid: string;
  nome: string | null;
  email: string | null;
}

export const shoppingContext = createContext({} as shoppingContextData);

function ShoppingProvider({ children }: shoppingProviderProps) {
  const [cart, setCart] = useState<CardProps[]>([]);
  const [cartFinished, setCartFinished] = useState<buyProps[]>([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);

  const [user, setUser] = useState<Userprops | null>(null);
  const [loadingAuth, setLoadinAuth] = useState(true);

  //finalizar cart
  useEffect(() => {
    function totalResultCart() {
      let frete = 60;
      const result = cart.reduce((acc, obj) => acc + obj.total, 0);
      const FretResult = frete + result;

      setTotalGeral(result);
      setTotalFrete(FretResult);
    }
    totalResultCart();
  }, [cart]);

  //pegar as informaçoes do usuario
  useEffect(() => {
    const search = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          nome: user?.displayName,
          email: user?.email,
        });
        setLoadinAuth(false);
      } else {
        setUser(null);
        setLoadinAuth(false);
      }
    });
    return () => {
      search();
    };
  }, []);

  //salva compra finalizada
  useEffect(() => {
    async function loadLatestPurchases() {
      if (!user) {
        setCartFinished([]);
        setCart([]);
        return;
      }

      try {
        const purchasesRef = collection(db, "finishedCart");
        const quaryRef = query(purchasesRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(quaryRef);

        let list = [] as buyProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            date: doc.data().date.toDate(),
            items: doc.data().items,
            total: doc.data().total,
          });
        });

        setCartFinished(list);

        const cartDocRef = doc(db, "cart", user.uid);
        const cartSnapshot = await getDoc(cartDocRef);

        if (cartSnapshot.exists()) {
          const saveCart = cartSnapshot.data().items as CardProps[];

          setCart((prevCart) => {
            const merged = new Map<number, CardProps>();

            saveCart.forEach((item) => {
              merged.set(item.id, { ...item });
            });

            prevCart.forEach((item) => {
              if (merged.has(item.id)) {
                const existing = merged.get(item.id)!;
                merged.set(item.id, {
                  ...existing,
                  amount: existing.amount + item.amount,
                  total: existing.total + item.total,
                });
              } else {
                merged.set(item.id, { ...item });
              }
            });

            return Array.from(merged.values());
          });
        }
      } catch (err) {
        console.log("ERRO AO BUSCAR ITENS DO BANCO", err);
      }
    }

    loadLatestPurchases();
  }, [user]);

  //salva carrinho no banco
  useEffect(() => {
    if (user) {
      const cartDocRef = doc(db, "cart", user.uid);

      if (cart.length > 0) {
        setDoc(
          cartDocRef,
          {
            items: cart,
            loadUpdated: new Date(),
          },
          { merge: true }
        )
          .then(() => console.log("CARRINHO SALVO!"))
          .catch(() => console.log("ERRO AO SALVAR O CARRINHO"));
      } else {
        deleteDoc(cartDocRef)
          .then(() => console.log("CARRINHO DELETADO!"))
          .catch(() => console.log("ERRO AO DELETAR O CARRINHO"));
      }
    }
  }, [user, cart]);

  function addItemcart(newItem: ProductProps) {
    setCart((response) => {
      const itemId = response.find((item) => item.id === newItem.id);

      if (itemId) {
        return response.map((item) =>
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

  function remuvItemCart(newItem: ProductProps) {
    setCart((response) => {
      const itemId = response.find((item) => item.id === newItem.id);

      if (!itemId || itemId.amount <= 1) {
        return response.filter((item) => item.id !== newItem.id);
      }

      if (itemId) {
        return response.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                amount: item.amount - 1,
                total: item.price * (item.amount - 1),
              }
            : item
        );
      } else {
        return response.filter((item) => item.id !== newItem.id);
      }
    });
  }

  function deletItemCard(newItem: ProductProps) {
    const remuvItem = cart.filter((produto) => produto.id !== newItem.id);
    setCart(remuvItem);
  }

  function cleanCart() {
    alert("Carrinho foi limpo!");
    setCart([]);
  }

  async function finishedCart() {
    if (cart.length === 0 || !user) {
      return;
    }

    const newBuy: buyProps = {
      id: String(new Date().getTime()),
      date: new Date(),
      items: cart,
      total: totalFrete,
    };
    try {
      const docRef = await addDoc(collection(db, "finishedCart"), {
        ...newBuy,
        userId: user.uid,
      });
      setCartFinished((prev) => [...prev, { ...newBuy, id: docRef.id }]);

      toast.success("Compra finalizada!");
      setCart([]);

      const cartDocRef = doc(db, "cart", user.uid);
      await deleteDoc(cartDocRef);
    } catch (err) {
      console.log(err);
      console.log("ERRO AO SALVAR NO BANCO!");
    }
  }

  function handleInfoUser(newUser: Userprops) {
    const user = newUser;

    setUser(user);
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
        handleInfoUser,
        signed: !!user,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
}

export default ShoppingProvider;
