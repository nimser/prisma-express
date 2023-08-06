import { Post, PrismaClient, User } from "@prisma/client"

type Signup = {
  name: string
  email: string
  posts: { create: Post[] }
}

function Users(prismaUser: PrismaClient["user"]) {
  return Object.assign(prismaUser, {
    async signup(data: Signup): Promise<User> {
      return prismaUser.create({ data })
    },
    async getDraftsForUser(id: number): Promise<Post[] | null> {
      return prismaUser
        .findUnique({
          where: { id },
        })
        .posts({
          where: { published: false },
        })
    },
  })
}

export default Users
