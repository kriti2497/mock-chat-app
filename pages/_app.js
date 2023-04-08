import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/auth-context';
import Login from './login';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [userAuth, setuserAuth] = useState('');

  if (!userAuth) {
    return (
      <AuthContext.Provider value={{ userAuth, setuserAuth }}>
        <Login />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ userAuth, setuserAuth }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
