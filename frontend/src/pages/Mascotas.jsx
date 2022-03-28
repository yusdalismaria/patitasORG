import React from 'react'

import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MascotasForm from '../components/MascotaForm'
import MascotaItem from '../components/MascotaItem'
import Spinner from '../components/Spinner'
import {getMascotas,reset} from '../features/mascotas/mascotasSlice'


function Mascotas() {

  const navigate = useNavigate();
  const dispatch= useDispatch()

  const {user} = useSelector((state)=>state.auth)

  const {mascotas, isLoading, isError,message}= useSelector((state)=> state.mascotas) 

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
      <p>Mascotitas Dashboard</p>
    </section>
    <MascotasForm/>
    <section className="content">
      {mascotas.length> 0 ? (<div className='mascotas'>
        {mascotas.map((mascota)=>(
          <MascotaItem key={mascota._id} mascota={mascota}/>
        ))}
      </div>
      ) : 
      (<h3>You dont have any pets!</h3>
      )
      }
    </section>
      </>

  )
}

export default Mascotas