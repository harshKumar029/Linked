import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Assuming you're using React Router for navigation
import Cookies from 'js-cookie';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com',  // Your API base URL
});

// Get the token from the cookies or localStorage
const authToken = Cookies.get('authToken');  // If you're using cookies
// or
// const authToken = localStorage.getItem('accessToken'); // If using localStorage

// Add Authorization token to headers
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

// Set up a response interceptor to handle expired tokens (401 Unauthorized)
axiosInstance.interceptors.response.use(
  response => response,  // If the response is successful, pass it to the next handler
  error => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid, handle accordingly
      console.log('Token expired or invalid, redirecting to login');
      
      // Clear token from cookies or localStorage
      Cookies.remove('authToken'); 
      window.location.href = '/login';

      
      return Promise.reject(error); 
    }
    
    // Handle other errors (e.g., network issues)
    return Promise.reject(error);
  }
);

// Export the axiosInstance to use in your components
export default axiosInstance;
