import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    // 'Content-Type': 'multipart/form-data', // Required for file upload
    "Content-Type": "application/json",
  },
});

export const register = async (data) => {
  let response;

  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const login = async (data) => {
  let response;

  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }

  return response;
};

// GET MARKS BY ID
export const getMarks = async (id) => {
  let response;

  try {
    response = await api.get(`/marks/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};
