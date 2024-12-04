import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signin } from "../routes";
import { useSnackbar } from "notistack";

interface User {
  username: string;
  email: string;
  password: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const useRegister = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const register = async (user: User) => {
    await axios
      .post(`${apiUrl}/user/register`, user)
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: "success" });
        if (response.status === 200) navigate(signin);
      })
      .catch((error: any) => {
        enqueueSnackbar(error.response?.data?.message || error.message, {
          variant: "error",
        });
        console.error(error.response?.data?.message || error.message);
      });
  };

  return { register };
};
