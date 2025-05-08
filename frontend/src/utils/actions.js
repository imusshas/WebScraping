import axios from "axios";

export async function fetchProducts(searchKey, currentPage) {
  const response = await axios.get(`http://localhost:3000/products/${searchKey}/${currentPage}`);
  return response.data.data;
}

export async function login(email, password) {
  const response = await axios.post(`http://localhost:3000/auth/login`, { email, password }, { withCredentials: true });
  return response.data.data
}

export async function getCurrentUser() {
  const response = await axios.get(`http://localhost:3000/users/current-user`, { withCredentials: true });
  return response.data.data;
}

export async function logout() {
  const response = await axios.get(`http://localhost:3000/auth/logout`, { withCredentials: true });
  return response.data.data;
}