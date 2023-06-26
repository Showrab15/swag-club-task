import { createBrowserRouter } from "react-router-dom";
import App from '../App'
 import Login from '../Login'
import Home from "../Home";
import PrivateRoute from "../PrivateRoute";
import AddProduct from "../AddProduct";
import Register from "../REgister";
import AddVideo from "../AddVideo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  
      {
        path: '/login',
        element: <Login></Login>
      },

      {
        path: '/register',
        element: <Register></Register>
      },
      
      {
        path: '/addproduct',
        element: <AddProduct></AddProduct>
      },
      {
        path : '/addVideo',
        element : <AddVideo></AddVideo>
      }

    

    

  


]);


export default router