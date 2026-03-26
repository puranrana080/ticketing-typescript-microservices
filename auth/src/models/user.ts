import mongoose from "mongoose";
import { Password } from "../services/password.ts";
//an interface that describe the properties that are 
//required to create a new user
interface UserAttrs {
    email:string;
    password:string;
}
//an interface that describe the properties  that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs:UserAttrs):UserDoc;
}
//interface that describe the properties that a user document has
interface UserDoc extends mongoose.Document{
    email :string;
    password:string;
}


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v
        }
    }
});

userSchema.pre('save',async function(){
   if (this.isModified('password')) {
    this.password = await Password.toHash(this.password);
  }
    

})

userSchema.statics.build =(attrs:UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc,UserModel>('User',userSchema);

export {User}