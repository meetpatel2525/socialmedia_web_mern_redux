import jwt from "jsonwebtoken";

const secret = 'test';


//middelwer for like the post only authenticat user or anytyp to action 


const Auth = async (req, res, next) => {

    try {

    //for get the token from the frontend 
    const token = req.headers.authorization.split(" ")[1];

    // check tghe typ of user
    // google token length is more than 500 so chek is local login or google login 
    const isCustomAuth = token.length < 500;

    let decodedData;


    //if server get custom user  typ and token data its go for check bye jwt 
    if (token && isCustomAuth) {      
     
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;

    }
    //and if google login user than check this 
    else {
      decodedData = jwt.decode(token);
//sub is difrent id in google auth
      req.userId = decodedData?.sub;
    }    

    //after all thing check its allu to do the actions to user and go for next 
    next();

// if all things are not curect its give error
  } catch (error) {
    console.log(error);
  }
};

export default Auth;