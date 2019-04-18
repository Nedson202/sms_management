import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import mongooseDelete from 'mongoose-delete';
import Helper from '../helper';
import { phoneField, passwordField } from '../utils';

const ContactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name cannot be blank']
  },
  password: {
    type: String,
    trim: true,
    min: 4,
    required: [true, 'Password cannot be blank'],
  },
  phoneNumber: {
    type: Number,
    trim: true,
    min: 11,
    unique: true,
    required: true
  },
}, {
  timestamps: true
});

ContactSchema.methods.generateToken = Helper.generateToken;

ContactSchema.path(phoneField).validate(async (value) => {
  const phoneNumberCount = await mongoose.models.Contact.countDocuments({ phoneNumber: value });
  return !phoneNumberCount;
}, 'Phone number is unavailable and cannot be used');

// eslint-disable-next-line func-names
ContactSchema.pre('save', function (next) {
  if (this.password && this.isModified(passwordField)) {
    this.password = Helper.hashPassword(this.password);
  }

  next();
});

ContactSchema.plugin(mongoosePaginate);
ContactSchema.plugin(mongooseDelete, { deletedAt: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
