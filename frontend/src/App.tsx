import { Navigate, RouterProvider } from "react-router-dom";
import { createRouter } from "./routes";

export const RedirectToUser = () => {
	return <Navigate to='/user' replace />;
};

const AppRouter = () => {
	const router = createRouter();

	return <RouterProvider router={router} />;
};

const App = () => {
	return <AppRouter />;
};

export default App;