import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    full_name:{
        type:String
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:Number,
    password:{
        type:String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    role:{
        type:String,
        enum:["user","admin","premium"],
        default:"premium"
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema);