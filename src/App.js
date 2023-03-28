import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';


function App() {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: error => console.log('Login Fail', error)
  })
  useEffect(() => {
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        setProfile(res.data);
      }).catch((err) => console.log(err));
    }
  }, [user])
  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <div className='google'>
      
      
        <h1>React Google Login</h1>
         
      
      {profile ? (
        <div className='profile'>
          <img src={profile.picture} alt="user image" /> <br /><br />
          <h2>User Logged in</h2><br />
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button type="button" class="btn btn-danger btn-lg" onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button type="button" class="btn btn-success" btn-lg onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  )
}
export default App;
