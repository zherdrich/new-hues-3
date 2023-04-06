import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const CLIENT_ID = "235cb2acedda452f85b6309dab557b25";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      // token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
      let urlParams = new URLSearchParams(
        window.location.hash.replace("#", "?")
      );
      let token = urlParams.get("access_token");

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };


  const searchAlbums = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization : `Bearer ${token}` 
      },
      params: {
        q: searchKey,
        type: "album"
      }
    })

    console.log(data);
  }




  return (
    <div className="App">
      <h1>new hues</h1>

      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      {token ? (
        <form onSubmit={searchAlbums}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2>Get Started</h2>
      )}
    </div>
  );
}

export default App;
