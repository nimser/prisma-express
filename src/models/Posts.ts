import { Post, Prisma, PrismaClient } from "@prisma/client"

function Posts(prismaPost: PrismaClient["post"]) {
  return Object.assign(prismaPost, {
    getFeed(
      searchString?: string,
      take?: number,
      skip?: number,
      orderBy?: Prisma.SortOrder
    ): Promise<Post[] | null> {
      const or: Prisma.PostWhereInput = searchString
        ? {
            OR: [
              { title: { contains: searchString as string } },
              { content: { contains: searchString as string } },
            ],
          }
        : {}

      return prismaPost.findMany({
        where: {
          published: true,
          ...or,
        },
        include: { author: true },
        take: take,
        skip: skip,
        orderBy: {
          updatedAt: orderBy as Prisma.SortOrder,
        },
      })
    },
  })
}

export default Posts
