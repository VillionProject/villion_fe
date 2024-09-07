import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import Login from "./components/blocks/Login";
import Home from "./components/blocks/Home";
import SignUp from "./components/blocks/SignUp";
import Chatting from "./components/blocks/Chatting";
import Settings from "./components/blocks/Settings";
import LibEdit from "./components/blocks/LibEdit";
import ChatModule from "./components/chat/ChatModule";
import AddProduct from "./components/blocks/AddProduct";
import ProductDetail from "./components/blocks/ProductDetail";
import RentalConfirm from "./components/blocks/RentalConfirm";
import Recommended from "./components/blocks/Recommended";
import Mbti2 from "./components/blocks/Mbti2";
import MbtiStart from "./components/blocks/MbtiStart";
import Search from "./components/blocks/Search";

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
  },
  {
    path : '/addProduct',
    element : <AddProduct />,
  },
  {
    path : '/chatTest3',
    element : <ChatModule />,
  },
  {
    path : '/detail',
    element : <ProductDetail />,
  },
  {
    path : '/rentalConfirm',
    element : <RentalConfirm />,
  },
  {
    path : '/recommended',
    element : <Recommended />,
  },
  {
    path : '/mbti',
    element : <Mbti2 />,
  },
  {
    path : '/mbtiStart',
    element : <MbtiStart />,
  },
  {
    path : '/search',
    element : <Search />,
  }




]);

export default router;