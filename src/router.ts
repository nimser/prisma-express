import express from "express"
import * as userControllers from "./controllers/userControllers"
import * as postControllers from "./controllers/postControllers"

const router = express.Router()

router.post(`/signup`, userControllers.signup)
router.get("/users", userControllers.browse)
router.get("/user/:id/drafts", userControllers.read)

router.post(`/post`, postControllers.create)
router.put("/post/:id/views", postControllers.incrementViews)
router.put("/publish/:id", postControllers.publish)
router.delete(`/post/:id`, postControllers.remove)
router.get(`/post/:id`, postControllers.read)
router.get("/feed", postControllers.browse)

export default router
