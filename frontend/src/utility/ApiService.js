import axios from 'axios';
import Cookies from 'js-cookie';

// https://linked-88aq.onrender.com
// http://localhost:8000
// https://linked-d1ia.vercel.app/
// backend api- https://lk-sigma.vercel.app/api
const API_BASE_URL = 'https://lk-sigma.vercel.app/api';
const urlshot_API = `${API_BASE_URL}/url`;
const USER_API_URL = `${API_BASE_URL}/auth`;

export const isAuthenticated = async () => {
  const token = Cookies.get('authToken');
  return !!token; // Returns true if token exists, false otherwise
};

export const loginUser = async (userData) => {
  
  try {
    const response = await axios.post(`${USER_API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updatename = async (userData,authToken) => {
  console.log("userData",userData,authToken)
  try {
    const response = await axios.post(`${USER_API_URL}/updatename`, userData, authToken);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const updatepassword = async (userData,authToken) => {
  console.log("updatepassword",userData)
  try {
    const response = await axios.post(`${USER_API_URL}/updatepassword`, userData, authToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userdetail = async (authToken) => {
  try {
    const response = await axios.post(`${USER_API_URL}/userdetail`,{}, authToken);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const deleteuser = async (authToken) => {
  console.log("this is deleteuser links", authToken);
  try {
    const response = await axios.delete(`${USER_API_URL}/deleteuser`, authToken);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const links = async (authToken) => {
  console.log("this is auth links", authToken);
  try {
    const response = await axios.get(`${urlshot_API}/links`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error.response); // More specific logging
    throw error
    // return error.response ? error.response : { message: 'An unexpected error occurred' };
  }
};


export const shortenUrl = async (urlData) => {
  try {
    const response = await axios.post(`${urlshot_API}`, urlData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const edit_url = async (urlData) => {
  try {
    const response = await axios.post(`${urlshot_API}/edit`, urlData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const create_url = async (urlData, authToken) => {
  console.log(urlData)
  try {
    const response = await axios.post(`${urlshot_API}/create`, urlData, authToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getUserDashboard = async (email) => {
//   try {
//     const response = await axios.get(`${urlshot_API}/dashboard`,{
//         params: { email: email }
//       });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.error);
//   }
// };

export const delete_Url = async (shortURL, authToken) => {
  console.log(shortURL, authToken);
  try {
    const response = await axios.delete(`${urlshot_API}/delete/${shortURL}`, authToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

