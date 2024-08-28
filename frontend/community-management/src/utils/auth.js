// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';


// Aquesta funció ja existeix i obté l'usuari del token


// Nova funció per obtenir el rol de l'usuari


export function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('authToken');
    return false;
  }


}

export function getUserRole() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub.role;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

export function getUserId() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub.username;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/login'; // Redirigeix a la pàgina de login
}