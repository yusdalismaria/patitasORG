import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux' 
import {createAspirante} from '../features/aspirantes/aspiranteSlice'

function AspiranteForm() {

    const [text,setText]=useState('');
    
    const dispatch = useDispatch()

    const onSubmit=e=>{
        e.preventDefault();

        dispatch(createAspirante({text}))
        setText('')
    }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="text">Nombre aspirante</label>
            <input type="text" 
            name="text" 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
             />
        </div>
  
        <div className="form-group">
            <button className="btn btn-block" type="submit">Add Aspirante!</button>
        </div>
        </form>
    </section>
  )
}

export default AspiranteForm