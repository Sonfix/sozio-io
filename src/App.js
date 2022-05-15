import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/user_handling/login';
import Signup from './components/user_handling/signup';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import LandingPage from './components/landing_page';
import SozioMaker from './components/soziomaker';

function App() {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
              <Route exact path='/app' element={<SozioMaker />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
