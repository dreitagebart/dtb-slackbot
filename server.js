// const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const dotenv = require("dotenv")
const { App } = require("@slack/bolt")

const port = process.env.PORT || 4390

dotenv.config()

const bot = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

bot.command("/ngrok", async ({ command, ack, say }) => {
  ack()

  say(`your ngrok tunnel is up and running`)
})

bot.command("/npm", async ({ command, ack, say }) => {
  ack()

  say(`you entered: ${command.text}`)
})

bot.event("message", async ({ event, context }) => {
  console.log("message event", context)
  console.log(event)
  try {
    const result = await bot.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `Welcome to the team, <@${event.user}>! 🎉 You can introduce yourself in this channel.`
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})

bot.message("hello", ({ message, say }) => {
  console.log("said hello")
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me"
          },
          action_id: "button_click"
        }
      }
    ]
  })
})

bot.start(port).then(() => {
  console.log("Bolt is up and running")
})
