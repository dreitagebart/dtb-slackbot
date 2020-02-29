const { App } = require("@slack/bolt")

exports.Bot = (token, signingSecret) =>
  new App({
    token,
    signingSecret
  })
