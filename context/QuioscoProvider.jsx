import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { toast} from 'react-toastify'
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre,setNombre]=useState('')
  const [total,setTotal]=useState(0)

  //const [paso,setPaso]=useState(1)
  const router=useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios.get("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
   const nuevoTotal=pedido.reduce((total,producto)=>(producto.precio*producto.cantidad)+total,0)
   setTotal(nuevoTotal)

  }, [pedido])

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((c) => c.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/')
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...orden }) => {
    if (pedido.some(productoState => productoState.id === orden.id)) {
      //Actualizar cantidad
      const pedidoActualizado = pedido.map((productoState) => (
       productoState.id === orden.id ? orden : productoState
      ));
      setPedido(pedidoActualizado);
      toast.success('Guardado Correctamente',{
        theme: "colored"
      })
    } else {
      setPedido([...pedido, orden]);
      toast.success('Agregado al Pedido',{
        theme: "colored"
      })
    }

    setModal(false)
  };

  const handleEditarCantidades=id=>{
   const productoActualizar=pedido.filter(p=>p.id===id)
   setProducto(productoActualizar[0])

    setModal(!modal)
  }

 const handleEliminarProducto=id=>{
  const pedidoActualizado=pedido.filter(p=>p.id!==id)
  setPedido(pedidoActualizado)
  toast.success('Producto eliminado del pedido',{
    theme: "colored"
  })
 }

 const colocarOrden= async (e)=>{
  e.preventDefault();
   try {
    await axios.post('/api/ordenes',{
     pedido,
     nombre,
     total,
     fecha:Date.now().toString()
   })
    //Resetear la App
    setCategoriaActual(categorias[0])
    setPedido([])
    setNombre('')
    setTotal(0)

    toast.success('Pedido Realizado Correctamente')

    setTimeout(()=>{
      router.push('/')
    },3000)
  
   } catch (error) {
    console.log(error);
   }
}



  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProducto,
        handleChangeModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
