import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { margin } from "@mui/system";
import {signin,signup} from '../../actions/auth'

//css

const paper = {
  marginTop: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 30,
};
const root = {
  // '& .MuiTextField-root': {
  //   margin: theme.spacing(1),
};
const avatar = {
  margin: 6,
  backgroundColor: "#1976d2",
};
const forms = {
  width: "100%", // Fix IE 11 issue.
  marginTop: 20,
};
const submit = {
  margin: "20px 0px 2px",
};
const googleButton = {
  marginTop: 15,
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// client secrate = 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

  const Auth = () => {

    //for srore form data
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for hide password and show password
  const [showPassword, setShowPassword] = useState(false);

  //for swich show password and hide
  const handleShowPassword = () => setShowPassword(!showPassword);

  //switch for login page and registration page function 
  const switchMode = () => {
    setForm(initialState);
    // for switch Signup true and false 
    setIsSignup((prevIsSignup) => !prevIsSignup);
    //for hide password when switch to registerpage or login
    setShowPassword(false);  
};


  //for store the input data
  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value });


// for menual login form 

  const handleSubmit = (e) => {
    e.preventDefault();

    //if isSignup is true 
    if (isSignup) {
      dispatch(signup(form, navigate));

    } else {
      dispatch(signin(form, navigate));
    }
  };

    //for after google susses login update the store using despatch 
  const googleSuccess = async (res) => {

      //if some time we dont get the object output its dont get error thas why we use this condition 
      const result = res?.profileObj;
      const token = res?.tokenId;
      
      try {
    //after google susses get response update the store in resuser using despatch 
    dispatch({ type: "AUTH", data: { result, token } })
        navigate ('/');
      } catch (error) {
        console.log(error);
      }
    }

  //for google error
  const googleError = (error) => {
    console.log(error);
    alert("Google Sign In was unsuccessful. Try again later");
  }


  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper style={paper} elevation={3}>
          <Avatar style={avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form style={forms} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* //if user click Signup than only it show this registration for  */}
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}

              {/* login for  */}

              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />

              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "Password"}
                handleShowPassword={handleShowPassword}
              />

              {/* //if user enter isSignup than only its show the reenter password */}

              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}

            </Grid>

            <Button
              style={submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <GoogleLogin
              clientId="277228600812-8857j836kt2s8flq5s13cjmdffq6d244.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button style={googleButton} color="primary" fullWidth
                  onClick={renderProps.onClick} 
        disabled={renderProps.disabled} 
             startIcon={<Icon/>} variant="contained">
                Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />

            <Grid container justify="flex-end">
              <Grid item>
                {/* from this button the sigin and sigup is triger the model  */}

                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
