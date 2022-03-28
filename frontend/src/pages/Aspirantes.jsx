import React from 'react'

import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import AspiranteForm from '../components/AspiranteForm'
import AspiranteItem from '../components/AspiranteItem'
import Spinner from '../components/Spinner'
import {getAspirantes,reset} from '../features/aspirantes/aspiranteSlice'


function Aspirantes() {

  const navigate = useNavigate();
  const dispatch= useDispatch()

  const {user} = useSelector((state)=>state.auth)

  const {aspirantes, isLoading, isError,message}= useSelector((state)=> state.aspirantes) 

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAspirantes())

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
      <p>Aspirantes Dashboard</p>
    </section>
    <AspiranteForm/>
    <section className="content">
      {aspirantes.length> 0 ? (<div className='mascotas'>
        {aspirantes.map((aspirante)=>(
          <AspiranteItem key={aspirante._id} aspirante={aspirante}/>
        ))}
      </div>
      ) : 
      (<h3>You dont have any aspirantes!</h3>
      )
      }
    </section>
      </>

  )
}

export default Aspirantes