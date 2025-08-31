import {type RegisterOptions, type UseFormRegister } from "react-hook-form"

interface ImputProps{
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions; 
}

export function Input({type, placeholder, name, register, error, rules}: ImputProps){
    return(
       <div>
         <input 
           className="w-full border-gray-400 border-2 rounded-md py-0.5 px-2"
           placeholder={placeholder}
           type={type}
           {...register(name, rules)}
           id={name}
         />
         {error && <p className="my-1 text-red-500">{error}</p>}
       </div> 
    )
}