import React, { useState, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import Login from './login';
import '../styles/index.css';
import { useRouter } from 'next/router';
export default function MyApp({ Component, pageProps }) {
  const [userAuth, setuserAuth] = useState('');

  const router = useRouter();
  useEffect(() => {
    const value = localStorage.getItem('user');
    if (value) {
      setuserAuth(value);
    }
  }, []);

  const login = (email) => {
    setuserAuth(email);
    localStorage.setItem('user', email);
  };
  const logout = () => {
    setuserAuth('');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!userAuth) {
    return (
      <AuthContext.Provider value={{ userAuth, login, logout }}>
        <Login />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ userAuth, login, logout }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
