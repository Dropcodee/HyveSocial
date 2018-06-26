const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: String
      },
      to: {
        type: String
      },
      current: {
        type: Boolean,
        required: true
      }
    }
  ],

  education: [
    {
      Department: {
        type: String
      },
      HomeAddress: {
        type: String
      },
      from: {
        type: String
      },
      to: {
        type: String
      },
      currentLevel: {
        type: Boolean,
        required: true
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
