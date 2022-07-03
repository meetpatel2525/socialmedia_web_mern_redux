import React from 'react'
import Post from './post/Post'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@mui/material';

const mainContainer = {
  // display: 'flex',
  // alignItems: 'center',
  marginTop: "10px"
}
const  smMargin = {
  // margin: theme.spacing(1),
}
const actionDiv = {
  // textAlign: 'center',
}


const Posts = ({setCurrentId}) => {
  //for display post 
const {posts,isLoading} = useSelector((state)=> state.posts);
// useSelector hook is used to extract “value” from the global state


if(!posts.length && !isLoading) return  <b style={{color:"white"}}>
NO Posts Are Avialable </b>

return (
  
  <>

    {  isLoading ? <CircularProgress style={{color:"black"}} /> : 
    <Grid 
    style={mainContainer}
    // style={{ margin: "27% 0% 10% 10%" }}
    container alignItems="stretch" spacing={5}>
    {posts.map((post) => (  
      <Grid  key={post._id} item xs={12} sm={6} md={6} lg={4}>
      <Post  setCurrentId={setCurrentId}  post={post} /> 
      </Grid>
    ))}
  </Grid>
    }

</>

  )
  }

export default Posts
