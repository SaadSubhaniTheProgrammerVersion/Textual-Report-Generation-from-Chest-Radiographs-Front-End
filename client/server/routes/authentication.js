import express from "express"
import { Login, Register } from "../controllers/auth"

const router = express.Router()

router.post('/login', Login)
router.post('/register', Register)
