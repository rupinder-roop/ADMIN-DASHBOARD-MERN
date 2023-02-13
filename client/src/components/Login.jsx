import React, { useState } from "react";
import { Box, useMediaQuery,Avatar,TextField,Button,FormControlLabel,Checkbox,Link,Grid,useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from "axios";




const Login = () => {
    const theme = useTheme();
    const navigate=useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useSelector((state) => state.global.userId);
    const { data } = useGetUserQuery(userId);
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    });
    const [error,setError]=useState("");


    const handleChange = ({currentTarget:TextField}) => {
        setUser({...data, [TextField.name]: TextField.value});
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // const url="http://localhost:5001/";
            // const{data:res}= await axios.post(url,data);
            // localStorage.setItem("token",res.data);
            // Window.location ="/dashboard";
            // console.log(data)

            if(user.name==data.name){
                if(user.email==data.email){
                    if(user.password==data.password){
                        localStorage.setItem("token",",,jj")
                        navigate("/dashboard")
                        // console.log('98400fd8ead1d9ca2748008e6180de20e38dc130eefd449f3ce238c277ab40fa');
                        // navigate("/dashboard");
                    }
                }

            }else{
                console.log(user)
            }
            // console.log(res.message);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message);
            }
        }
    }

  
  
//   console.log(Userdata._id)
  // console.log(data.email);
  // console.log(data.password);

 

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADMIN LOGIN
          </Typography>
          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleChange}
              value={user.name}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              value={user.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={handleChange}
              value={user.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <div> {error} </div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{color:theme.palette.secondary[300]}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{color:theme.palette.secondary[300]}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      {/* <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <form >
          <label>Username</label>
          <TextField name="username"  />
          <label>Password</label>
          <TextField name="password"  />
          
          <Button variant="contained" color="primary">Submit</Button>
        </form>
     </div> */}
     
        <Outlet />
      </Box>
    </Box>
    
  );
};

export default Login;
