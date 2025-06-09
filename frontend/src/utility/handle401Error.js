import { toast, Bounce  } from 'react-toastify';

export const handle401Error = (error, { logout, navigate, setIsOpen }) => {
  if (error?.response?.status === 401) {
    if (logout) logout();
    if (navigate) navigate('/login');
    if (setIsOpen) setIsOpen(false);

    toast.error('🔐 Session timed out. Please log in again.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
};
