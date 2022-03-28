import axios from 'axios'

const API_URL='/api/aspirante/'

//CREATE NEW ASPIRANTE

const createAspirante=async(aspiranteData,token)=>{
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, aspiranteData, config);

    return response.data;
}

//GET ASPIRANTE

const getAspirantes=async(token)=>{
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config);

    return response.data;
}

// Delete user Aspirante!
const deleteAspirante = async (aspiranteId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + aspiranteId, config)
  
    return response.data
  }
  


const aspiranteService={
    createAspirante,
    getAspirantes,
    deleteAspirante,
}

export default aspiranteService;