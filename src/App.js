import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './components/utils/PrivateRoute';
import LandingPage from './components/landing_page';
import SozioMaker from './components/soziomaker';
import AboutPage from "./components/about"
import { DocumentProvider } from './contexts/DocumentContext';

function App() {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Router>
          <AuthProvider>
            <DocumentProvider>
              <Routes>
                <Route path='/' element={<LandingPage />}></Route>
                <Route exact path='/app' element={<SozioMaker />}></Route>
                <Route exact path='/about' element={<AboutPage />}></Route>
              </Routes>
            </DocumentProvider>
          </AuthProvider>
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
