import React from 'react'
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import memoryimage from '../../components/images/download.png';
import { Toolbar, Avatar, Button} from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

const appBar = {
    borderRadius: 15,
    margin: "30px auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
    color:"black"
    // width: "90%",
  };

const  heading =  {
    color: "#1976d2",
    textDecoration: 'none',
  }

  const image = {
    marginLeft: '15px',
  
  }

  const toolbar = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  }

  const profile = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  }
 
 const userName =  {
    display: 'flex',
    alignItems: 'center',
    margin : "0px 0px 0px 10px"
  }
  const  brandContainer = {
    display: 'flex',
    alignItems: 'center',
  }
 const purple = {
    // color: "#1976d2",
    
  
  }


const Navbar = () => {

const dispatch = useDispatch()

const naviget = useNavigate()

  //for ise of locations 
const  location = useLocation()

const [user,setUser] = useState(JSON.parse(localStorage.getItem("AuthProfile")))


//logout 
const logout = () => {

  dispatch({type: 'LOGOUT'})
  naviget("/auther") 
  setUser(null)
}


useEffect(()=>{

  // if jwt token expire than logout the user 
  const token = user?.token;
  if (token) {

    const decodedToken = decode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }

  setUser(JSON.parse(localStorage.getItem("AuthProfile")));

},[location]);

  return (
    <>
       <AppBar position="static" style={appBar}>
      
      <div style={brandContainer} >

      </div>

        <Typography style={heading}  variant="h2" align="center">
          My Posts
        </Typography>
        <img
          src={memoryimage}
          style={image}
          alt="memorys"
          height="70"
          width="70"
        /> 

        <Toolbar style={toolbar} >

{/* //if user login than only show this  */}

        {user?.result ? (
          <div  style={profile} >
            {/* //if user dont get the image in google loginthan it shows an  first charectore of name in image  */}
            <Avatar style={{  backgroundColor: (user?.result.imageUrl) ? null : "#1976d2"   ,
    margin : "0px 0px 0px 90px" }}
     alt={user?.result.name} 
     src={user?.result.imageUrl}>

   
            {/* //if user dont get the image than it shows an  0 number charectore of name in image  */}
            {user?.result.name.charAt(0)}
            </Avatar>
            
            <Typography  style={userName}   variant="h6">{user?.result.name}</Typography>
            <Button variant="contained"  color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auther" variant="contained" color="primary">Sign In</Button>
        )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
