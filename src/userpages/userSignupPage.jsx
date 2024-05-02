import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { url } from "..";
import Cookies from "js-cookie";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust as needed */
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-evenly; /* or space-around for more space around inputs */
  width: 100%;
  margin-bottom: 20px; /* Increased spacing between rows */
`;

const InputLabel = styled.div`
  width: 45%;
  text-align: right;
  padding-right: 10px;
  align-self:center;
`;

const InputField = styled.input`
  width: 45%;
  height: 40px; /* Increased height of input fields */
  font-size: 16px; /* Increased font size */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  left:80px;
  position:relative;
  margin-top: 20px; /* Added margin to separate button from inputs */
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 15px 30px; /* Increased padding */
  cursor: pointer;
  font-size: 18px; /* Increased font size */
  margin-bottom: 10px; /* Added margin between buttons */
`;

function UserSignupPage() {
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonumber] = useState(0);
  const [password, setPassword] = useState("");
  const [mailId, setMailId] = useState("");
  const [img, setImg] = useState(null);

  const uploadImg = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImg(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const navigate = useNavigate();

  const addEmployee = () => {
    axios
      .post(`${url}/signup/createuser`, {
        username: username,
        age: age,
        gender: gender,
        address: address,
        phonenumber: phonenumber,
        password: password,
        mailID: mailId,
        userdp: img,
      })
      .then((res) => {
        const userid = res.data.userid;
        console.log(userid);
        console.log("data sent");
        alert("User added successfully");
        Cookies.set("userid", userid);
        Cookies.set("password", password);
        navigate(`/UserHomePage/${userid}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <FormContainer>
      <div className="Information">
        <InputRow>
          <InputLabel>name:</InputLabel>
          <InputField
            placeholder="name"
            type="text"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <InputLabel>age:</InputLabel>
          <InputField
            placeholder="age"
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </InputRow>
        <InputRow>
          <InputLabel>address:</InputLabel>
          <InputField
            placeholder="address"
            type="text"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <InputLabel>gender:</InputLabel>
          <InputField
            placeholder="gender"
            type="text"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </InputRow>
        <InputRow>
          <InputLabel>phonenumber:</InputLabel>
          <InputField
            placeholder="phnum"
            type="number"
            className="wage"
            onChange={(event) => {
              setPhonumber(event.target.value);
            }}
          />
          <InputLabel>password:</InputLabel>
          <InputField
            placeholder="password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </InputRow>
        <InputRow>
          <InputLabel>mailID:</InputLabel>
          <InputField
            placeholder="mailID"
            type="email"
            onChange={(event) => {
              setMailId(event.target.value);
            }}
          />
          <InputLabel>upload:</InputLabel>
          <InputField
            type="file"
            accept="image/*"
            onChange={uploadImg}
            style={{ width: "45%" }}
          />
        </InputRow>
        <ButtonContainer>
          <Button onClick={addEmployee}>Add Employee</Button>
          <Link to="/UserLoginPage">Click here to Login</Link>
        </ButtonContainer>
      </div>
    </FormContainer>
  );
}

export default UserSignupPage;
