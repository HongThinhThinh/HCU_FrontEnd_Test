import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import HomePage from "./pages/homePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateProvider } from "./assets/context/stateProdiveder";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
    </>
  );
}

export default App;
