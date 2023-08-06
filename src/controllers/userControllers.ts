import { Prisma, PrismaClient } from "@prisma/client"
import { RequestHandler } from "express"
const prisma = new PrismaClient()

const create: RequestHandler = async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
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

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
}

export { create, browse, read }
