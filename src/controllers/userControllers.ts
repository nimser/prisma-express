import { Prisma, PrismaClient } from "@prisma/client"
import Users from "../models/Users"
import { RequestHandler } from "express"
const prisma = new PrismaClient()
const users = Users(prisma.user)

const signup: RequestHandler = async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await users.signup({
    name,
    email,
    posts: {
      create: postData,
    },
  })
  res.json(result)
}

const browse: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

const read: RequestHandler = async (req, res) => {
  const { id } = req.params
  // TODO Add validations
  const drafts = await users.getDraftsForUser(Number(id))
  res.json(drafts)
}

export { signup, browse, read }
