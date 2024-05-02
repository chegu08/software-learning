import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserLoginPage from "./userpages/userLoginPage";
import UserHomePage from "./userpages/userHomePage";
import DesignerHomePage from './desigenerpage/designerHomePage';
import DesignerSignupPage from './desigenerpage/designerSignupPage';
import DesignerLoginPage from './desigenerpage/designerLoginPage';
import UserProfile from './userpages/UserProfile';
import Updateuser from './userpages/UpdateUser';
import CreateProduct from './desigenerpage/createproduct';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'; 
import DesignerProfile from './desigenerpage/designerProfile';
import Updatedesigner from './desigenerpage/UpdateDesigner';
import ViewProduct from './userpages/viewProducts';
import Cart from './userpages/userCart';
import ViewOrder from './userpages/viewOrder';
import UserOrders from './userpages/userOrders';
import UserSignupPage from './userpages/userSignupPage';
import ViewDesProducts from './desigenerpage/viewDesigenerProducts';
export const url="https://6b67-14-139-162-2.ngrok-free.app";
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <div>Your path is incorrect </div>,
  },
  {
    path:"/UserLoginPage",
    element:<UserLoginPage/>,
  },
  {
    path:"/UserSignupPage",
    element:<UserSignupPage/>
  },
  {
    path:"/DesignerLoginPage",
    element:<DesignerLoginPage/>,
  },
  {
   path:"/DesignerSignupPage",
   element:<DesignerSignupPage/>,
  },
  {
    path:"/UserHomePage/:UserID",
    element:<UserHomePage/>,
  },
  {
    path:"/UserProfile/:UserID",
    element:<UserProfile/>,
  },
  {
    path:"/UpdateUserProfile/:UserID",
    element:<Updateuser/>,
  },
  {
    path:"/:userid/:productid",
    element:<ViewProduct/>,
  },

  {
    path:"/cart/:userid/",
    element:<Cart/>,
  },
  {
    path:"/userOrders/:userid",
    element:<UserOrders/>,
  },
  {
    path:"viewOrder/:orderID",
    element:<UserOrders/>,
  },
  {
    path:"/inspectOrder/:orderID",
    element:<ViewOrder/>
  },
  {
    path:"/DesignerLoginPage",
    element:<DesignerLoginPage/>,
  },
  {
    path:"/DesignerHomePage/:designerID",
    element:<DesignerHomePage/>,
  },
  {
    path:"/DesignerProfile/:designerID",
    element:<DesignerProfile />
  },
  {
    path:"/UpdateDesignerProfile/:designerID",
    element:<Updatedesigner/>,
  },
  {
    path:"/addYourDesigns/:designerID",
    element:<CreateProduct/>,
  },
  {
    path:"/viewDesigen/:productID",
  element:<ViewDesProducts/>  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
