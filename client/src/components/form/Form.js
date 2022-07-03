import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FileBase from "react-file-base64";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";


const   paper = {
  borderRadius: "15px",
  // padding: "10px",
  // margin: "0px -130px 0px 0px "
}

 const  form = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: "6%",

}

const  fileInput = {
  width: '91%',
  margin: '0px 0px 0px -10px',
  marginBottom: 10,
  marginTop:15,

  borderRadius: "7px",
  position:"relative",
  background:"#000",
  border:"1px solid #999999",
  padding:"15px",
  color:"#fff",
  fontFamily:"sans-serif",
  fontSize:"12px",
}

const  formspace = {
  // marginBottom: 15,
  marginTop:15
}

const formsubmit = {
  padding: "10px",
  marginBottom: 15,
  margin:"1px 1px 1px -10px",
}

const div = {

  height:"20%",
  width:"100%"
}

const Form = ({ currentId, setCurrentId }) => {
 
const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  //for get the data in a edit page
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
   //useSelector hook is used to extract “value” from the global state


  //useDispatch hook is used to dispatch an action while useSelector hook is used to get the state from the redux store
  const dispatch = useDispatch();
 
  const navigate =  useNavigate()

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  // get data in edit page END

//for get curent login user data 
  const user = JSON.parse(localStorage.getItem('AuthProfile'));

  //for clear the form
  const clear = () => {

    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  //submit data to action
  const handleSubmit = async (e) => {
  
    e.preventDefault();

    //condition for edit and create new post
    if (!currentId) {
   
      dispatch(createPost({...postData,name:user?.result?.name},navigate));
      clear();
    } else {

      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

//for not show the form if user is not login 

  if (!user?.result?.name) {
    return (
      <Paper >
        <Typography variant="h6" align="center">
          Please Sign In to create your Posts and like other's Posts.
        </Typography>
      </Paper>
    );
  }
  
  
  return (
    <>
      <Paper  style={paper} >
        <form
     style={form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
   
       <Typography  variant="h6">
       <b>
            {currentId ? `Update "${post.title}"` :  <b>Creating a Posts</b>}
            </b> 
          </Typography>
      

          <TextField
            style={formspace}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
             style={formspace}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
             style={formspace}
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />

          {/* //for image uplode  */}

          <div   style={fileInput} >
            <FileBase  
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
            
          </div>
          
          <div style={div}>
          <div style={formsubmit} >
          <Button
        
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          </div>
          <div style={formsubmit} >
          <Button
     
            variant="contained"
            color="secondary"
            size="large"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
          </div>
          </div>
        

        </form>
      </Paper>
    </>
  );
};

export default Form;
