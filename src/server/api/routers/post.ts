import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
const idSchema = z.object({ id: z.string() })

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
})

const updateUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})
export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getOne: publicProcedure
    .input(idSchema)
    .query(({ input, ctx }) => {
      return ctx.db.user.findUnique({
      where: idSchema.parse(input)
    })
    }),
  
  createUser: publicProcedure
    .input(userSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.create({
      data: userSchema.parse(input)
    })
    }),
  
  update: publicProcedure
    .input(updateUserSchema).mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: input.id.toString()
        },
        data: updateUserSchema.parse(input)
    })
    }),
  
  delete: publicProcedure
    .input(idSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.delete({
      where: idSchema.parse(input)
    })
  })
  
});
