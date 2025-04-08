const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,
  list: [
    {
      destinationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Destination', 
      },
      destinationType: {
        type: String,
        required: true,
        enum: ['City', 'Hiking', 'Island'],
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});


userSchema.methods.addToList = async function (destination) {
  const alreadyInList = this.list.find(
    (item) =>
      item.destinationId.toString() === destination._id.toString() &&
      item.destinationType === destination.type
  );

  if (alreadyInList) {
    return false; 
  }

  this.list.push({
    destinationId: destination._id,
    destinationType: destination.type,
  });

  await this.save();
  return true; 
};

userSchema.methods.deleteDestinationFromList = async function (destinationId, destinationType) {
  this.list = this.list.filter(
    (item) =>
      item.destinationId.toString() !== destinationId.toString() ||
      item.destinationType !== destinationType
  );

  return this.save();
};

userSchema.methods.clearList = async function () {
  this.list = [];
  return this.save();
};

userSchema.virtual('populatedList', {
  ref: 'Destination',
  localField: 'list.destinationId',
  foreignField: '_id',
});

userSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', userSchema);
