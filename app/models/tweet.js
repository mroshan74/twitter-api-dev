const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tweetSchema = new Schema({
  user: {
    user_id:{
        type:String
    },
    screen_name: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  tweetList: [{
    tweet_id: {
      type: String,
    },
    created_at: {
      type: Date,
    },
    text: {
      type: String,
    },
  }],
})

const Tweet = mongoose.model('Tweet',tweetSchema)

module.exports = Tweet
