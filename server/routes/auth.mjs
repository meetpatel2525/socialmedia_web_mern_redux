import  express  from "express";
import {signin,signup} from '../controllers/AuthComponent.mjs'


const authRouter = express.Router();

authRouter.post('/user/signin',signin);

authRouter.post('/user/signup',signup);


export default authRouter;

