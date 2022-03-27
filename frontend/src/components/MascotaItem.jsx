import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteMascota} from '../features/mascotas/mascotasSlice'

function MascotaItem({mascota}) {

const dispatch = useDispatch();
  return (
    <div className="mascota">
        <div>
            {new Date(mascota.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{mascota.text}</h2>
        <button onClick={()=> dispatch(deleteMascota(mascota._id))} className="close">X</button>
    </div>
  )
}

export default MascotaItem