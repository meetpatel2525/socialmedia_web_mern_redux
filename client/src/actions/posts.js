//* import all the things from the api file (* mens all)
import * as api  from '../api/api';

//get post

export  const getPost = (id) => async (dispatch)=>{
 
   try {
   dispatch({type:"START_LODING"})   
   const { data } = await api.fetchPost(id);  
   dispatch({type:'FETCH_POST', payload:{post:data}})
   dispatch({type:"END_LODING"})
} catch (error) {
   console.log(error.message);
}  
}

// get post and pagination 
 export  const getPosts = (page) => async (dispatch)=>{
 
    try {
    dispatch({type:"START_LODING"})
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);  
   dispatch({type:'FETCH_ALL', payload:{data, currentPage, numberOfPages}})
   dispatch({type:"END_LODING"})
} catch (error) {
    console.log(error.message);
 }  
}

//search action
export  const getPostsBySearch = (searchQuery) => async (dispatch)=>{
 
   try {

   dispatch({type:"START_LODING"})   
  
   const { data:{data} } = await api.fetchPostsBySearch(searchQuery);   
  
   dispatch({type:'FETCH_SEARCH', payload:{data}})

   dispatch({type:"END_LODING"})
} catch (error) {

   console.log(error.message);
}  
}

//create new post
export const createPost = (post,navigate)=> async (dispatch) =>{
  
   try {
      dispatch({type:"START_LODING"})   
      const {data} = await api.createPost(post);
      //dispatch uase for responce 
      dispatch ({type:'CREATE', payload:data})
      navigate(`/allpost/${data._id}`)
      dispatch({type:"END_LODING"})
   }catch (error){
console.log(error);
   }
}

//edit post 
export const updatePost = (id,post) => async (dispatch) => {

   try {

     const { data } = await api.updatePost(id,post);
     //dispatch uase for responce 
     dispatch({ type:'UPDATE', payload: data });
   
   } catch (error) {
     console.log(error.message);
   }

};

 //Delete post 
export const deletePost = (id) => async (dispatch) => {

   try {

       await api.deletePost(id);

     dispatch({ type:'DELETE', payload: id });
   
   } catch (error) {
     console.log(error.message);
   }
 };

  //like post 
export const likePost = (id) => async (dispatch) => {

   try {

     const { data } = await api.likePost(id);
     //dispatch uase for responce 
     dispatch({ type:'LIKE', payload: data });
   
   } catch (error) {
     console.log(error.message);
   }

};
