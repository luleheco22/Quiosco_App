import { useEffect,useCallback } from 'react';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';
import Layout from '../layout/Layout'

const Total = () => {

   const {pedido, nombre,setNombre,colocarOrden,total}=useQuiosco()
   console.log(pedido)

   const comprobarPedido=useCallback(()=>{
    return pedido.length===0 || nombre==='' || nombre.length<3
  },[pedido,nombre]);
  
  useEffect(() => {
    comprobarPedido()
  }, [pedido,comprobarPedido])



  return (
    <Layout
    page={'Total'}>
     <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
     <p className='text-2xl my-10'>Confirma tu pedido a contiuación</p>

     <form 
      onSubmit={colocarOrden}
     >
      <div>
        <label
        htmlFor='nombre'
        className='block uppercase text-slate-800 font-bold
        text-xl'>
          Nombre
          </label>
          <input 
          id='nombre'
          type="text"
          value={nombre}
           className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md '
           onChange={(e)=>setNombre(e.target.value)}
          />
      </div>

      <div className='mt-10'>
          <p className='text-2xl'>Total a pagar {''} <span className='font-bold'>{formatearDinero(total)}</span></p>
      </div>

      <div className='mt-5'>
         <input 
         type='submit'
        value="Confirmar pedido"
        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600' }  w-full lg:w-auto px-5 py-2
        rounded uppercase font-bold text-white text-center hover:bg-indigo-800 cursor-pointer`}
        disabled={comprobarPedido()}
        />
      </div>
     </form>

    </Layout>
  )
}

export default Total