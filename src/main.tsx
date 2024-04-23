import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="951159550187-kb6kha0bkdmsu7mubakval1ft44tl3i8.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode></GoogleOAuthProvider>,
)