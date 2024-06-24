import dotenv from 'dotenv'
import express from 'express'
import { env } from 'process'
import { AdaptRoute } from './adapters'
import { GetUserController } from './controllers'
import cluster from 'cluster'
import os from 'os'

dotenv.config()

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} morreu`)
    // Opcional: criar um novo worker quando um morrer
    // cluster.fork();
  })
} else {
  const app = express()

  app.use(express.json())

  app.get('/health', (_, res) => {
    return res.status(200).send('Server is healthy')
  })

  app.get('/users', AdaptRoute(new GetUserController()))

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
  })
}
