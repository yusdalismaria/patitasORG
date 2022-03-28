import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteAspirante} from '../features/aspirantes/aspiranteSlice'

function AspiranteItem({aspirante}) {

const dispatch = useDispatch();
  return (
    <div className="mascota">
        <div>
            {new Date(aspirante.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{aspirante.text}</h2>
        <button onClick={()=> dispatch(deleteAspirante(aspirante._id))} className="close">X</button>
    </div>
  )
}

export default AspiranteItem