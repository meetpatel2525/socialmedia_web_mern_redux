
import PostMessage from "../Models/postsMessage.mjs";

//for display posts 
export const getposts = async (req,res,next)=>{

const {page} =  req.query;

    try{
        
    const LIMIT = 6;

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
   
   
    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
console.log("page loded response");
    }catch (error){
        res.status(404).json({message: error.message})
    }
    }

    
//for display  post details 
export const getpostDetail = async (req,res,next)=>{

    const {id} =  req.params;
    
        try{
const post = await PostMessage.findById(id)

        res.status(200).json(post);

        }catch (error){
            res.status(404).json({message: error.message})
        }
        }
    
//Search Posts by 

    export const getpostsBySearch = async (req,res,next)=>{

        //for two query search we use one api 

console.log("search call");
        const { searchQuery, tags } = req.query;

        try{
           //search bye titale
            const title = new RegExp(searchQuery, "i");
            
            //$or is use for example faind the title or faind the tages // $in is use for multiple values 
// hear we search two query and second one qury is a multiple tags search at a time 
const post = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
            res.status(200).json({data:post})

        }catch (error){
            res.status(404).json({message: error.message})
        }
        }
    

//for create post 
export const createpost = async (req,res,next)=>{

const  post = req.body;
   
const newPostMessage = new PostMessage({...post, creator:req.userId ,createdAt:  new Date().toISOString()})
 
        
       try {
       
              await newPostMessage.save();

            res.status(201).json(newPostMessage );
        } catch (error) {
            res.status(405).json({ message: error.message });
        }
    }

//for edit the post 
export const updatePost = async (req,res,next)=>{

    const {id} = req.params;

    const { title, message, creator, selectedFile, tags } = req.body;

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id,updatedPost,{new :true})

   res.json(updatedPost)

}

//for delete the posts 

export const deletePost = async (req,res,next)=>{

    const {id} = req.params;

    await PostMessage.findByIdAndRemove(id)
 
    res.json({message:'Posts is Deleted'})

}

// like the post

export const likePost = async (req,res,next)=>{

    console.log("like");

const {id} = req.params;

//  req.userId come from the middelwer folder 
//if user authoris than only user can like 
if(!req.userId) return res.json({message:"unAuthenticateduser"})

const post =  await PostMessage.findById(id)

//for only one user like post once 
const index = post.likes.findIndex((id)=>id === String(req.userId));

// console.log(index);

if(index === -1){
//like the post 
post.likes.push(req.userId)
}else{
//dis like 
post.likes = post.likes.filter((id)=> id !== String(req.userId));
}
const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{new :true});

res.json(updatedPost)

}









