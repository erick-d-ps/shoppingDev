import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConection";

import toast from "react-hot-toast";

const schema = z.object({
  email: z.email("Incira um email válido").nonempty(),
  password: z.string().nonempty("A senha é obrigatória!"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navgate = useNavigate()

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
  
    handleLogout()
  }, [])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  async function onsubmit(data: FormData) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) =>{
      console.log("Usuario logado...")
      toast.success("Usuário logado com sucesso")
      console.log(user)
      navgate("/dashboard", {replace: true})
    })
    .catch((err) => {
      console.log(err)
      console.log("Erro ao fazer login")
      alert("Usuario não encontrado!")
    })
  }

  return (
    <main className="w-full h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex-shrink-0">
          <Link className="text-3xl font-bold text-purple-700 mb-4" to={"/"}>
            ShoppingDev
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col w-full items-center justify-center max-w-xl bg-white mt-5 p-2 rounded-md"
        >
          <div className="w-full m-5">
            <Input
              name="email"
              placeholder="Digite o email..."
              type="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="w-full">
            <Input
              name="password"
              placeholder="Digite a senha..."
              type="password"
              error={errors.password?.message}
              register={register}
              autocomplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-5 bg-fuchsia-700 text-white font-bold py-1 rounded-md"
          >
            Acessar
          </button>
        </form>
        <p className="mt-5">Ainda não tem um conta <Link className="text-fuchsia-700 font-medium" to={"/register"}>Cadastre-se</Link></p>
      </div>
    </main>
  );
}
