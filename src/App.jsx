import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components';
import { Home, Login, CourseList, Schedule } from './pages';
import "./styles/globals.scss";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>
    </Routes>
  </BrowserRouter>
);