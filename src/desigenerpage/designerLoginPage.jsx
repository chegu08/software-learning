import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '..';
import './designerLoginPage.module.css';

function DesignerLoginPage() {
  const navigate = useNavigate();
  const [logindesignerName, setLogindesignerName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = () => {
    axios
      .post(`${url}/login/logindesigner`, {
        password: loginPassword,
        designername: logindesignerName
      })
      .then((res) => {
        if (res.data.message === 'Authenticated') {
          alert('Welcome to login page');
          const designerId = res.data.designerid;
          navigate(`/DesignerHomePage/${designerId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <input
        placeholder="Enter your designerName"
        type="text"
        onChange={(event) => {
          setLogindesignerName(event.target.value);
        }}
      ></input>
      <input
        placeholder="Enter your password"
        type="password"
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default DesignerLoginPage;
