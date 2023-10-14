import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen.tsx";
import ProductScreen from "./screens/ProductScreen/ProductScreen.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import LoginScreen from "./screens/AuthScreen/LoginScreen/LoginScreen.tsx";
import SignupScreen from "./screens/AuthScreen/SignUpScreen/SignupScreen.tsx";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen.tsx";
import OrdersScreen from "./screens/OrdersScreen/OrdersScreen.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "product/:id", element: <ProductScreen /> },
      { path: "login", element: <LoginScreen /> },
      { path: "signup", element: <SignupScreen /> },
      { path: "shipping", element: <ShippingScreen /> },
      { path: "orders", element: <OrdersScreen /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
