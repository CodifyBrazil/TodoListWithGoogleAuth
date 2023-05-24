import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState([null])
  const [profile, setProfile] = useState([null])

  const login = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (response) => console.log(response),
  })

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            Headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${user.access_token}`,
            },
          },
        )
        .then((response: any) => setProfile(response.data))
        .catch((error: any) => console.log(error))
    }
  }, [user])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  console.log(profile)

  return (
    <div>
      <h2>Google Login</h2>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  )
}

export default App
