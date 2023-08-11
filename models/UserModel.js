import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  avatar: String,
  avatarPublicId: String,
});

// instance method
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  // We need to apply this.toObject() because user is not a plain object, but a mongoose document that has additional properties and methods that are not part of the data. The toObject() method converts the mongoose document into a plain object that only contains the data and the virtual, without the mongoose magic parts
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
