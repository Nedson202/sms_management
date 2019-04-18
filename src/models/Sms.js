import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { statusEnum, defaultStatus } from '../utils';

const SmsSchema = new Schema({
  receiver: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message cannot be blank']
  },
  status: {
    type: String,
    trim: true,
    enum: statusEnum,
    default: defaultStatus
  },
}, {
  timestamps: true
});

SmsSchema.plugin(mongoosePaginate);

const Sms = mongoose.model('Sms', SmsSchema);

export default Sms;
