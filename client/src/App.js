import React from "react";
import Container from "@mui/material/Container";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route ,Navigate  } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostsDetails from "./components/postDetails/PostsDetails";

function App() {

// for rauting authentication  
// const user = JSON.parse(localStorage.getItem('AuthProfile'))


  return (
    <>
<BrowserRouter>
<Container maxWidth="ml">
<Navbar/>
<Routes> 
{/* //for  replace url "/" to "/posts"  */}
<Route exact path="/"  element={<Navigate replace to="/allpost" />} />
<Route exact path="/allpost" element={<Home/>}/>

<Route exact path="/allpost/search" element={<Home/>}/>
<Route exact path="/allpost/:id" element={<PostsDetails/>}/>

{/* if user is alredy login than it can not go to loginpage or registerpage  */}
{/* ic can only go to login page or register when it hase not loged in  */}
{/* <Route exact path="/auther" element={ (!user ? <Auth/> : <Navigate replace to="/allpost"/> )}/> */}
  <Route exact path="/auther" element={  <Auth/>}/>

  </Routes> 
  </Container>
</BrowserRouter>
    </>
  );
}

export default App;
