// Import the mongoose module for MongoDB object modeling
const mongoose = require('mongoose');

// Define the User schema with fields and their types
const UserSchema = new mongoose.Schema({
    // User's name
    name: {
        type: String,
        required: true, // Field is required
    },
    // User's email address
    email: {
        type: String,
        required: true, // Field is required
        unique: true // Ensures email addresses are unique
    },
    // User's password
    password: {
        type: String,
        required: true, // Field is required
    },
    // User's phone number
    phone: {
        type: String,
        required: true, // Field is required
    },
    // Type of user, either 'owner' or 'customer'
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","transgender"],

    },
    hobbies:{
        type:[String],
        required:true
    },
    // Timestamp for when the user document was created
    createAt: {
        type: Date,
        
        default: Date.now // Sets the default value to the current date and time
    }
});

// Create a model for the User schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
