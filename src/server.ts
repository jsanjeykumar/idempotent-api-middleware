import App from './config/app'

import bodyParser from 'body-parser'
import loggerMiddleware from '../temp/ApiLogger'
import tokenValidator from './tokenValidatorMiddleware'

import routes from './routes'

const app = new App({
  port: 8080,
  middleWares: [
    bodyParser.json(),
    loggerMiddleware,
    tokenValidator
  ],
  routes: routes
})

app.listen()
