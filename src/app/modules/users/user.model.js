const mongoose =require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName:{
      type:String
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gender:{
      type:String
    },
    profileImg: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    dateOfBirth:{
      type:Date,
      default:Date.now()

    },
    loacation:{
      street:{
        type:String,

      },
      city:{
        type:String,
        
      },
      state:{
        type:String
      },
      coordinates:{
        latitude:{
          type:String,
          default:"72.4356"
        },
        longitude:{
          type:String,
          default:"28.23542"
        }
      },
    }
  },
  { timestamps: true }
);
module.exports = User = mongoose.model('user', UserSchema);