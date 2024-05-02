import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { url } from "..";
import styled from "styled-components";

const LoginFormContainer = styled.div`
  
  display: flex;
    flex-direction: column;
    align-items: center;
    /* left: 50px; */
    position: relative;
    margin-top: 20px;
}
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
background-color: #007bff;
color: #fff;
border: none;
padding: 15px 30px;
cursor: pointer;
/* align-self: center; */
font-size: 18px;
position: relative;
margin-bottom: 10px;
left: 70px;

`;

function UserLoginPage() {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post(`${url}/login/loginuser`, {
        password: loginPassword,
        username: loginUserName,
      })
      .then((res) => {
        if (res.data.message === "Authenticated") {
          alert("Welcome to the login page!");
          const userId = res.data.userid;
          console.log(userId);
          navigate(`/UserHomePage/${userId}`,{replace:true});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginFormContainer>
      <InputField
        placeholder="Enter your username"
        type="text"
        onChange={(event) => {
          setLoginUserName(event.target.value);
        }}
      />
      <InputField
        placeholder="Enter your password"
        type="password"
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      />
      <Button onClick={login}>Login</Button>
      <Link to="/UserSignupPage">
        
      </Link>
    </LoginFormContainer>
  );
}

export default UserLoginPage;
