// import axios from "axios";
// import "./userProfile.css"
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { url } from "..";
// function UserProfile() {
//     const [userData, setUserData]=useState({})
//     const params = useParams()
//       let userid=params.UserID
//       console.log("user id:")
//      console.log(userid)

//    useEffect(()=>{
//     axios.post(`${url}/homepage/userprofile/`,{
//         userid:userid,
//     })
//    .then((res)=>{
//     console.log(res)
//      setUserData(res.data)
//    })
//    .catch((err)=>{
//     console.log(err)
//    });

//    },[])
   
//     return(
//         <div className="UserProfileBody">
    
//          <div>{userData.username}</div>
//          <div>{userData.age}</div>
//          <div>{userData.gender}</div>
//          <div>{userData.address}</div>
//          <div>{userData.phonenumber/*phone number must be changed to number*/ }</div>
//          <div>{userData.mailID}</div>
//         <img src={userData.dp} height="200px" width="300px" />
//         </div>
//     )
// };
// export default UserProfile;
import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "..";

const UserProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e; /* Light black-grey mix background color */
`;

const UserProfileGlass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px); /* Glass-like effect */
  background-color: rgba(255, 255, 255, 0.7); /* Glass-like background with transparency */
  box-shadow: bisque 0px 0px 20px; /* Box shadow with bisque color and 20px offset */
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: #b2b2b2 0px 0px 20px;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const UserInfoLabel = styled.div`
  font-weight: bold;
`;

const UpdateUserBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const UpdateInput = styled.textarea`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const UpdateButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default function UserPage() {
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({});
  const params = useParams();
  let userid = params.UserID;

  const getDet = () => {
    axios
      .post(`${url}/homepage/userprofile/`, {
        userid: userid,
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateuser = () => {
    axios
      .put(`${url}/homepage/userprofile/update`, {
        userid: userid,
        username: userData.username,
        age: userData.age,
        gender: userData.gender,
        phonenumber: userData.phonenumber,
        mailID: userData.mailID,
      })
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDet();
  }, []);

  const DetailButton = styled.button`
    background-color: #4caf50; /* Green button background color */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049; /* Darker green on hover */
    }
  `;

  return (
    <>
      <UserProfileBody>
        <UserProfileGlass>
          <ImageContainer>
            <UserImage src={userData.dp} alt="User" />
          </ImageContainer>
          <UserDetails>
            <UserInfoRow>
              <UserInfoLabel>Username:</UserInfoLabel>
              <div>{userData.username}</div>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>Age:</UserInfoLabel>
              <div>{userData.age}</div>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>Gender:</UserInfoLabel>
              <div>{userData.gender}</div>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>Address:</UserInfoLabel>
              <div>{userData.address}</div>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>Phone Number:</UserInfoLabel>
              <div>{userData.phonenumber}</div>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>Email:</UserInfoLabel>
              <div>{userData.mailID}</div>
            </UserInfoRow>
          </UserDetails>
        </UserProfileGlass>
      </UserProfileBody>
      {editProfile ? (
        <UpdateUserBody>
          <UpdateInputContainer>
            <UpdateInput name="username" value={userData.username} placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            <UpdateInput name="age" value={userData.age} placeholder="Age" onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
            <UpdateInput name="gender" value={userData.gender} placeholder="Gender" onChange={(e) => setUserData({ ...userData, gender: e.target.value })} />
            <UpdateInput name="address" value={userData.address} placeholder="Address" onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
            <UpdateInput name="phonenumber" value={userData.phonenumber} placeholder="Phone Number" onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })} />
            <UpdateInput name="mailID" value={userData.mailID} placeholder="Email" onChange={(e) => setUserData({ ...userData, mailID: e.target.value })} />
          </UpdateInputContainer>
          <UpdateButton onClick={() => {updateuser(); setEditProfile(false);}}>Save Changes</UpdateButton>
        </UpdateUserBody>
      ) : (
        <DetailButton onClick={() => setEditProfile(true)}>Edit Profile</DetailButton>
      )}
    </>
  );
}
