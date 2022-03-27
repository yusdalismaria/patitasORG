import axios from 'axios'

const API_URL='/api/mascotas/'

//CREATE NEW MASCOTA

const createMascota=async(mascotaData,token)=>{
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, mascotaData, config);

    return response.data;
}

//GET MASCOTITAS

const getMascotas=async(token)=>{
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config);

    return response.data;
}

// Delete user mascota!
const deleteMascota = async (mascotaId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + mascotaId, config)
  
    return response.data
  }
  


const mascotasService={
    createMascota,
    getMascotas,
    deleteMascota,
}

export default mascotasService;