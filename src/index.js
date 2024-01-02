import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BookProvider } from './context/BookContext';
import {AlertProvider} from './context/AlertContext'
import HomePage from './pages/HomePage';
import CheckOutPage from './pages/CheckOutPage';
import CatalogPage from './pages/CatalogPage';
import BookDetailsPage from './pages/BookDetailsPage';
import History from './components/History'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { FirebaseProvider } from './context/FirebaseContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/catalog",
    element: <CatalogPage />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
  {
    path: "/catalog/:id",
    element: <BookDetailsPage />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
    <BookProvider>
    <AlertProvider>
      <RouterProvider router={router} ></RouterProvider>
    </AlertProvider>
    </BookProvider>
    </FirebaseProvider>
  </React.StrictMode>

);

