import { useEffect, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";

import { shoppingContext } from "../../context"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import { auth } from "../../services/firebase/firebaseConection";

import toast from "react-hot-toast";

const schema = z.object({
  nome: z
    .string()
    .min(5, "O nome completo é obrigatório.")
    .max(50, "O nome deve ter no máximo 50 caracteres.")
    .refine(
      (value) => value.includes(" "),
      "Por favor, Insira um nome completo (Nome e sobrenome)."
    )
    .nonempty("O nome é obrigatório"),
  email: z.email("Insira um email válido").nonempty("O email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelomenos 6 caracteres")
    .nonempty("A senha é obrigatoria"),
});

type FormData = z.infer<typeof schema>;


export function Register() {
  const { handleInfoUser } = useContext(shoppingContext)

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
  
    handleLogout()
  }, [])


    
  const navigate = useNavigate();  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  async function onsubmit(data: FormData){
    createUserWithEmailAndPassword(auth, data.email, data.password)
    
    .then(async (user) =>{
      await updateProfile(user.user, {
        displayName: data.nome
      })

      handleInfoUser({
        nome: data.nome,
        email: data.email,
        uid: user.user.uid
      })
      toast.success("Bem vindo ao ShoppingDev")
      console.log("usuario cadastrado com sucesso!")
      navigate("/", {replace: true})
    })
    .catch((err) =>{
     toast.error("Erro tente novamente!") 
     console.log("Erro ao cadastrar o usuario ")
     console.log(err)
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
          className=" flex flex-col w-full items-center justify-center max-w-xl bg-white mt-5 p-2 rounded-md"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="w-full mt-2">
            <Input
              name="nome"
              placeholder="Digite o nome completo..."
              type="nome"
              register={register}
              error={errors.nome?.message}
            />
          </div>
          <div className="w-full mt-5">
            <Input
              name="email"
              placeholder="Digite o email..."
              type="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="w-full mt-5">
            <Input
              name="password"
              placeholder="Digite uma senha..."
              type="password"
              register={register}
              error={errors.password?.message}
              autocomplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-5 bg-fuchsia-700 text-white font-bold py-1 rounded-md"
          >
            Registrar
          </button>
        </form>
        <p className="mt-5">Já tem uma conta <Link className="text-fuchsia-700 font-medium" to={"/login"}>Fazer login</Link></p>
      </div>
    </main>
  );
}
