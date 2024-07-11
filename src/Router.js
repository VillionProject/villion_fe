import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import Login from "./components/blocks/Login";
import Home from "./components/blocks/Home";
import SignUp from "./components/blocks/SignUp";
import Chatting from "./components/blocks/Chatting";
import Settings from "./components/blocks/Settings";
import LibEdit from "./components/blocks/LibEdit";

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
  },
  {
    path : '/chatting',
    element : <Chatting />,
  },
  {
    path : '/settings',
    element : <Settings />,
  },
  {
    path : '/libEdit',
    element : <LibEdit />,
  }


]);

export default router;