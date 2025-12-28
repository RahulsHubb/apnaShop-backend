import express from 'express'
import { createUser, getUserByEmail } from '../controllers/getUserByEmail.js'

const router = express.Router()


router.post('/users', createUser)
router.get('/users/:email', getUserByEmail)

export default router
