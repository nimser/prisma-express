import { Prisma, PrismaClient } from "@prisma/client"
import { RequestHandler } from "express"
import Posts from "../models/Posts"

const prisma = new PrismaClient()
const posts = Posts(prisma.post)

const create: RequestHandler = async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
}

const incrementViews: RequestHandler = async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
}

const publish: RequestHandler = async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    })

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    })
    res.json(updatedPost)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
}
const remove: RequestHandler = async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
}

const read: RequestHandler = async (req, res) => {
  const { id }: { id?: string } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
}

const browse: RequestHandler = async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const results = await posts.getFeed(
    searchString ? String(searchString) : undefined,
    Number(skip) || undefined,
    Number(take) || undefined,
    ["asc", "desc"].includes(String(orderBy))
      ? (orderBy as Prisma.SortOrder)
      : undefined
  )

  res.json(results)
}

export { create, incrementViews, publish, remove, read, browse }
