import axios from 'axios';


// use this if u dont want to write url and axios evrytime in api 
const API = axios.create({ baseURL: 'http://localhost:9002' });


// Axios interceptor interceptor is nothing but a function that gets called for every single HTTP request made and the response received by your application
//its hit to middelware in the server for authenticate the api  evry time after api call
API.interceptors.request.use((req) => {
    if (localStorage.getItem('AuthProfile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('AuthProfile')).token}`;
    }
    return req;
  });

  //apis

  export const fetchPost = (id)=> API.get(`/post/${id}`);

  //for pagination 
export const fetchPosts = (page)=> API.get(`/allpost?page=${page}`);

//two search ruery in one api 
export const fetchPostsBySearch = (searchQuery)=> API.get(`/allpost/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newpost)=> API.post('/newposts',newpost);

export const updatePost = (id,updateedPost)=> API.patch(`/editpost/${id}`,updateedPost);

export const deletePost = (id)=> API.delete(`/deletepost/${id}`);

export const likePost = (id)=> API.patch(`/likepost/${id}`);


export const signIn = (form)=> API.post('/user/signin',form);

export const signUp = (form)=> API.post('/user/signup',form);
