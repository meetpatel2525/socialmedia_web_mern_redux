import bcrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken"
import AuthUser from "../Models/AuthModel.mjs";

const secret = 'test';

//for login user authenticate

 export const signin = async (req,res,next)=>{

    const { email, password } = req.body;

    try{

 const oldUser = await AuthUser.findOne({email});

 if (!oldUser) return res.send({ message: "User doesn't exist" });

 const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

 if (!isPasswordCorrect) return res.send({ message: "Invalid credentials" });

 const token = Jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({result:oldUser,token, message: "Login sessesful"})
    }catch (error){
        res.status(404).json({message: error.message})
    }
    }

 //for registrat new user 
 
    export const signup = async (req,res,next)=>{

        const { email, password, firstName, lastName } = req.body;

        try {

          const oldUser = await AuthUser.findOne({ email });
      
          if (oldUser) return res.send({ message: "User already exists" });
      
        //   for store password safly use bacrypt
          const hashedPassword = await bcrypt.hash(password, 12);
      
          
          //create the user 
          const result = await AuthUser.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

          console.log(Jwt.sign);

        //   after create user it create token 
          const token = Jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "30d" } );
      
          console.log(token);
      
          res.status(201).json({ result, token,message: "Create Accunt sessesfully"  });
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
          
          console.log(error);
        }
       
    }