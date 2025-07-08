import {Router} from "express"
import userRoutes from "./user-route.js"
import chatRoutes from "./chat-routes.js"

const router = Router()

router.use("/user", userRoutes)
router.use("/chat", chatRoutes)

export default router