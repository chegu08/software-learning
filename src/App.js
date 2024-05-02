import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { url } from '.';
function App() {

  // useEffect(() => {
  //   const fetchGoogleLoginUrl = async () => {
  //     try {
  //       const response = await axios.post(`${url}/request`);
  //       const googleLoginUrl = response.data.link;
  //       console.log(googleLoginUrl);
  //       window.location.href = googleLoginUrl;
  //        // Redirect to the Google login URL
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  
  //   fetchGoogleLoginUrl(); // Call the asynchronous function immediately
  // }, []); // Empty dependency array to ensure useEffect runs only once on component mount
  
  
  return (
    <div className="App">
      <div>If you are a user click here</div>
      <Link to="/UserSignupPage">User  SignUp Page</Link><br></br>
      <div>If you are  a designer click here</div>
      <Link to="/DesignerSignupPage">Designer SignUp Page</Link>
    </div>
  );
}

export default App;
