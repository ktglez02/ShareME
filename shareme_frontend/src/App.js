// type rafce to create the base for a react export arrow function component.
//double click on the component, click control + space to import the component
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Home from './container/Home';


const App = () => {

  

    return (
        <GoogleOAuthProvider 
        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
        >
        <Routes>
           
            <Route path="login"
                element={<Login/>}/>
           
            <Route path="/*"
                element={<Home/>}/>
        </Routes>
        </GoogleOAuthProvider>
    )
}

export default App;
