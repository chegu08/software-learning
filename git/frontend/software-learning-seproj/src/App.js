import { Link } from 'react-router-dom';
function App() {

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
