//reduser is work on ui after dispather update the state and state  is update  and we write the code of what we want to show or update on state on ui

export default (state = { isLoading: true, posts: [] }, action) => {
  
  switch (action.type) {
   
//for loding 
    case 'START_LODING':

      return { ...state, isLoading: true };

      case 'END_LODING':

    return { ...state, isLoading: false };

    //for pagination
    case "FETCH_ALL":
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case "FETCH_SEARCH":   

    return  { ...state,posts:action.payload.data}

    case "FETCH_POST":   

    return  { ...state,post:action.payload.post}
    
    case "CREATE":

      return  { ...state,posts:[...state.posts,action.payload]} 
    
    //check which post is update from the store if update than give updated result otherwise show old post
      case "UPDATE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
      
    case "DELETE":
      return  {...state,posts:state.posts.filter((post) => post._id !== action.payload) } 
    
    case "LIKE":
      //check which post is like from the store if like than give updated result otherwise show old post
      return {...state,posts:state.posts.map((post) =>
        (post._id === action.payload._id ? action.payload : post
      ))
    } 
    default:
      return state;
  }
};
