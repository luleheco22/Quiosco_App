import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ({categoria}) => {

    const {handleClickCategoria,categoriaActual}=useQuiosco()
    const {nombre,icono,id}=categoria
    
  return (
    <div className={` ${categoriaActual?.id===id ? "bg-red-500":""} flex items-center gap-4 w-full border p-5 hover:bg-orange-400`}>
        <Image
          width={80}
          height={80}
          src={`/assets/img/icono_${icono}.svg`}
          alt='Imagen Icono'
        
        />

        <button
        type='button'
        className='text-2xl font-bold hover:cursor-pointer'
        onClick={()=>handleClickCategoria(id)}
        >
           {nombre}
        </button>
    </div>
  )
}

export default Categoria