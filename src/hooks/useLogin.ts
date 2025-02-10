import axios from "axios";
import { useNavigate } from "react-router-dom";
import { canvas } from "../routes";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

interface User {
  email: string;
  password: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const login = async (user: User) => {
    console.log("Cookies before request:", document.cookie);

    await axios
      .post(`${apiUrl}/user/login`, user, { withCredentials: true })
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: "success" });
        if (response.status === 200) navigate(canvas);
      })
      .catch((error: any) => {
        enqueueSnackbar(error.response?.data?.message || error.message, {
          variant: "error",
        });
        console.error(error.response?.data?.message || error.message);
      });
  };

  return { login };
};
