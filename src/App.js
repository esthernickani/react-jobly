import logo from './logo.svg';
import { React, useEffect, useState } from "react";
import UserContext from './UserContext';
import './App.css';
import JoblyApi from './api';
import { BrowserRouter, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import { Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import Home from "./Home";

function App() {
  const [ token, setToken ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ errorLogin, setErrorLogin ] = useState([]);
  const [ errorSignup, setErrorSignup] = useState([]);
  const [ errorUpdate, setErrorUpdate ] = useState([]);


  //function to add token to api, state and local storage
  const addToken = (userToken) => {
    JoblyApi.token = userToken
    setToken(userToken)
    localStorage.setItem('token', userToken)
    console.log(userToken)
  }

  //function to login user and add token to state, if error, go to form page again and show e
  async function loginUser ({ username, password }) {
    try {
      let response = await JoblyApi.loginUser(username, password)
      addToken(response.token);
      //navigate('/', {replace: true});
    } catch (error) {
      setErrorLogin(error)
    }
  }

  //function to signup user and get user info
  async function signupUser (newUserInfo) {
    try {
      let response = await JoblyApi.registerUser(newUserInfo)
      addToken(response.token)
      //navigate('/', {replace: true})
    } catch (error) {
      setErrorSignup(error)
    }
  }

  //function to update user info
  async function updateUser(updatedInfo) {
    try {
      let response = await JoblyApi.updateUser(currentUser.username, updatedInfo)
      setCurrentUser(response.user)
    } catch (error) {
      setErrorUpdate(error)
    }
  }

  //remove token from state and local storage
  async function logoutUser() {
    setToken(null)
    localStorage.removeItem('token')
  }

  //function to apply to job
  async function applyJob(username, id) {
    try {
      let response = await JoblyApi.applyForJob(username, id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //to get user info, decode token
  useEffect(() => {
    //check if token is in local storage and add to state and api helper
    const tokenInLocalStorage = localStorage.getItem('token')
    console.log(tokenInLocalStorage)
    let currentToken = tokenInLocalStorage || null
    setToken(currentToken)
    //console.log(token)

    if (token) {
      JoblyApi.token = currentToken
      let decodedUser = jwtDecode(token)
      console.log(decodedUser)

      async function getUserDetail () {
        //console.log(decodedUser.username)
        let userDetail = await JoblyApi.getUser(decodedUser.username)
        setCurrentUser(userDetail.user)
      }
      getUserDetail()
    }

  }, [token])

  return (
    <UserContext.Provider value={{currentUser, logoutUser, applyJob}}>
      <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/companies" element={<CompanyList />} />
          <Route exact path="/companies/:handle" element={<CompanyDetail />} />
          <Route exact path="/jobs" element={<JobList />} />
          <Route exact path="/login" element={<LoginForm loginUser={loginUser} errorLogin={errorLogin} />} />
          <Route exact path="/signup" element={<SignupForm signupUser={signupUser} errorSignup={errorSignup} />} />
          <Route exact path="/profile" element={<Profile updateUser={updateUser} errorUpdate={errorUpdate}/>} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
