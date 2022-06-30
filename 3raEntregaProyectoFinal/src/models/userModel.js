import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  shoppingCar:{
    type: String
  }
});

const user = mongoose.model("users", UserSchema);

export default user