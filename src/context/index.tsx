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
  arrayRemove,
  arrayUnion,
  updateDoc,
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

  // Calcula o total do carrinho e do frete
  useEffect(() => {
    function totalResultCart() {
      const frete = 60;
      const result = cart.reduce((acc, obj) => acc + obj.total, 0);
      const FretResult = frete + result;

      setTotalGeral(result);
      setTotalFrete(FretResult);
    }
    totalResultCart();
  }, [cart]);

  // Busca as informações do usuário logado
  useEffect(() => {
    const search = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          nome: user?.displayName,
          email: user?.email,
        });
      } else {
        setUser(null);
      }
      setLoadinAuth(false);
    });
    return () => {
      search();
    };
  }, []);

  // Carrega as compras finalizadas e o carrinho do Firestore
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setCartFinished([]);
        setCart([]);
        return;
      }

      try {
        const purchasesRef = collection(db, "finishedCart");
        const quaryRef = query(purchasesRef, where("userId", "==", user.uid));
        const purchasesSnapshot = await getDocs(quaryRef);

        const list = purchasesSnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date.toDate(),
          items: doc.data().items,
          total: doc.data().total,
        })) as buyProps[];

        setCartFinished(list);

        const cartDocRef = doc(db, "cart", user.uid);
        const cartSnapshot = await getDoc(cartDocRef);

        if (cartSnapshot.exists()) {
          const savedCart = cartSnapshot.data().items as CardProps[];
          setCart(savedCart);
        } else {
          setCart([]);
        }
      } catch (err) {
        console.log("ERRO AO BUSCAR DADOS DO BANCO", err);
      }
    }
    loadData();
  }, [user]);

  // Funções de manipulação do carrinho
  async function addItemcart(newItem: ProductProps) {
    if (!user) return;

    let updatedCart: CardProps[];
    const itemId = cart.find((item) => item.id === newItem.id);

    if (itemId) {
      updatedCart = cart.map((item) =>
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
      updatedCart = [...cart, newCartItem];
    }

    setCart(updatedCart);

    try {
      const cartDocRef = doc(db, "cart", user.uid);
      await setDoc(
        cartDocRef,
        { items: updatedCart, loadUpdated: new Date() },
        { merge: true }
      );
      console.log("Item adicionado e carrinho salvo!");
    } catch (error) {
      console.error("ERRO AO SALVAR O CARRINHO", error);
    }
  }

  async function remuvItemCart(newItem: ProductProps) {
    if (!user) return;

    const cartDocRef = doc(db, "cart", user.uid);
    const currentItem = cart.find((item) => item.id === newItem.id);

    if (!currentItem) return;

    if (currentItem.amount <= 1) {
      setCart((prev) => prev.filter((item) => item.id !== newItem.id));
      await updateDoc(cartDocRef, {
        items: arrayRemove(currentItem),
      });
      
    } else {
      const updatedItem = {
        ...currentItem,
        amount: currentItem.amount - 1,
        total: currentItem.price * (currentItem.amount - 1),
      };

      setCart((prev) =>
        prev.map((item) => (item.id === newItem.id ? updatedItem : item))
      );

      await updateDoc(cartDocRef, {
        items: arrayRemove(currentItem),
      });
      await updateDoc(cartDocRef, {
        items: arrayUnion(updatedItem),
      });
      
    }
  }

  async function deletItemCard(newItem: ProductProps) {
    if (!user) return;

    const cartDocRef = doc(db, "cart", user.uid);
    const itemToDelete = cart.find((item) => item.id === newItem.id);

    if (!itemToDelete) return;

    setCart((prev) => prev.filter((item) => item.id !== newItem.id));

    await updateDoc(cartDocRef, {
      items: arrayRemove(itemToDelete),
    });
    toast.success("Item deletado com sucesso!");
  }

  async function cleanCart() {
    if (!user) return;

    const cartDocRef = doc(db, "cart", user.uid);

    await deleteDoc(cartDocRef);

    console.log("Carrinho deletado do banco");

    toast.success("Carrinho foi limpo!");
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