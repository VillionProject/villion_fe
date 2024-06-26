import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import Login from "./components/blocks/Login";
import Home from "./components/blocks/Home";
import SignUp from "./components/blocks/SignUp";

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
  },
  {
    path : '/login',
    element : <Login />,
  },
  {
    path : '/home',
    element : <Home />,
  },
  {
    path : '/signup',
    element : <SignUp />,
  }


]);

export default router;