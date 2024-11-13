const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema Definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,    
      lowercase: true, 
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Only required if the user is not logging in with Google
      },
    },
    googleId: {
      type: String,
      unique: true,   
      sparse: true,   // This allows a user to either have an email/password or googleId, not both
    },
    username: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false, // This can be populated when a user logs in via Google
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Hash password before saving (for email/password login)
userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare hashed password with the input password (for email/password login)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

