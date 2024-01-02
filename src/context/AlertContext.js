import React, { createContext, useContext } from 'react';
import Swal from 'sweetalert2';
import { useFirebase } from './FirebaseContext';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {

  const {handleLogout} = useFirebase();
  const popup = () =>{
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "To access You will need to signin again!",
      icon: "warning",
      showCancelButton: true,
      background: "#101115",
      confirmButtonColor: "#673ede",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "You are logged out!",
          icon: "success"
        });
        handleLogout();

      window.location.href = '/';
      }
    });
  }

  return (
    <AlertContext.Provider value={{popup }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
