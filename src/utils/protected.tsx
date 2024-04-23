// utils/protected.tsx

import React from 'react';
import { Navigate} from 'react-router-dom';

import { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { AppRootState } from '../redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const AdminPublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("adminToken") || null;
  
  return token ? (
    <Navigate to='/admin/home'/>
  ) : (
    <>{children}</>
  );
};

export const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("adminToken") || null;
  
  return token ? (
    <>{children}</>
  ) : (
    <Navigate to='/admin/login' />
  );
};

export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token") || null;
  // const access_token: string | null = localStorage.getItem("access_token") || null;

  if(token) {
    // // Decode the token to access its payload and Extract username from the decoded token
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);

    if(decodedToken.role == "recruiter") {
      return <Navigate to='/recruiter/career'/>
    } else {
      return <Navigate to='/applicant/home'/>
    }
    
  } else {
    return <>{children}</>
  }
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token") || null;
  const { email } = useSelector((state: AppRootState) => state.userSignup);

  // Check if token exists or email is present
  const isAuthenticated = token || (email && email.trim() !== '');

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to='/signup' />
  );
};

export const RecruiterProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token") || null;
  
  return token ? (
    <>{children}</>
  ) : (
    <Navigate to='/signup' />
  );
};

export const ApplicantProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token") || null;
  
  return token ? (
    <>{children}</>
  ) : (
    <Navigate to='/signup' />
  );
};
