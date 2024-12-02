import axios from "axios";

const apiURL = `http://localhost:5001/api`;

interface User {
  email: string;
  password: string;
}

export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiURL}/user/register`, user);
    return response.data.message;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiURL}/user/login`, user);
    return response.data.message;
  } catch (error: any) {
    return error.response.data;
  }
};
