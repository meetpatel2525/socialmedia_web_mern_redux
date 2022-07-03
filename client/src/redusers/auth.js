//reduser for authentication login

const authReducer = (state = { authData: null }, action) => {

  switch (action.type) {
    

    //for register ang login same reduser called

    case "AUTH":

      //action?.data  this method is optional chenting use for not get error give
      localStorage.setItem("AuthProfile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
  
    case "LOGOUT":
        
      localStorage.clear();

    return { ...state, authData: null, loading: false, errors: null };
    
    default:
      return state;
  }
};

export default authReducer;
