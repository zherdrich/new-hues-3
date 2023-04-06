import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

const CLIENT_ID = "235cb2acedda452f85b6309dab557b25"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const [token, setToekn] = useState("")

useEffect(() => {
   const hash = window.location.hash
   let token = window.localStorage.getItem("token")

   if(!token && hash) {

    token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

    console.log(token)
   }




}, [])

  return (
    <div className="App">
      <h1>new hues</h1>


      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
    </div>
  );
}

export default App;
