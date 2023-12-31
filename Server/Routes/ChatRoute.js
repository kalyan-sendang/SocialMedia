import express from 'express'
import { createChat, findChat, userChats } from '../Controllers/ChatController.js'

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secongId', findChat)
export default router