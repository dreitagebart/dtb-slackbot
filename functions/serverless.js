import serverless from "serverless-http"
import Slackbot from "./slackBot"

// We need to define our function name for express routes to set the correct base path
const functionName = "serverless"

// Initialize express app
const app = Slackbot(functionName)

// Export lambda handler
exports.handler = serverless(app)
