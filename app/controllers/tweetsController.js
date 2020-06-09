const Tweet = require('../models/tweet')
require('dotenv').config()
var Twitter = require('twitter')

module.exports.list = (req, res) => {
  Tweet.find({'user.screen_name': req.params.screen_name})
    .then((get) => {
      if (get.length == 0) {
        console.log(req.params.screen_name)
        var client = new Twitter({
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        })
        var params = {
          screen_name: req.params.screen_name,
          count: 10,
          trim_user: true,
          include_rts: false,
          exclude_replies: true,
        }
        client.get('statuses/user_timeline', params, function (
          error,
          tweets,
          response
        ) {
          if (!error) {
            //console.log(tweets)
            const user = {
              user_id: tweets[0].user.id,
              screen_name: req.params.screen_name,
            }
            const tweetList = tweets.map((ele) => {
              return {
                tweet_id: ele.id,
                created_at: ele.created_at,
                text: ele.text,
              }
            })
            const dataPack = Object.assign({}, { user }, { tweetList })
            //console.log(dataPack)
            //res.json(dataPack)
            const postTweet = new Tweet(dataPack)
            postTweet
              .save()
              .then((tweets) => {
                res.json(tweets)
              })
              .catch((err) => {
                res.json(err)
              })
          }
        })
      } 
      else {
          res.json(...get)
      }
    })
    .catch((err) => res.json(err))
}
