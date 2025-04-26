import mongoose , {Schema} from "mongoose"

const campaignSchema = new Schema (
  {
    creator:{
      type: Schema.Types.ObjectId,
      ref:"User",
      index:true,
      required: true,
    },
    name:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    status:{
      type:String,
      enum: ["active", "inactive", "deleted"],
      default:"active"
    },
    leads:[],
    accountIds:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  { timestamps: true }
)

export const Campaign = mongoose.model("Campaign" , campaignSchema)