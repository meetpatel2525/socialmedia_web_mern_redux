import  express  from "express";
import {getpostDetail,getposts,createpost,updatePost,deletePost,likePost,getpostsBySearch} from '../controllers/PostsComponent.mjs'
const postRouter = express.Router();

//for authenticate
import Auth from '../middleware/auth.mjs'


//for  post detail
postRouter.get('/post/:id',getpostDetail);

//get all posts getpostsBySearch
postRouter.get('/allpost/search?',getpostsBySearch);

//get all posts
postRouter.get('/allpost',getposts);

//create post
postRouter.post('/newposts', Auth, createpost);

//edit   //patch is use for update 
postRouter.patch('/editpost/:id', Auth , updatePost);

// delete the post 
postRouter.delete('/deletepost/:id',Auth, deletePost);

//like the post
postRouter.patch('/likepost/:id', Auth, likePost);


export default postRouter;


