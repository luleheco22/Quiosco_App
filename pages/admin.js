import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import Orden from '../components/Orden'
import AdminLayout from '../layout/AdminLayout'

const Admin = () => {
  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100} )


  return (
   <AdminLayout page={'Admin'}>
      <h1 className='text-4xl font-black'>Panel de Administración</h1>
     <p className='text-2xl my-10'>Administra tus ordenes</p>
   
   {data && data.length ? data.map((orden) =>
      <Orden
        key={orden.id}
        orden={orden}
      />
   
   )  : <p>No hay ordenes pendientes</p> }
   </AdminLayout>
  )
}

export default Admin
