import React from 'react'
import {
    Paper, Typography, CircularProgress, Divider,Card,Grid
  } from "@mui/material";
  import moment from 'moment'; 
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPost} from '../../actions/posts';
import { useState } from 'react';
import { getPosts } from '../../actions/posts';
import { getPostsBySearch } from '../../actions/posts';

const  media = {
    borderRadius: '20px',
    objectFit: 'cover',
    // width: '100%',
    maxHeight: '600px',

  }

  const card = {
    display: 'flex',
    width: '100%',
    // [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    // },
  }

  const section = {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  }

  const  imageSection = {
    marginLeft: '20px',
    // [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    // },
  }

 const recommendedPost = {
    display: 'flex',
    // [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      // marginLeft:"10px 10px 0px 100px "

      borderRadius: "15px",

    // },
  }


 const loadingPaper= {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', padding: '20px',
     borderRadius: '15px', height: '39vh',
  }


  const repost = {
    // display: 'flex',
    //  justifyContent: 'center',
    //   alignItems: 'center',
    //   // margin:"-120px 10px 10px -300px",
    //    padding: '20px',
    //     borderRadius: '8px',
    //      height: '39vh',
  }

const PostsDetails = () => {
  
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();



    //for update data on id change 
    useEffect(() => {
        dispatch(getPost(id));
      }, [id]);


      //if the state data is lose when refresh the page its run the search api and show the data
      useEffect(() => {
        if (post) {
          //we serch using tage becode in backend we have multiple serch on tages so
          dispatch(getPostsBySearch({ search: "" , tags: post?.tags.join(',') }));
        }
      }, [post]);

      if (!post) return null;

      //open othe post detail
      const openPost = (_id) => navigate(`/allpost/${_id}`);


    //for loder 
      if (isLoading) {
        return (
          <Paper style={loadingPaper} elevation={6} >
            <CircularProgress size="7em" />
          </Paper>
        );
      }
  
      console.log(posts)

  //for recomented post 
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

   return (

    <>

{/* //post detail code  */}

<Grid >

<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div style={card} >
        <div style={section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div style={imageSection} >
          <img  style={media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {/* //recomented Posts */}

      {!!recommendedPosts.length && (
        <div  item xs={12} sm={6} md={6} lg={4}  style={section} >
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div style={recommendedPost} >
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px ', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id} >
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img style={repost} src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
          </div>
      )}

    </Paper>


</Grid>



    </>
  
    )
}

export default PostsDetails