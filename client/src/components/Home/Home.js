import React from "react";
import Form from "../form/Form";
import Posts from "../posts/Posts";

import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  input
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../actions/posts";
import { useState } from "react";
import MyPagination from "../MyPagination";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../actions/posts";

const form = {
  marginTop: "40px",
  borderRadius: "9px",
};

const appsearchbar = {
  borderRadius: 4,
  marginBottom: '1rem',
  display: 'flex',
  padding: '16px',
} 
const searchButton = {
  borderRadius: 4,
  marginTop: '1rem',
  padding: '16px',
} 
const gridconteinor = {
  // [theme.breakpoints.down('xs')]: {
    // flexDirection: 'column-reverse',
  // },
}

const pagination = {
  marginTop: "20px",
  borderRadius: "9px",
};

// function for use qury in URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

  const Home = () => {
  //useDispatch hook is used to dispatch an action while useSelector hook is used to get the state from the redux store
  const dispatch = useDispatch();

  const navigte = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState('');
  const [currentId, setCurrentId] = useState("");
  const [tags, setTags] = useState([]);


//for update the components of posts when id is chnage and user update  any data 
// its update the dome when user is not searching 
  useEffect(() => {
    if(searchQuery==null){
      dispatch(getPosts());
      console.log(currentId);
    }
  }, [currentId,dispatch]);

//for search api call only after user try to refresh after search data
useEffect(() => {

  //for not call evry refresh 
    if(!(searchQuery==null)){
      console.log(" api redy to call");
      dispatch(getPostsBySearch({search:searchQuery, tags: tags.join(',') }));
    }
    console.log("api not called");
  }, []);

  //search function 
  
  const searchPost = () => {
  
    if (search.trim() || tags) {
    dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
    // after search get the url of reached item for search the perticuler serch item to other frds
    navigte(`/allpost/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigte('/');
    }
  };

console.log(page);

    //for call search 
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };

//add the tage  in array for multiple search
// const handleAddChip = (tag) => setTags([...tags, tag]);
// console.log(tags);

//for removie the tage from the array 
// const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            style={gridconteinor}
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid style={form} item md={3} xs={12} sm={6}>
            <AppBar  style={appsearchbar}  position="static" color="inherit">
            <TextField 
             onKeyDown={handleKeyPress}
              name="search" variant="outlined" label="Search Memories" fullWidth 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
               />

   {/* //multiple search input not set at npm error     */}

          {/* <Chips
                style={{ margin: '10px 0' }}
                value={tags}
                onchange={(e) => handleAddChip(e.target.value)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              /> */}

      <Button 
      onClick={searchPost}
       style={searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>

              <Form currentId={currentId} setCurrentId={setCurrentId} />
         
         {/* //for not sow the pagination when user search the post  */}
         {
           (!searchQuery  && !tags.length) && (
            <Paper style={pagination} elevation={6}>
                <MyPagination  page={page} />
              </Paper>
           )
         }
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
