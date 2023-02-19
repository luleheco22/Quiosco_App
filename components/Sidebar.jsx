import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import Link from "next/link"

const Sidebar = () => {

   const {categorias}=useQuiosco()
   
  return (
    <>
      <Image 
      width={300} 
      height={100} 
      src='/assets/img/logo.svg' 
      alt="imagen logotipo"
       />
        
        <div className="flex justify-center items-center mt-10 text-sm border p-5 rounded-lg bg-amber-500 hover:bg-amber-700 hover:cursor-pointer text-white uppercase font-bold">
       <Link  href={'/admin'}>
        Ordenes Pendientes
       </Link>
        </div>

       

       <nav className="mt-10">
          {categorias.map(categoria=>(
            <Categoria
               key={categoria.id}
               categoria={categoria}
            
            />

          ))}

       </nav>
    </>
  )
}

export default Sidebar