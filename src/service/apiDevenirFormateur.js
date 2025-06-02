import axios from "axios";
const token = localStorage.getItem('token');
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DemandeService = {
  
envoyerDemandeFormateur: async (motivation) => {
  
  console.log("Motivation envoyée au backend:", motivation);

  const res = await axios.post(
    `${BASE_URL}/formateur-request`,
    {
      persuasion: motivation,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  console.log("Données envoyées au backend:", { persuasion: motivation });
  return res.data;
},


};