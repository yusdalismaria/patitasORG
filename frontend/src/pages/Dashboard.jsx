import React from 'react'

import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
//import MascotasForm from '../components/MascotaForm'
//import MascotaItem from '../components/MascotaItem'
import Spinner from '../components/Spinner'
import {getMascotas,reset} from '../features/mascotas/mascotasSlice'
import {Link} from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate();
  const dispatch= useDispatch()

  const {user} = useSelector((state)=>state.auth)

  const {isLoading, isError,message}= useSelector((state)=> state.mascotas) 

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getMascotas())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
    <section className='heading'>
      <h1>Hola! {user && user.name}!</h1>
      <p>Mascoticas Dashboard</p>
    </section>

    <section>
    <div>
    <Link to ='/mascotas'><button className='btn btn-dash'>Mascotas</button></Link> 
    </div>
    <div>
    <Link to ='/aspirantes'><button className='btn btn-dash'>Aspirantes</button></Link> 
    </div>
    <div>
    <Link to ='/trabajadores'><button className='btn btn-dash'>Trabajadores</button></Link> 
    </div>
    </section>
      </>

  )
}

export default Dashboard