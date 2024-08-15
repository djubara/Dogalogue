import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import DogFeed from './pages/DogFeed.jsx'
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DogFeed />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
]);
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
