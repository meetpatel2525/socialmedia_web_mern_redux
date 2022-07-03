import  mongoose  from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

//for login schima
const AuthSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // id: { type: String },
    //importent for switch model schimas 
    // timestamps: true,

})
//autoIncrement is use for increment the id automatecly at browser and at databaise 
AuthSchema.plugin(autoIncrement,'AuthUser');

//model of login
const AuthUser = new mongoose.model("AuthUser", AuthSchema)

export default AuthUser ;