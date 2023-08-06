import express from "express"
import * as postControllers from "./controllers/postControllers"
import * as userControllers from "./controllers/userControllers"

const router = express.Router()

router.post(`/signup`, userControllers.create)
router.get("/users", userControllers.browse)
router.get("/user/:id/drafts", userControllers.read)

router.post(`/post`, postControllers.create)
router.put("/post/:id/views", postControllers.update)
router.put("/publish/:id", postControllers.publish)
router.delete(`/post/:id`, postControllers.remove)
router.get(`/post/:id`, postControllers.read)
router.get("/feed", postControllers.browse)

export default router
