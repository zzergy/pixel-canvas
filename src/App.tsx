import Homepage from "./Pages/Homepage/Homepage";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { canvas, homepage, profile, signin, signup } from "./routes";
import ErrorPage from "./Shared/ErrorPage/ErrorPage";
import CanvasPage from "./Pages/CanvasPage/CanvasPage";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { ConfigProvider } from "antd";
import { customTheme } from "./customTheme";
import { PersistGate } from "redux-persist/integration/react";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { SnackbarProvider } from "notistack";
import ProfileModal from "./Pages/ProfileModal/ProfileModal";

const App = () => {
  const router = createHashRouter([
    {
      path: homepage,
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: canvas,
      element: <CanvasPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: signup,
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: signin,
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: profile,
      element: <ProfileModal />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
