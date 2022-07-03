//* import all the things from the api file (* mens all)
import * as api  from '../api/api';

// Action of login

export  const signin = (form,navigate) => async (dispatch)=>{
 
    try {

   const { data } = await api.signIn(form)

if((data.message == "Login sessesful")){
alert(data.message)
dispatch({type:'AUTH', data})
navigate("/");
}else{
   alert(data.message)
}

 } catch (error) {

    console.log(error.message);
 }  
}


//for registration 
export  const signup = (form,navigate) => async (dispatch)=>{
 
    try {    
                   
    const { data } = await api.signUp(form);  
    
if((data.message == "Create Accunt sessesfully")){
   alert(data.message)
   dispatch({type:'AUTH', data})
   navigate("/");
   }else{
      alert(data.message)
   }
 } catch (error) {

    console.log(error.message);
 }  
}