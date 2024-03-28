import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route  path='register' element={<Register />} />
      <Route path='login' element={<Login />}  />
      <Route path='/' element={<Home />} />
    </Route>

  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
