import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const media = {
  height: 0,
  paddingTop: "56.25%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
};

const card = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
  // margin:"1px 0px 0px -100px "
};

const overlay = {
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
};

const overlay2 = {
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
};
const details = {
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
};
const title = {
  padding: "0 16px",
};
const cardActions = {
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
};

const postdetail = {
  display: "block",
  textAlign: "initial",
};

const Post = ({ post, setCurrentId }) => {
  // useDispatch hook is used to dispatch an action while useSelector hook is used to get the state from the redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for get curent login user data
  const user = JSON.parse(localStorage.getItem("AuthProfile"));

  //logic of like and unlike display ui
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like == (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  //like logic over

  //page detail

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    navigate(`/allpost/${post._id}`);
  };

  return (
    <>
      <Card style={card} raised elevation={6}>
        <ButtonBase
          style={postdetail}
          component="span"
          name="test"
          onClick={openPost}
        >
          <CardMedia
            style={media}
            image={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          {/* //for only owner of the post can edit  */}
          {(user?.result?.googleId == post?.creator ||
            user?.result?._id == post?.creator) && (
            <div style={overlay2}>
              <Button
          
                style={{ color: "white" }}
                size="small"
                onClick={(e) =>{
                  //stopPropagation This will stop any parent component's event from firing.
                  //  To use this: Make sure to pass the event object as a parameter.
                  //  Use the stopPropagation method on the event object above your code within your event handler function
                  e.stopPropagation();
                 setCurrentId(post._id)
                 }}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
          )}
          <div style={overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          <div style={details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography style={title} gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>

        <CardActions style={cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </Button>

          {/* //for only owner of the post can delete */}

          {(user?.result?.googleId == post?.creator ||
            user?.result?._id == post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};
export default Post;
