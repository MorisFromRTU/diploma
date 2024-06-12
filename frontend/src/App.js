import AppRouter from "./components/AppRouter";
import './styles/App.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
const App = React.memo(() =>{

  return (
      <AuthProvider>
          <BrowserRouter>
              <AppRouter/>
          </BrowserRouter>
      </AuthProvider>

   
  );
});

export default App;
