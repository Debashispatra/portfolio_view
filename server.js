import express from 'express'
const app = express()
import router from './router/router.js'
import cors from 'cors'
app.use(cors())
app.use(express.json());
app.use('/portfolio',router)

export default app