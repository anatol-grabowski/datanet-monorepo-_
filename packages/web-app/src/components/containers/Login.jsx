import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Login() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('user'));
    setUser(usr);
  }, [])
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
          localStorage.setItem('auth', credentialResponse.credential)
          localStorage.setItem('user', JSON.stringify(decoded))
          setUser(decoded);
          console.log("Logged in", credentialResponse, decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <div>
        {'Logged in as: ' + user?.email}
      </div>
      <button onClick={() => {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        setUser(null);
      }}>Logout</button>
    </div>
  )
}
