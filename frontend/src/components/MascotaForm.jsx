import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux' 
import {createMascota} from '../features/mascotas/mascotasSlice'

function MascotaForm() {

    const [text,setText]=useState('');
    
    const dispatch = useDispatch()

    const onSubmit=e=>{
        e.preventDefault();

        dispatch(createMascota({text}))
        setText('')
    }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="text">Mascota</label>
            <input type="text" 
            name="text" 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
             />
        </div>
        <div className="form-group">
            <button className="btn btn-block" type="submit">Add Mascota!</button>
        </div>
        </form>
    </section>
  )
}

export default MascotaForm