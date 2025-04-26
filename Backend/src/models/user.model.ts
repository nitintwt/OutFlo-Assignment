import mongoose , {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true
    },
    refreshToken:{
      type:String
    },
    campaigns:[
      {
        type: Schema.Types.ObjectId,
        ref:'Campaign'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next(); 
  this.password = await bcrypt.hash(this.password, 10)
  next() 
})

export const User = mongoose.model("User" , userSchema)