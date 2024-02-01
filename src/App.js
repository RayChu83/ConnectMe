import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './Redux/store';
import UserLayout from './Layouts/UserLayout';
import AppLayout from './Layouts/AppLayout';
import LoggedInProtectedLayout from './Layouts/LoggedInProtectedLayout';
import LoggedOutProtectedLayout from './Layouts/LoggedOutProtectedLayout';
import Home from './Components/Home';
import About from './Components/About';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';
import ProfileLayout from './Layouts/ProfileLayout';
import ProfileFollowing from './Components/ProfileFollowing';
import ProfileFollowers from './Components/ProfileFollowers';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout/>}>
            <Route path="/" element={<AppLayout />}>
              <Route element={<LoggedInProtectedLayout />}>
                <Route index element={<Home />}/>
                <Route path='profile' element={<ProfileLayout/>}>
                  <Route index element={<Profile/>}/>
                  <Route path='following' element={<ProfileFollowing/>}/>
                  <Route path='followers' element={<ProfileFollowers/>}/>
                </Route>
              </Route>
              <Route path='about' element={<About />}/>
            </Route>
            <Route element={<LoggedOutProtectedLayout />}>
              <Route path='login' element={<Login />}/>
              <Route path='register' element={<Register />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
