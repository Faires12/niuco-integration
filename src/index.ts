import dotenv from 'dotenv'
import express from 'express'
import { env } from 'process'
import { AdaptRoute } from './adapters'
import { GetUserController } from './controllers'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/health', (_, res) => {
  return res.status(200).send('Server is healthy')
})

app.get('/users', AdaptRoute(new GetUserController()))

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})
