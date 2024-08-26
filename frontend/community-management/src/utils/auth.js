// src/utils/auth.js

import jwtDecode from 'jwt-decode'; // Importa la llibreria per decodificar el JWT

function getUser() {
  const token = localStorage.getItem('authToken'); // O sessionStorage, depenent d'on guardis el token

  if (!token) {
    return null; // No hi ha cap usuari loggejat
  }

  try {
    const decodedToken = jwtDecode(token); // Decodifica el token per obtenir les dades de l'usuari
    const currentTime = Date.now() / 1000; // Temps actual en segons

    // Verifica si el token ha expirat
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken'); // Elimina el token si ha expirat
      return null;
    }

    return decodedToken.user; // Retorna les dades de l'usuari si el token és vàlid
  } catch (error) {
    console.error('Error decodificant el token:', error);
    return null;
  }
}

/*function logout() {
    localStorage.removeItem('authToken');
    // Altres accions de logout com redirigir a la pàgina de login
  }
  */

export default getUser;
