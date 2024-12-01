import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = 'http://localhost:8000/api';
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
    throw new Error(error.response.data.error);
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
export const create_url = async (urlData) => {
  try {
    const response = await axios.post(`${urlshot_API}/create`, urlData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
// editcreate
export const getUserDashboard = async (email) => {
  try {
    const response = await axios.get(`${urlshot_API}/dashboard`,{
        params: { email: email }
      });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const delete_Url = async (shortURL) => {
  try {
    const response = await axios.delete(`${urlshot_API}/delete`, {
      params: { shortURL: shortURL }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

