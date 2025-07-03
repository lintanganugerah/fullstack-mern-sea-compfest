import { Navigate, RouterProvider } from "react-router-dom";
import { createRouter } from "./routes";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export const RedirectToUser = () => {
  return <Navigate to="/user" replace />;
};

const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
