import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './router/router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="my-container">
  <AuthProvider>
  <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>,
  </AuthProvider>
  </div>
)
